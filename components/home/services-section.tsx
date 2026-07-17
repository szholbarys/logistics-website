import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/fade-in";

const materials = [
  {
    name: "Щебень",
    description:
      "Все фракции: 5–10, 5-20, 10–20, 20–40, 40–70 мм. Гранитный, известняковый, гравийный.",
    image: "/images/sheben.webp",
    tag: "Популярное",
  },
  {
    name: "Песок",
    description:
      "Речной, карьерный, сеяный. Для строительства, засыпки и благоустройства.",
    image: "/images/sand.png",
    tag: "",
  },
  {
    name: "Гравий и ПГС",
    description:
      "Природная и дроблёная ПГС, гравий различных фракций для дорожных работ.",
    image: "/images/gravel.png",
    tag: "",
  },
  {
    name: "Вывоз отходов",
    description:
      "Вывоз грунтов, строительного мусора, боя кирпича и бетона на полигоны.",
    image: "/images/waste-removal.png",
    tag: "Услуга",
  },
];

const cargo = [
  {
    name: "Строительные грузы",
    description:
      "Блоки, металлоконструкции, трубы, арматура, плиты перекрытий.",
    image: "/images/stroyka.png",
    tag: "",
  },
  {
    name: "Промышленное оборудование",
    description: "Станки, агрегаты и технические конструкции любой сложности.",
    image: "/images/promyshlennoe.jpg",
    tag: "",
  },
  {
    name: "Негабаритные грузы",
    description:
      "Крупногабаритные и тяжеловесные грузы с оформлением разрешений.",
    image: "/images/negoboritnye.jpg",
    tag: "Тралы",
  },
  {
    name: "Коммерческие грузы",
    description:
      "Товары, ТНП, торговое оборудование и продукция между городами и регионами.",
    image: "/images/commercial.jpg",
    tag: "",
  },
];

function ServiceGroup({
  eyebrow,
  title,
  linkHref,
  linkLabel,
  items,
}: {
  eyebrow: string;
  title: string;
  linkHref: string;
  linkLabel: string;
  items: { name: string; description: string; image: string; tag: string }[];
}) {
  return (
    <div>
      <FadeIn className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
        <div>
          <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">
            {eyebrow}
          </p>
          <h3 className="text-2xl sm:text-3xl font-black text-foreground text-balance">
            {title}
          </h3>
        </div>
        <Link
          href={linkHref}
          className="inline-flex items-center gap-2 text-sm text-primary font-semibold hover:gap-3 transition-all"
        >
          {linkLabel}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </FadeIn>

      <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <StaggerItem key={item.name}>
            <div className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/40 transition-colors duration-300 cursor-pointer h-full">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                {item.tag && (
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-semibold">
                    {item.tag}
                  </span>
                )}
              </div>
              <div className="p-5">
                <h4 className="text-foreground font-bold text-lg mb-2">
                  {item.name}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </div>
  );
}

export function ServicesSection() {
  return (
    <section className="py-24 bg-[oklch(0.09_0.01_250)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">
            Что мы делаем
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground text-balance">
            Два направления перевозок
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mt-4 max-w-2xl mx-auto">
            Доставка сыпучих материалов и грузоперевозки собственным автопарком
            грузоподъёмностью 1–200 тонн.
          </p>
        </FadeIn>

        <div className="flex flex-col gap-20">
          <ServiceGroup
            eyebrow="Что мы доставляем"
            title="Инертные материалы и строительные грузы"
            linkHref="/services"
            linkLabel="Все услуги"
            items={materials}
          />
          <ServiceGroup
            eyebrow="Что мы перевозим"
            title="Грузоперевозки по Казахстану и СНГ"
            linkHref="/cargo"
            linkLabel="О грузоперевозках"
            items={cargo}
          />
        </div>
      </div>
    </section>
  );
}
