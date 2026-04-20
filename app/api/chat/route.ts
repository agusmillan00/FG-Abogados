import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'
import { getAvailability, bookAppointment } from '@/lib/calendar'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

function processPayment(params: { amount: number; name: string; email: string }) {
  return {
    success: true,
    payment_id: `test_${Date.now()}`,
    amount: params.amount,
    mode: 'test',
  }
}

const SYSTEM_PROMPT = `Eres el asistente de reservas de FG Abogados, un despacho de abogados con sedes en Madrid y Cuenca.

Tu único objetivo es ayudar al usuario a reservar una consulta con los abogados del despacho.

Proceso (sigue este orden estrictamente):
1. Saluda al usuario y pregunta en qué puede ayudarle.
2. Escucha su situación con empatía y profesionalidad.
3. Recoge: nombre completo, email, teléfono y descripción breve del asunto.
4. Pregunta en qué sede prefiere la consulta: Madrid (Calle Velázquez 22) o Cuenca (Calle Hermanos Valdés 10).
5. Llama a get_availability. Cada slot tiene un "id" y un "label". Muestra los labels al usuario numerados (hasta 5 opciones). Recuerda el "id" del slot que elija el usuario.
   - Si el usuario pide una fecha o día concreto (ej: "el lunes que viene", "el 27"), llama a get_availability con ese date en formato YYYY-MM-DD para ver los huecos disponibles ese día.
   - Si ese día no tiene huecos libres, informa al usuario y pregunta si prefiere otro día u hora.
6. El usuario elige un horario.
7. Informa que la consulta tiene un coste de 100 €, y pide confirmación para proceder al pago.
8. Cuando el usuario confirme, llama a process_payment.
9. Una vez el pago sea exitoso, llama a book_appointment usando el "id" del slot elegido en el campo slotId.
10. Confirma la reserva con todos los detalles: nombre, sede, día, hora y que recibirá confirmación por email.

Reglas importantes:
- Responde siempre en español, de forma cordial y profesional. Sin formalismos excesivos.
- No uses markdown ni asteriscos. Escribe en texto plano.
- No ofrezcas asesoramiento jurídico específico. Solo orienta en términos generales.
- Horario de atención: lunes a viernes, 9:00 a 18:00. Las consultas duran 45 minutos.
- Mantén respuestas concisas. Recoge los datos de uno en uno si el usuario no los da todos a la vez.`

const tools: Anthropic.Tool[] = [
  {
    name: 'get_availability',
    description: 'Obtiene los próximos horarios disponibles para consulta. Si el usuario pide una fecha concreta, usa el parámetro date.',
    input_schema: {
      type: 'object' as const,
      properties: {
        date: { type: 'string', description: 'Fecha concreta a consultar en formato YYYY-MM-DD (opcional). Si no se indica, devuelve los próximos huecos.' },
      },
      required: [],
    },
  },
  {
    name: 'process_payment',
    description: 'Procesa el pago de 100 € por la consulta. En modo test siempre es gratuito y aprobado.',
    input_schema: {
      type: 'object' as const,
      properties: {
        amount: { type: 'number', description: 'Importe a cobrar (100)' },
        name: { type: 'string', description: 'Nombre del cliente' },
        email: { type: 'string', description: 'Email del cliente' },
      },
      required: ['amount', 'name', 'email'],
    },
  },
  {
    name: 'book_appointment',
    description: 'Crea la cita en el calendario del despacho. Solo llamar tras pago exitoso.',
    input_schema: {
      type: 'object' as const,
      properties: {
        name: { type: 'string', description: 'Nombre completo del cliente' },
        email: { type: 'string', description: 'Email del cliente' },
        phone: { type: 'string', description: 'Teléfono de contacto' },
        matter: { type: 'string', description: 'Asunto o descripción breve de la consulta' },
        slotId: { type: 'string', description: 'ID del slot elegido, exactamente como lo devolvió get_availability (ej: "slot_1")' },
        location: { type: 'string', description: 'Sede elegida: Madrid o Cuenca' },
      },
      required: ['name', 'email', 'phone', 'matter', 'slotId', 'location'],
    },
  },
]

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    let current: Anthropic.MessageParam[] = messages

    for (let i = 0; i < 10; i++) {
      const response = await anthropic.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        tools,
        messages: current,
      })

      if (response.stop_reason === 'end_turn') {
        const text = response.content
          .filter((b): b is Anthropic.TextBlock => b.type === 'text')
          .map((b) => b.text)
          .join('')
        return NextResponse.json({ role: 'assistant', content: text })
      }

      if (response.stop_reason === 'tool_use') {
        current = [...current, { role: 'assistant', content: response.content }]

        const toolResults: Anthropic.ToolResultBlockParam[] = []

        for (const block of response.content) {
          if (block.type !== 'tool_use') continue

          let result: unknown
          try {
            console.log('[tool]', block.name, JSON.stringify(block.input))
            if (block.name === 'get_availability') {
              const input = block.input as { date?: string }
              const slots = await getAvailability(14, input.date)
              result = { slots }
            } else if (block.name === 'process_payment') {
              const input = block.input as { amount: number; name: string; email: string }
              result = processPayment(input)
            } else if (block.name === 'book_appointment') {
              const input = block.input as {
                name: string
                email: string
                phone: string
                matter: string
                slotId: string
                location: string
              }
              result = await bookAppointment(input)
            }
          } catch (err) {
            console.error('[tool error]', block.name, err)
            result = { error: String(err) }
          }

          toolResults.push({
            type: 'tool_result',
            tool_use_id: block.id,
            content: JSON.stringify(result),
          })
        }

        current = [...current, { role: 'user', content: toolResults }]
        continue
      }

      break
    }

    return NextResponse.json({ error: 'Unexpected response' }, { status: 500 })
  } catch (err) {
    console.error('[chat] Error:', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
