'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from '@/hooks/useInView'

interface Stat {
  prefix?: string
  value: number
  suffix?: string
  label: string
  ringPct: number
}

const stats: Stat[] = [
  { prefix: '+', value: 25,   label: 'años de experiencia',     ringPct: 75 },
  { value: 85,  suffix: '%', label: 'clientes que repiten',     ringPct: 85 },
  { prefix: '+', value: 2500, label: 'casos resueltos',         ringPct: 90 },
  { value: 98,  suffix: '%', label: 'satisfacción de clientes', ringPct: 98 },
]

const RADIUS = 54
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function RingStat({ stat, inView, index }: { stat: Stat; inView: boolean; index: number }) {
  const [count, setCount]   = useState(0)
  const [offset, setOffset] = useState(CIRCUMFERENCE)
  const [visible, setVisible] = useState(false)
  const started = useRef(false)

  // Entrada escalonada: fade-in + slide-up
  useEffect(() => {
    if (!inView) return
    const timer = setTimeout(() => setVisible(true), index * 120)
    return () => clearTimeout(timer)
  }, [inView, index])

  // Counter y anillo arrancan después de que la tarjeta aparece
  useEffect(() => {
    if (!inView || started.current) return
    started.current = true

    const delay = index * 120 + 200
    const timer = setTimeout(() => {
      const duration = 1600
      const start = performance.now()
      const targetOffset = CIRCUMFERENCE * (1 - stat.ringPct / 100)

      const step = (now: number) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)

        setCount(Math.round(eased * stat.value))
        setOffset(CIRCUMFERENCE - eased * (CIRCUMFERENCE - targetOffset))

        if (progress < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }, delay)

    return () => clearTimeout(timer)
  }, [inView, stat, index])

  return (
    <div
      className="flex flex-col items-center gap-4"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
    >
      <div className="relative w-32 h-32">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60" cy="60" r={RADIUS}
            fill="none"
            stroke="rgba(248,248,240,0.1)"
            strokeWidth="6"
          />
          <circle
            cx="60" cy="60" r={RADIUS}
            fill="none"
            stroke="#B5C87A"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.04s linear' }}
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center px-2">
          <span
            className="font-sans font-semibold leading-none text-center"
            style={{ fontSize: '1rem', color: '#B5C87A' }}
          >
            {stat.prefix}{count}{stat.suffix}
          </span>
        </div>
      </div>

      <p
        className="font-sans text-xs tracking-widest uppercase text-center max-w-[120px]"
        style={{ color: 'rgba(248,248,240,0.65)' }}
      >
        {stat.label}
      </p>
    </div>
  )
}

export default function Stats() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 })

  return (
    <section className="bg-primary py-20 md:py-28" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          {stats.map((s, i) => (
            <RingStat key={i} stat={s} inView={inView} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
