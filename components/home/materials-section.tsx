import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { FadeIn, StaggerChildren, StaggerItem } from '@/components/fade-in'

const materials = [
  {
    name: 'Щебень',
    description: 'Все фракции: 5–10, 10–20, 20–40, 40–70 мм. Гранитный, известняковый, гравийный.',
    image: '/images/crushed-stone.png',
    tag: 'Популярное',
  },
  {
    name: 'Песок',
    description: 'Речной, карьерный, сеяный. Для строительства, засыпки и благоустройства.',
    image: '/images/sand.png',
    tag: '',
  },
  {
    name: 'Гравий и ПГС',
    description: 'Природная и дроблёная ПГС, гравий различных фракций для дорожных работ.',
    image: '/images/gravel.png',
    tag: '',
  },
  {
    name: 'Вывоз отходов',
    description: 'Вывоз грунтов, строительного мусора, боя кирпича и бетона на полигоны.',
    image: '/images/waste-removal.png',
    tag: 'Услуга',
  },
]

export function MaterialsSection() {
  return (
    <section className="py-24 bg-[oklch(0.09_0.01_250)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">Что мы доставляем</p>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground text-balance">
              Инертные материалы<br />и строительные грузы
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-primary font-semibold hover:gap-3 transition-all"
          >
            Все услуги
            <ArrowRight className="w-4 h-4" />
          </Link>
        </FadeIn>

        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {materials.map((mat) => (
            <StaggerItem key={mat.name}>
              <div className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/40 transition-colors duration-300 cursor-pointer">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={mat.image}
                    alt={mat.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                  {mat.tag && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-semibold">
                      {mat.tag}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-foreground font-bold text-lg mb-2">{mat.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{mat.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  )
}
