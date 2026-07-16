import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { FadeIn, StaggerChildren, StaggerItem } from '@/components/fade-in'
import { CtaSection } from '@/components/home/cta-section'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'

const deliveryServices = [
  {
    id: 'crushed-stone',
    name: 'Щебень',
    image: '/images/crushed-stone.png',
    description:
      'Доставляем щебень всех фракций для строительных, дорожных и ландшафтных работ по Алматы и региону.',
    features: [
      'Фракции: 5–10, 5–20, 10–20, 20–40, 40–70 мм',
      'Гранитный, известняковый, гравийный',
      'Минимальный заказ — 1 машина',
      'Доставка по всей Алматы и региону',
    ],
  },
  {
    id: 'sand',
    name: 'Песок',
    image: '/images/sand.png',
    description:
      'Речной и карьерный песок для строительства, благоустройства, засыпки котлованов и планировочных работ.',
    features: [
      'Речной мытый, карьерный, сеяный',
      'Для фундаментов, стяжек, кладки',
      'Гарантия качества и паспорт',
      'Оперативная подача транспорта',
    ],
  },
  {
    id: 'pgs',
    name: 'ПГС и ГЩС',
    image: '/images/gravel.png',
    description:
      'Песчано-гравийная и гравийно-щебёночная смесь — идеально для устройства дорожного полотна и оснований.',
    features: [
      'ПГС природная и обогащённая',
      'ГЩС для дорог',
      'Отсев щебня, мытый отсев',
      'Известняковая нерудная масса',
    ],
  },
  {
    id: 'limestone',
    name: 'Балас',
    image: '/images/hero-truck.png',
    description:
      'Скальные грунты, известняк, нерудная горная масса — для планировки, отсыпки и строительства.',
    features: [
      'Нерудная горная масса',
      'Скальный грунт (известняк, гранит)',
      'Суглинок, супесь',
      'Для планировки и засыпки',
    ],
  },
]

const removalServices = [
  {
    name: 'Вывоз грунта',
    text: 'Вывоз дисперсных и скальных грунтов: песок, галька, суглинок, щебень, известняк, гранит, сланцы.',
  },
  {
    name: 'Строительный мусор',
    text: 'Вывоз строительных отходов: бой кирпича, камня, бетона, лом асфальта, остатки дорожных покрытий.',
  },
  {
    name: 'Промышленные отходы',
    text: 'Сыпучие и кусковые промышленные отходы, материалы демонтажа. Вывоз на лицензированные полигоны.',
  },
  {
    name: 'Бордюры и покрытия',
    text: 'Вывоз бордюрного камня, остатков дорожных покрытий, материалов после реконструкции дорог.',
  },
]

export default function ServicesPage() {
  return (
    <main>
      <Navbar />

      {/* Page header */}
      <section className="relative pt-32 pb-20 bg-[oklch(0.09_0.01_250)] overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(oklch(0.65_0.2_45) 1px, transparent 1px), linear-gradient(to right, oklch(0.65_0.2_45) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">Что мы предлагаем</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground mb-6 text-balance">
              Наши услуги
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              Доставка инертных материалов и вывоз строительных отходов по Алматы и всему региону.
              Работаем с юридическими и физическими лицами.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Delivery Services */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-14">
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">
              Доставка материалов
            </h2>
          </FadeIn>

          <div className="flex flex-col gap-8">
            {deliveryServices.map((service, idx) => (
              <FadeIn key={service.id} delay={idx * 0.05}>
                <div className="group grid grid-cols-1 lg:grid-cols-2 gap-0 bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-colors duration-300">
                  <div className={`relative h-64 lg:h-auto overflow-hidden ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent lg:bg-gradient-to-r from-transparent lg:to-card/20" />
                  </div>
                  <div className={`p-8 lg:p-10 flex flex-col justify-center ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <h3 className="text-2xl font-black text-foreground mb-3">{service.name}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">{service.description}</p>
                    <ul className="flex flex-col gap-2 mb-8">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-foreground/80">
                          <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/order"
                      className="self-start inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-[oklch(0.58_0.2_45)] transition-all hover:scale-105 active:scale-95"
                    >
                      Заказать
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Removal Services */}
      <section className="py-24 bg-[oklch(0.09_0.01_250)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-14">
            <h2 className="text-2xl sm:text-3xl font-black text-foreground mb-3">
              Вывоз грунтов и мусора
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Вывоз строительного мусора, грунтов и промышленных отходов на лицензированные полигоны.
            </p>
          </FadeIn>

          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {removalServices.map((s) => (
              <StaggerItem key={s.name}>
                <div className="bg-card border border-border rounded-2xl p-6 h-full hover:border-primary/40 transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <ArrowRight className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-foreground font-bold mb-2">{s.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>

          <FadeIn delay={0.2} className="mt-10 text-center">
            <Link
              href="/order"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold hover:bg-[oklch(0.58_0.2_45)] transition-all hover:scale-105 active:scale-95"
            >
              Оформить заявку на вывоз
              <ArrowRight className="w-5 h-5" />
            </Link>
          </FadeIn>
        </div>
      </section>

      <CtaSection />
      <Footer />
    </main>
  )
}
