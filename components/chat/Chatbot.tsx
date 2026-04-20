'use client'

import { useState, useRef, useEffect, FormEvent } from 'react'
import { MessageCircle, X, Send, Loader2 } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const GREETING: Message = {
  role: 'assistant',
  content:
    '¡Hola! Soy el asistente de FG Abogados. Estoy aquí para ayudarte a reservar una consulta con nuestros abogados.\n\n¿En qué puedo ayudarte?',
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([GREETING])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)
    }
  }, [messages, open])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return

    const userMsg: Message = { role: 'user', content: text }
    const updated = [...messages, userMsg]
    setMessages(updated)
    setInput('')
    setLoading(true)

    try {
      // Skip the hardcoded greeting from the API payload so the first message is always from user
      const apiMessages = updated
        .filter((_, i) => !(i === 0 && updated[0].role === 'assistant'))
        .map((m) => ({ role: m.role, content: m.content }))

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      })

      const data = await res.json()
      if (!res.ok) {
        setMessages((prev) => [...prev, { role: 'assistant', content: `Error: ${data.error}` }])
      } else {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.content }])
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Error de red: ${String(err)}`,
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Chat window */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[360px] flex flex-col rounded-2xl shadow-2xl overflow-hidden"
          style={{
            background: '#F8F8F0',
            border: '1px solid #DDD9CC',
            maxHeight: 'calc(100vh - 120px)',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-5 py-4 flex-shrink-0"
            style={{ background: '#2D1A00' }}
          >
            <div className="flex items-center gap-3">
              <img
                src="/logo.jpg"
                alt="FG Abogados"
                className="w-9 h-9 rounded-full object-cover flex-shrink-0"
              />
              <div>
                <p className="text-white text-sm font-semibold leading-tight">FG Abogados</p>
                <p className="text-xs leading-tight mt-0.5" style={{ color: '#B5C87A' }}>
                  Reserva tu consulta
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/50 hover:text-white transition-colors"
              aria-label="Cerrar chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
            style={{ minHeight: '200px' }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className="max-w-[82%] px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap"
                  style={
                    msg.role === 'user'
                      ? {
                          background: '#2D1A00',
                          color: '#F8F8F0',
                          borderRadius: '18px 18px 4px 18px',
                        }
                      : {
                          background: '#F2F2E8',
                          color: '#2D1A00',
                          border: '1px solid #DDD9CC',
                          borderRadius: '18px 18px 18px 4px',
                        }
                  }
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div
                  className="px-4 py-3"
                  style={{
                    background: '#F2F2E8',
                    border: '1px solid #DDD9CC',
                    borderRadius: '18px 18px 18px 4px',
                  }}
                >
                  <Loader2 size={15} className="animate-spin" style={{ color: '#B5C87A' }} />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
            style={{ borderTop: '1px solid #DDD9CC' }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu mensaje..."
              disabled={loading}
              className="flex-1 bg-transparent outline-none text-sm disabled:opacity-50"
              style={{ color: '#2D1A00' }}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-opacity disabled:opacity-30"
              style={{ background: '#2D1A00' }}
              aria-label="Enviar"
            >
              <Send size={14} color="#B5C87A" />
            </button>
          </form>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-105 active:scale-95"
        style={{ background: '#2D1A00' }}
        aria-label={open ? 'Cerrar chat' : 'Abrir chat de reservas'}
      >
        {open ? (
          <X size={22} color="#B5C87A" />
        ) : (
          <MessageCircle size={22} color="#B5C87A" />
        )}
      </button>
    </>
  )
}
