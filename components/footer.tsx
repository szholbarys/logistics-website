import Link from 'next/link'
import { Phone, MapPin, Truck, ExternalLink } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Главная' },
  { href: '/services', label: 'Услуги' },
  { href: '/fleet', label: 'Автопарк' },
  { href: '/contacts', label: 'Контакты' },
  { href: '/order', label: 'Оформить заказ' },
]

const services = [
  'Доставка щебня',
  'Доставка песка',
  'Доставка ПГС / ПЩС',
  'Доставка гравия',
  'Доставка известняка',
  'Вывоз грунта',
  'Вывоз строительного мусора',
]

export function Footer() {
  return (
    <footer className="bg-[oklch(0.09_0.01_250)] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <Truck className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-foreground font-bold text-lg">AMANAT</span>
                <span className="text-primary text-xs font-medium tracking-widest uppercase">Logistic</span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Профессиональная доставка инертных материалов и вывоз строительного мусора в Алматы и регионе.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+77077373333"
                className="flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4 text-primary" />
                +7 707 737 33 33
              </a>
              <a
                href="tel:+77752869576"
                className="flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4 text-primary" />
                +7 775 286 95 76
              </a>
              <div className="flex items-start gap-2 text-sm text-foreground/70">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>г. Алматы, пр. Райымбек, 481А, БЦ «Эталон», 4 эт., офис 5</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-foreground font-semibold mb-4 text-sm uppercase tracking-wider">Навигация</h3>
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-foreground font-semibold mb-4 text-sm uppercase tracking-wider">Услуги</h3>
            <ul className="flex flex-col gap-2">
              {services.map((service) => (
                <li key={service} className="text-sm text-muted-foreground">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h3 className="text-foreground font-semibold mb-4 text-sm uppercase tracking-wider">Сделать заказ</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Оформите заявку онлайн и мы свяжемся с вами в кратчайшие сроки.
            </p>
            <Link
              href="/order"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-[oklch(0.58_0.2_45)] transition-all hover:scale-105 active:scale-95"
            >
              Оформить заказ
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Amanat Logistic. Все права защищены.
          </p>
          <p className="text-xs text-muted-foreground">
            Доставка по Алматы и региону
          </p>
        </div>
      </div>
    </footer>
  )
}
