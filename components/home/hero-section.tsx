'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Phone } from 'lucide-react'

const heroContent = {
  bulk: {
    badge: 'Доставка материалов',
    title: ['Доставка', 'сыпучих', 'материалов'],
    description: 'Профессиональная доставка инертных материалов и вывоз строительного мусора. Автопарк HOWO, Mercedes, Shacman грузоподъёмностью 25–40 тонн. Доставка по всей Алматы и региону.',
    cta1: 'Оформить заказ',
    cta1Link: '/order',
    cta2Phone: '+7 775 286 95 76',
    stats: [
      { value: '10+', label: 'Лет на рынке' },
      { value: '500+', label: 'Клиентов' },
      { value: '25–40т', label: 'Грузоподъёмность' },
      { value: '24/7', label: 'Режим работы' },
    ],
  },
  cargo: {
    badge: 'Грузоперевозки',
    title: ['Грузоперевозки', 'по Казахстану', 'и по СНГ'],
    description: 'Перевозим строительные, промышленные и коммерческие грузы собственным автопарком. Специальные разрешения для негабаритных грузов.',
    cta1: 'Оформить заявку',
    cta1Link: '/order?tab=cargo',
    cta2Phone: '+7 707 737 33 33',
    stats: [
      { value: '200т', label: 'Макс. грузоподъемность' },
      { value: '45', label: 'Единиц транспорта' },
      { value: '1–200т', label: 'Диапазон заказов' },
      { value: '24/7', label: 'Режим работы' },
    ],
  },
}

export function HeroSection() {
  const [active, setActive] = useState<'bulk' | 'cargo'>('bulk')
  const content = heroContent[active]

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/main-image.png"
          alt="AMANAT Logistic"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-[oklch(0.11_0.01_250)/75]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.11_0.01_250)] via-[oklch(0.11_0.01_250)/60] to-transparent" />
      </div>

      {/* Animated grid lines */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'linear-gradient(oklch(0.65_0.2_45) 1px, transparent 1px), linear-gradient(to right, oklch(0.65_0.2_45) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        {/* Service tabs */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setActive('bulk')}
            className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-200 ${
              active === 'bulk'
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                : 'bg-white/10 backdrop-blur border border-white/20 text-foreground hover:border-primary/40'
            }`}
          >
            Сыпучие материалы
          </button>
          <button
            onClick={() => setActive('cargo')}
            className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-200 ${
              active === 'cargo'
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                : 'bg-white/10 backdrop-blur border border-white/20 text-foreground hover:border-primary/40'
            }`}
          >
            Грузоперевозка и логистика
          </button>
        </div>

        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            key={`badge-${active}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {content.badge} — 24/7
          </motion.div>

          {/* Headline */}
          <motion.h1
            key={`headline-${active}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-black text-foreground leading-none tracking-tight mb-6 text-balance"
          >
            {content.title[0]}{' '}
            <span className="text-primary">{content.title[1]}</span>
            <br />
            {content.title[2]}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            key={`subheadline-${active}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-foreground/70 leading-relaxed mb-10 max-w-xl"
          >
            {content.description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            key={`ctas-${active}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href={content.cta1Link}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-base hover:bg-[oklch(0.58_0.2_45)] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
            >
              {content.cta1}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href={`tel:${content.cta2Phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-foreground font-semibold text-base hover:border-primary/50 hover:bg-white/10 transition-all"
            >
              <Phone className="w-5 h-5 text-primary" />
              {content.cta2Phone}
            </a>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          key={`stats-${active}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10"
        >
          {content.stats.map((stat) => (
            <div key={stat.label} className="bg-[oklch(0.13_0.01_250)/80] backdrop-blur-sm px-6 py-5">
              <div className="text-3xl font-black text-primary">{stat.value}</div>
              <div className="text-sm text-foreground/60 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-0.5 h-10 bg-gradient-to-b from-primary to-transparent rounded-full"
        />
      </motion.div>
    </section>
  )
}
