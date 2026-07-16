import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { FadeIn, StaggerChildren, StaggerItem } from '@/components/fade-in'
import { Phone, MapPin, Clock, Globe, MessageCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const contacts = [
  {
    icon: Phone,
    label: 'Телефон 1',
    value: '+7 707 737 33 33',
    href: 'tel:+77077373333',
    sub: 'Логистика',
  },
  {
    icon: Phone,
    label: 'Телефон 2',
    value: '+7 775 286 95 76',
    href: 'tel:+77752869576',
    sub: 'Сыпучие материалы',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: 'Написать в WhatsApp',
    href: 'https://wa.me/77077373333',
    sub: 'Быстрый ответ',
  }
]

const infoCards = [
  {
    icon: MapPin,
    title: 'Наш офис',
    lines: [
      'г. Алматы',
      'пр. Райымбек, 481А',
      'БЦ «Эталон», 4 этаж, офис 5',
    ],
  },
  {
    icon: Clock,
    title: 'Режим работы',
    lines: [
      'Пн – Пт: 09:00 – 18:00',
      'Сб – Вс: по договорённости',
    ],
  },
]

export default function ContactsPage() {
  return (
    <main>
      <Navbar />

      {/* Header */}
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
            <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">Связь с нами</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground mb-6 text-balance">
              Контакты
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
              Свяжитесь с нами любым удобным способом — ответим быстро и рассчитаем стоимость доставки.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Main content */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: contact cards + info */}
            <div>
              <FadeIn className="mb-8">
                <h2 className="text-2xl font-black text-foreground">Как с нами связаться</h2>
              </FadeIn>

              <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {contacts.map((c) => {
                  const Icon = c.icon
                  return (
                    <StaggerItem key={c.label}>
                      <a
                        href={c.href}
                        target={c.href.startsWith('http') ? '_blank' : undefined}
                        rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="group flex flex-col bg-card border border-border rounded-2xl p-5 hover:border-primary/50 transition-colors duration-200 h-full"
                      >
                        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-xs text-muted-foreground mb-1">{c.sub}</span>
                        <span className="text-foreground font-semibold group-hover:text-primary transition-colors leading-snug">
                          {c.value}
                        </span>
                      </a>
                    </StaggerItem>
                  )
                })}
              </StaggerChildren>

              <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {infoCards.map((card) => {
                  const Icon = card.icon
                  return (
                    <StaggerItem key={card.title}>
                      <div className="bg-card border border-border rounded-2xl p-6 h-full">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                            <Icon className="w-4 h-4 text-primary" />
                          </div>
                          <h3 className="font-bold text-foreground">{card.title}</h3>
                        </div>
                        <ul className="flex flex-col gap-1">
                          {card.lines.map((line) => (
                            <li key={line} className="text-sm text-muted-foreground">{line}</li>
                          ))}
                        </ul>
                      </div>
                    </StaggerItem>
                  )
                })}
              </StaggerChildren>
            </div>

            {/* Right: Map placeholder + order CTA */}
            <FadeIn direction="left" className="flex flex-col gap-6">
              {/* Map embed */}
              <div className="rounded-2xl overflow-hidden border border-border bg-card flex-1 min-h-[340px]">
                <iframe
                  src="https://maps.google.com/maps?q=%D0%BF%D1%80.+%D0%A0%D0%B0%D0%B9%D1%8B%D0%BC%D0%B1%D0%B5%D0%BA+481%D0%90+%D0%90%D0%BB%D0%BC%D0%B0%D1%82%D1%8B&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full min-h-[340px] grayscale contrast-125 opacity-80"
                  loading="lazy"
                  title="Карта офиса AMANAT Logistic"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              {/* Address card */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground mb-1">Адрес офиса</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      г. Алматы, пр. Райымбек, 481А,<br />
                      Бизнес-центр «Эталон», 4 этаж, офис 5
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Quick order CTA */}
      <section className="py-16 bg-[oklch(0.09_0.01_250)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="bg-card border border-border rounded-2xl p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden">
              <div className="absolute right-0 top-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-foreground mb-2">
                  Готовы сделать заказ?
                </h2>
                <p className="text-muted-foreground max-w-md">
                  Заполните короткую форму и мы отправим подтверждение прямо в WhatsApp.
                </p>
              </div>
              <Link
                href="/order"
                className="shrink-0 inline-flex items-center gap-2 px-7 py-4 rounded-full bg-primary text-primary-foreground font-bold text-sm hover:bg-[oklch(0.58_0.2_45)] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
              >
                Оформить заказ
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  )
}
