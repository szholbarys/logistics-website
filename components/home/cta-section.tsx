import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'
import { FadeIn } from '@/components/fade-in'

export function CtaSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Accent glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-4">Готовы начать?</p>
          <h2 className="text-3xl sm:text-5xl font-black text-foreground mb-6 text-balance">
            Получите расчёт стоимости{' '}
            <span className="text-primary">бесплатно</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Оставьте заявку — мы свяжемся в течение 30 минут и рассчитаем стоимость доставки точно под ваш проект.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/order"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-base hover:bg-[oklch(0.58_0.2_45)] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
            >
              Оформить заказ
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+77077373333"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 text-foreground font-semibold text-base hover:border-primary/50 hover:bg-white/5 transition-all"
            >
              <Phone className="w-5 h-5 text-primary" />
              Позвонить нам
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
