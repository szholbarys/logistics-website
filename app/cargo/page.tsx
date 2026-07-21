"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/fade-in";
import { CtaSection } from "@/components/home/cta-section";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Truck,
  Clock,
  Shield,
  FileText,
  Weight,
  MapPin,
  Package,
} from "lucide-react";

const cargoTypes = [
  {
    name: "Строительные грузы",
    description:
      "Перевозка строительных материалов: блоки, металлоконструкции, трубы, арматура, плиты перекрытий.",
    icon: Package,
  },
  {
    name: "Промышленное оборудование",
    description:
      "Транспортировка станков, агрегатов, промышленного оборудования и технических конструкций любой сложности.",
    icon: Weight,
  },
  {
    name: "Негабаритные грузы",
    description:
      "Перевозка крупногабаритных и тяжеловесных грузов с оформлением специальных разрешений.",
    icon: Truck,
  },
  {
    name: "Коммерческие грузы",
    description:
      "Доставка товаров, ТНП, торгового оборудования, продукции производства между городами и регионами.",
    icon: MapPin,
  },
];

const advantages = [
  {
    icon: Clock,
    title: "Подача от 2 часов",
    text: "Оперативное выделение транспорта после подтверждения заявки.",
  },
  {
    icon: Shield,
    title: "Сохранность груза",
    text: "Гарантируем целостность груза на всём маршруте. Ответственность зафиксирована в договоре.",
  },
  {
    icon: FileText,
    title: "Полный документооборот",
    text: "Накладные, счета-фактуры, акты выполненных работ — все документы в срок.",
  },
  {
    icon: Truck,
    title: "Собственный парк",
    text: "HOWO, Mercedes, Shacman — грузоподъёмность от 1 до 200 тонн. Никаких посредников.",
  },
];

const partners = [
  { name: "ARMTEK", logo: "/logos/armtek.jpeg" },
  { name: "BI Group", logo: "/logos/bi-group.png" },
  { name: "KOMATSU", logo: "/logos/komatsu.jpg" },
  { name: "CBC", logo: "/logos/cbc.png" },
  { name: "SEVALO", logo: "/logos/sevalo.png" },
  { name: "Baikonur Machinery Group", logo: "/logos/baikonur.jpeg" },
  { name: "Borusan CAT", logo: "/logos/borusan-cat.jpg" },
  { name: "HINO", logo: "/logos/hino.png" },
];

const specs = [
  { label: "Грузоподъёмность", value: "200 тонн" },
  { label: "В сфере логистики", value: "15 лет" },
  { label: "Единиц собственного транспорта", value: "20" },
  { label: "Единиц тралов для негабаритного груза", value: "25" },
  { label: "Ежемесячные перевозки", value: "Свыше 300" },
  { label: "Режим работы", value: "24 / 7" },
];

const galleryImages = [
  { src: "/images/1.jpeg", alt: "Грузоперевозки AMANAT" },
  { src: "/images/2.jpeg", alt: "Грузоперевозки AMANAT" },
  { src: "/images/3.jpeg", alt: "Грузоперевозки AMANAT" },
  { src: "/images/4.jpeg", alt: "Грузоперевозки AMANAT" },
  { src: "/images/5.jpeg", alt: "Грузоперевозки AMANAT" },
  { src: "/images/6.jpeg", alt: "Грузоперевозки AMANAT" },
  { src: "/images/7.jpeg", alt: "Грузоперевозки AMANAT" },
  { src: "/images/8.jpeg", alt: "Грузоперевозки AMANAT" },
  { src: "/images/9.jpeg", alt: "Грузоперевозки AMANAT" },
];

export default function CargoPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-0 bg-[oklch(0.09_0.01_250)] overflow-hidden min-h-[70vh] flex flex-col justify-end">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.65_0.2_45) 1px, transparent 1px), linear-gradient(to right, oklch(0.65_0.2_45) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="absolute inset-0">
          <Image
            src="/images/cargo-transport.png"
            alt="Грузоперевозки Amanat Logistic"
            fill
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.09_0.01_250)] via-[oklch(0.09_0.01_250)/60] to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <FadeIn>
            <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">
              AMANAT Logistic
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground mb-6 text-balance max-w-3xl">
              Грузоперевозки по Казахстану и СНГ
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed mb-8">
              Перевозим строительные, промышленные и коммерческие грузы
              собственным автопарком. Грузоподъёмность от 1 до 200 тонн.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/order?tab=cargo"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold hover:bg-[oklch(0.58_0.2_45)] transition-all hover:scale-105 active:scale-95"
              >
                Оформить заявку
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:+77077373333"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-card border border-border text-foreground font-bold hover:border-primary/40 transition-colors"
              >
                Позвонить нам
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Specs strip */}
      <section className="bg-card border-y border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {specs.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-foreground font-black text-lg">{s.value}</p>
                <p className="text-muted-foreground text-xs mt-0.5">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cargo types */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-14">
            <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">
              Что мы перевозим
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground">
              Виды грузов
            </h2>
          </FadeIn>

          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {cargoTypes.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.name}>
                  <div className="group bg-card border border-border rounded-2xl p-6 h-full hover:border-primary/40 transition-colors duration-300">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-foreground font-bold mb-2">
                      {item.name}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerChildren>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-[oklch(0.09_0.01_250)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-14 text-center">
            <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">
              Просто и прозрачно
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground">
              Как оформить перевозку
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                n: "01",
                title: "Оставьте заявку",
                text: "Заполните форму на сайте или позвоните — укажите маршрут и вес груза.",
              },
              {
                n: "02",
                title: "Согласование",
                text: "Менеджер уточнит детали, озвучит стоимость и подберёт подходящий транспорт.",
              },
              {
                n: "03",
                title: "Подача транспорта",
                text: "Транспорт подаётся в указанное место в согласованное время.",
              },
              {
                n: "04",
                title: "Доставка и документы",
                text: "Груз доставлен, выдан полный пакет документов.",
              },
            ].map((step) => (
              <FadeIn key={step.n} delay={parseInt(step.n) * 0.08}>
                <div className="bg-card border border-border rounded-2xl p-6 h-full">
                  <span className="text-primary/30 font-black text-4xl leading-none block mb-4">
                    {step.n}
                  </span>
                  <h3 className="text-foreground font-bold mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.text}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-14">
            <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">
              Почему выбирают нас
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground">
              Наши преимущества
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {advantages.map((adv) => {
              const Icon = adv.icon;
              return (
                <FadeIn key={adv.title}>
                  <div className="group bg-card border border-border rounded-2xl p-6 h-full hover:border-primary/40 transition-colors duration-300">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-foreground font-bold mb-2">
                      {adv.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {adv.text}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-24 bg-[oklch(0.09_0.01_250)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">
                Что входит в услугу
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-6">
                Полный сервис без скрытых платежей
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Стоимость грузоперевозки включает подачу транспорта, погрузку
                (при наличии погрузочной техники), перевозку до места назначения
                и выгрузку. Расчёт ведётся по весу или машинами.
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  "Подача транспорта в согласованное место и время",
                  "Перевозка груза до точки назначения",
                  "Сопровождение документацией (ТТН, счёт)",
                  "Выгрузка в месте доставки",
                  "Страхование ответственности перевозчика",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-foreground/80"
                  >
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn direction="left">
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-border">
                <Image
                  src="/images/fleet.jpeg"
                  alt="Автопарк Amanat Logistic"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="backdrop-blur-sm border border-white/10 rounded-xl p-4">
                    <p className="text-foreground font-bold text-sm">
                      Собственный автопарк
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Gallery — single scrollable row */}
      <section className="pb-24 bg-[oklch(0.09_0.01_250)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-8">
            <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">
              Галерея
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground">
              Техника и перевозки
            </h2>
          </FadeIn>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 px-4 sm:px-6 lg:px-8 snap-x scrollbar-thin scrollbar-thumb-primary/30">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className="relative shrink-0 snap-start w-[280px] sm:w-[340px] aspect-video rounded-2xl overflow-hidden border border-border"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Partners / sponsors scroll */}
      <section className="py-16 bg-background overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <FadeIn>
            <p className="text-muted-foreground text-xs font-semibold tracking-widest uppercase text-center">
              Нам доверяют
            </p>
          </FadeIn>
        </div>

        {/* Infinite horizontal scroll track */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div className="flex overflow-hidden">
            <motion.div
              className="flex shrink-0 gap-6 items-center"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 28, ease: "linear", repeat: Infinity }}
            >
              {[...partners, ...partners].map((partner, i) => (
                <div
                  key={i}
                  className="shrink-0 flex items-center justify-center bg-white border border-white/10 rounded-xl px-6 py-3 h-20 min-w-[180px]"
                >
                  <div className="relative w-full h-10">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <CtaSection />
      <Footer />
    </main>
  );
}
