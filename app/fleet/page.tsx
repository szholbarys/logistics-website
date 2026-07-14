'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { FadeIn, StaggerChildren, StaggerItem } from '@/components/fade-in'
import { CtaSection } from '@/components/home/cta-section'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Weight, Gauge, Wrench, Users, X, ChevronLeft, ChevronRight } from 'lucide-react'

const galleryImages = [
  { src: '/images/1.jpeg', alt: 'Автопарк AMANAT' },
  { src: '/images/2.jpeg', alt: 'Автопарк AMANAT' },
  { src: '/images/3.jpeg', alt: 'Автопарк AMANAT' },
  { src: '/images/4.jpeg', alt: 'Автопарк AMANAT' },
  { src: '/images/5.jpeg', alt: 'Автопарк AMANAT' },
  { src: '/images/6.jpeg', alt: 'Автопарк AMANAT' },
  { src: '/images/7.jpeg', alt: 'Автопарк AMANAT' },
  { src: '/images/8.jpeg', alt: 'Автопарк AMANAT' },
  { src: '/images/9.jpeg', alt: 'Автопарк AMANAT' },]

const trucks = [
  {
    id: 'howo',
    brand: 'HOWO',
    fullName: 'HOWO ZZ3257N3847E',
    capacity: '20 тонн',
    volume: '12–14 м³',
    image: '/images/truck-howo.png',
    color: 'oklch(0.65 0.2 45)',
    description:
      'Китайский тяжёлый самосвал серии HOWO — надёжный рабочий инструмент с проверенным двигателем и высокой проходимостью. Оптимален для городских маршрутов и работы на строительных площадках.',
    specs: [
      { label: 'Грузоподъёмность', value: '20 тонн' },
      { label: 'Объём кузова', value: '12–14 м³' },
      { label: 'Мощность двигателя', value: '336 л.с.' },
      { label: 'Колёсная формула', value: '6×4' },
      { label: 'Тип кузова', value: 'Самосвальный, задняя разгрузка' },
      { label: 'Привод', value: 'Задний мост 2-скоростной' },
    ],
    advantages: ['Высокая надёжность', 'Отличная проходимость', 'Доступные запчасти', 'Экономичность'],
  },
  {
    id: 'mercedes',
    brand: 'MERCEDES',
    fullName: 'Mercedes-Benz Arocs',
    capacity: '25 тонн',
    volume: '15–16 м³',
    image: '/images/truck-mercedes.png',
    color: 'oklch(0.65 0.2 45)',
    description:
      'Немецкий премиальный самосвал Mercedes-Benz Arocs — эталон надёжности и комфорта. Передовые технологии безопасности, мощный двигатель и высокий ресурс делают его незаменимым на дальних маршрутах.',
    specs: [
      { label: 'Грузоподъёмность', value: '25 тонн' },
      { label: 'Объём кузова', value: '15–16 м³' },
      { label: 'Мощность двигателя', value: '450 л.с.' },
      { label: 'Колёсная формула', value: '8×4' },
      { label: 'Тип кузова', value: 'Самосвальный, задняя / боковая разгрузка' },
      { label: 'Норма экологии', value: 'Euro 5 / Euro 6' },
    ],
    advantages: ['Немецкое качество', 'Мощный двигатель', 'Расширенная безопасность', 'Долгий ресурс'],
  },
  {
    id: 'shacman',
    brand: 'SHACMAN',
    fullName: 'Shacman X3000',
    capacity: '40 тонн',
    volume: '22–25 м³',
    image: '/images/truck-shacman.png',
    color: 'oklch(0.65 0.2 45)',
    description:
      'Тяжёлый самосвал Shacman X3000 с грузоподъёмностью 40 тонн — наш флагман для крупных проектов. Идеален для работы в карьерах, на полигонах и при крупных строительных объёмах.',
    specs: [
      { label: 'Грузоподъёмность', value: '40 тонн' },
      { label: 'Объём кузова', value: '22–25 м³' },
      { label: 'Мощность двигателя', value: '480 л.с.' },
      { label: 'Колёсная формула', value: '8×4' },
      { label: 'Тип кузова', value: 'Самосвальный, задняя разгрузка' },
      { label: 'Применение', value: 'Карьер, полигон, крупные объекты' },
    ],
    advantages: ['Максимальная грузоподъёмность', 'Мощный двигатель 480 л.с.', 'Усиленный кузов', 'Крупные проекты'],
  },
]

const serviceFeatures = [
  {
    icon: Wrench,
    title: 'Регулярное ТО',
    text: 'Каждый автомобиль проходит плановое техническое обслуживание по графику. Минимум неожиданностей на маршруте.',
  },
  {
    icon: Users,
    title: 'Опытные водители',
    text: 'Водители с многолетним профессиональным стажем, прошедшие медицинские осмотры и инструктажи.',
  },
  {
    icon: Gauge,
    title: 'GPS-мониторинг',
    text: 'Все автомобили оснащены GPS-трекерами для контроля маршрута и своевременности доставки.',
  },
  {
    icon: Weight,
    title: 'Точное взвешивание',
    text: 'Загрузка под весовой контроль с оформлением сопроводительных документов на каждый рейс.',
  },
]

export default function FleetPage() {
  const [activeId, setActiveId] = useState('howo')
  const activeTruck = trucks.find((t) => t.id === activeId)!
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  function openLightbox(i: number) { setLightboxIndex(i) }
  function closeLightbox() { setLightboxIndex(null) }
  function prevImage() { setLightboxIndex((prev) => prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null) }
  function nextImage() { setLightboxIndex((prev) => prev !== null ? (prev + 1) % galleryImages.length : null) }

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-[oklch(0.09_0.01_250)] overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'linear-gradient(oklch(0.65_0.2_45) 1px, transparent 1px), linear-gradient(to right, oklch(0.65_0.2_45) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">Наш транспорт</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground mb-6 text-balance">
              Автопарк
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              Три марки самосвалов грузоподъёмностью 20, 25 и 40 тонн. Весь транспорт в собственности компании,
              проходит регулярное ТО и укомплектован опытными водителями.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Truck tabs */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab selector */}
          <div className="flex flex-wrap gap-3 mb-12">
            {trucks.map((truck) => (
              <button
                key={truck.id}
                onClick={() => setActiveId(truck.id)}
                className={`relative px-6 py-3 rounded-full font-bold text-sm transition-all duration-200 ${
                  activeId === truck.id
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                    : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40'
                }`}
              >
                {truck.brand}
                <span className="ml-2 text-xs font-normal opacity-70">{truck.capacity}</span>
              </button>
            ))}
          </div>

          {/* Active truck detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
            >
              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden bg-card border border-border aspect-[4/3]">
                <Image
                  src={activeTruck.image}
                  alt={activeTruck.fullName}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-3">
                  <span className="px-4 py-1.5 rounded-full bg-primary text-primary-foreground font-black text-lg tracking-tight">
                    {activeTruck.brand}
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-card/80 backdrop-blur border border-white/10 text-foreground font-semibold text-sm">
                    {activeTruck.capacity}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div>
                <h2 className="text-3xl font-black text-foreground mb-2">{activeTruck.fullName}</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">{activeTruck.description}</p>

                {/* Specs table */}
                <div className="bg-card border border-border rounded-xl overflow-hidden mb-6">
                  {activeTruck.specs.map((spec, idx) => (
                    <div
                      key={spec.label}
                      className={`flex items-center justify-between px-4 py-3 ${
                        idx !== activeTruck.specs.length - 1 ? 'border-b border-border' : ''
                      }`}
                    >
                      <span className="text-muted-foreground text-sm">{spec.label}</span>
                      <span className="text-foreground font-semibold text-sm text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>

                {/* Advantages */}
                <ul className="grid grid-cols-2 gap-2">
                  {activeTruck.advantages.map((a) => (
                    <li key={a} className="flex items-center gap-2 text-sm text-foreground/80">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* All trucks overview */}
          <div className="mt-20">
            <FadeIn className="mb-10">
              <h2 className="text-2xl font-black text-foreground">Весь автопарк</h2>
            </FadeIn>
            <StaggerChildren className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {trucks.map((truck) => (
                <StaggerItem key={truck.id}>
                  <button
                    onClick={() => setActiveId(truck.id)}
                    className={`group w-full text-left bg-card border rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 ${
                      activeId === truck.id ? 'border-primary/60' : 'border-border'
                    }`}
                  >
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={truck.image}
                        alt={truck.fullName}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-black text-foreground text-lg">{truck.brand}</span>
                        <span className="text-primary font-bold text-sm">{truck.capacity}</span>
                      </div>
                      <p className="text-muted-foreground text-xs">{truck.fullName} · {truck.volume}</p>
                    </div>
                  </button>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </section>

      {/* Photo gallery */}
      <section className="pb-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-10">
            <h2 className="text-2xl font-black text-foreground">Фотогалерея</h2>
            <p className="text-muted-foreground text-sm mt-1">Нажмите на фото для просмотра</p>
          </FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
            {galleryImages.map((img, i) => (
              <button
                key={i}
                onClick={() => openLightbox(i)}
                className="group relative aspect-video rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button
              onClick={(e) => { e.stopPropagation(); prevImage() }}
              className="absolute left-4 sm:left-8 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Предыдущее фото"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25 }}
              className="relative w-[90vw] max-w-4xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[lightboxIndex].src}
                alt={galleryImages[lightboxIndex].alt}
                fill
                className="object-contain rounded-xl"
              />
            </motion.div>

            <button
              onClick={(e) => { e.stopPropagation(); nextImage() }}
              className="absolute right-4 sm:right-8 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Следующее фото"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Закрыть"
            >
              <X className="w-5 h-5" />
            </button>

            <p className="absolute bottom-4 text-white/50 text-sm">
              {lightboxIndex + 1} / {galleryImages.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Service quality */}
      <section className="py-24 bg-[oklch(0.09_0.01_250)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-14 text-center">
            <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">Стандарты</p>
            <h2 className="text-3xl font-black text-foreground">Качество обслуживания</h2>
          </FadeIn>
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {serviceFeatures.map((feat) => {
              const Icon = feat.icon
              return (
                <StaggerItem key={feat.title}>
                  <div className="bg-card border border-border rounded-2xl p-6 h-full hover:border-primary/40 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-foreground font-bold mb-2">{feat.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feat.text}</p>
                  </div>
                </StaggerItem>
              )
            })}
          </StaggerChildren>
        </div>
      </section>

      <CtaSection />
      <Footer />
    </main>
  )
}
