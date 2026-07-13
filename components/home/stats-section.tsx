'use client'

import { useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { FadeIn, StaggerChildren, StaggerItem } from '@/components/fade-in'
import { Zap, Shield, FileText, Wrench } from 'lucide-react'

function AnimatedNumber({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const duration = 1500
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, target])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

const stats = [
  { value: 10, suffix: '+', label: 'Лет опыта', description: 'Работаем на рынке строительных перевозок' },
  { value: 500, suffix: '+', label: 'Довольных клиентов', description: 'Строительные компании и частные заказчики' },
  { value: 3, suffix: '', label: 'Марки грузовиков', description: 'HOWO, Mercedes-Benz, Shacman в нашем парке' },
  { value: 5000, suffix: '+', label: 'Выполненных рейсов', description: 'По Алматы и всему региону' },
]

const advantages = [
  {
    Icon: Zap,
    title: 'Оперативность',
    text: 'Подача транспорта в течение 2–4 часов после подтверждения заказа',
  },
  {
    Icon: Shield,
    title: 'Надёжность',
    text: 'Гарантируем своевременность и сохранность груза при перевозке',
  },
  {
    Icon: FileText,
    title: 'Документооборот',
    text: 'Полный пакет документов: накладные, счета, акты выполненных работ',
  },
  {
    Icon: Wrench,
    title: 'Техническое обслуживание',
    text: 'Регулярное ТО парка — минимизируем риски поломок на маршруте',
  },
]

export function StatsSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Subtle accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-primary/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats grid */}
        <StaggerChildren className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden mb-24">
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="bg-card p-8 text-center h-full flex flex-col items-center justify-center">
                <div className="text-4xl lg:text-5xl font-black text-primary mb-2">
                  <AnimatedNumber target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-foreground font-bold text-base mb-1">{stat.label}</div>
                <div className="text-muted-foreground text-xs leading-relaxed">{stat.description}</div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>

        {/* Why us */}
        <FadeIn className="text-center mb-14">
          <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">Почему выбирают нас</p>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground text-balance">
            Доверьте работу профессионалам
          </h2>
        </FadeIn>

        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {advantages.map((adv) => {
            const Icon = adv.Icon
            return (
              <StaggerItem key={adv.title}>
                <div className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/40 transition-colors duration-300 h-full">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-foreground font-bold mb-2 text-base">{adv.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{adv.text}</p>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerChildren>
      </div>
    </section>
  )
}
