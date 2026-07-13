'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, Truck } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Главная' },
  { href: '/services', label: 'Услуги' },
  { href: '/fleet', label: 'Автопарк' },
  { href: '/contacts', label: 'Контакты' },
  { href: '/order', label: 'Оформить заказ' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[oklch(0.11_0.01_250)/95] backdrop-blur-md border-b border-white/5 shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center group-hover:scale-105 transition-transform">
              <Truck className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-foreground font-bold text-lg tracking-tight">AMANAT</span>
              <span className="text-primary text-xs font-medium tracking-widest uppercase">Logistic</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              const isOrder = link.href === '/order'
              return isOrder ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="ml-4 px-5 py-2 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-[oklch(0.58_0.2_45)] transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-md hover:text-primary ${
                    isActive ? 'text-primary' : 'text-foreground/70'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary rounded-full"
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Phone */}
          <a
            href="tel:+77077373333"
            className="hidden lg:flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span className="font-medium">+7 707 737 33 33</span>
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md text-foreground/70 hover:text-foreground transition-colors"
            aria-label="Открыть меню"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden bg-[oklch(0.13_0.01_250)] border-b border-white/10"
          >
            <nav className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                const isOrder = link.href === '/order'
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isOrder
                        ? 'bg-primary text-primary-foreground text-center font-semibold mt-2'
                        : isActive
                        ? 'text-primary bg-white/5'
                        : 'text-foreground/70 hover:text-foreground hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <a
                href="tel:+77077373333"
                className="flex items-center gap-2 px-4 py-3 text-sm text-foreground/70 hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                +7 707 737 33 33
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
