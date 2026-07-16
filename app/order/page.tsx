"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FadeIn } from "@/components/fade-in";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  MapPin,
  MessageCircle,
  CheckCircle,
  ChevronDown,
} from "lucide-react";

const WHATSAPP_NUMBER_BULK = "77752869576";
const WHATSAPP_NUMBER_CARGO = "77077373333";

// ─── Bulk materials ───────────────────────────────────────────────
const bulkMaterialOptions = [
  "Щебень (фракция 5–10 мм)",
  "Щебень (фракция 10–20 мм)",
  "Щебень (фракция 20–40 мм)",
  "Щебень (фракция 40–70 мм)",
  "Песок речной",
  "Песок карьерный",
  "Гравий",
  "ПГС (песчано-гравийная смесь)",
  "ГЩС",
  "Отсев щебня",
  "Известняк",
  "Нерудная горная масса",
  "Вывоз грунта",
  "Вывоз строительного мусора",
  "Вывоз промышленных отходов",
  "Другое",
];

// ─── Cargo types ──────────────────────────────────────────────────
const cargoTypeOptions = [
  "Строительные материалы",
  "Промышленное оборудование",
  "Негабаритный груз",
  "Коммерческие товары",
  "Металлоконструкции",
  "Сыпучие грузы (насыпью)",
  "Другое",
];

type UnitType = "тонн" | "м³";
type TabType = "bulk" | "cargo";

// ─── Bulk form ────────────────────────────────────────────────────
interface BulkForm {
  fullName: string;
  phone: string;
  material: string;
  quantity: string;
  unit: UnitType;
  address: string;
  comment: string;
}

const initialBulk: BulkForm = {
  fullName: "",
  phone: "",
  material: "",
  quantity: "",
  unit: "тонн",
  address: "",
  comment: "",
};

type BulkErrors = Partial<Record<keyof BulkForm, string>>;

function validateBulk(form: BulkForm): BulkErrors {
  const e: BulkErrors = {};
  if (!form.fullName.trim()) e.fullName = "Укажите ваше имя";
  if (!form.phone.trim()) e.phone = "Укажите номер телефона";
  if (!form.material) e.material = "Выберите материал или услугу";
  if (!form.quantity.trim()) e.quantity = "Укажите количество";
  if (!form.address.trim()) e.address = "Укажите адрес доставки";
  return e;
}

// ─── Cargo form ───────────────────────────────────────────────────
interface CargoForm {
  fullName: string;
  phone: string;
  cargoType: string;
  weight: string;
  from: string;
  to: string;
  comment: string;
}

const initialCargo: CargoForm = {
  fullName: "",
  phone: "",
  cargoType: "",
  weight: "",
  from: "",
  to: "",
  comment: "",
};

type CargoErrors = Partial<Record<keyof CargoForm, string>>;

function validateCargo(form: CargoForm): CargoErrors {
  const e: CargoErrors = {};
  if (!form.fullName.trim()) e.fullName = "Укажите ваше имя";
  if (!form.phone.trim()) e.phone = "Укажите номер телефона";
  if (!form.cargoType) e.cargoType = "Выберите тип груза";
  if (!form.weight.trim()) e.weight = "Укажите вес груза";
  else if (parseFloat(form.weight) < 5) e.weight = "Минимальный заказ — 5 тонн";
  if (!form.from.trim()) e.from = "Укажите адрес погрузки";
  if (!form.to.trim()) e.to = "Укажите адрес выгрузки";
  return e;
}

// ─── Shared input class helper ────────────────────────────────────
function inputCls(hasError: boolean) {
  return `w-full bg-[oklch(0.16_0.01_250)] border rounded-xl px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary/70 focus:ring-1 focus:ring-primary/30 ${
    hasError ? "border-destructive/60" : "border-border hover:border-white/20"
  }`;
}

// ─── Custom dropdown ──────────────────────────────────────────────
function Dropdown({
  options,
  value,
  onChange,
  placeholder,
  hasError,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  hasError: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between bg-[oklch(0.16_0.01_250)] border rounded-xl px-4 py-3 text-sm outline-none transition-colors ${
          hasError
            ? "border-destructive/60"
            : "border-border hover:border-white/20 focus:border-primary/70"
        } ${value ? "text-foreground" : "text-muted-foreground/60"}`}
      >
        {value || placeholder}
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute z-20 top-full left-0 right-0 mt-1 bg-[oklch(0.16_0.01_250)] border border-border rounded-xl overflow-y-auto max-h-56 shadow-xl"
          >
            {options.map((opt) => (
              <li key={opt}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-white/5 transition-colors ${
                    value === opt
                      ? "text-primary font-medium"
                      : "text-foreground/80"
                  }`}
                >
                  {opt}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────
function Sidebar() {
  return (
    <FadeIn direction="left" className="flex flex-col gap-5">
      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="font-black text-foreground mb-4">Как это работает</h3>
        <ol className="flex flex-col gap-4">
          {[
            { n: "1", text: "Заполните форму с деталями заказа" },
            { n: "2", text: "Нажмите «Отправить в WhatsApp»" },
            { n: "3", text: "Подтвердите отправку в открывшемся WhatsApp" },
            { n: "4", text: "Ждите звонка от нашего менеджера" },
          ].map((step) => (
            <li key={step.n} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-black flex items-center justify-center shrink-0">
                {step.n}
              </span>
              <span className="text-sm text-muted-foreground leading-relaxed">
                {step.text}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="font-black text-foreground mb-4">Или позвоните нам</h3>
        <div className="flex flex-col gap-3">
          {[
            {
              href: "tel:+77077373333",
              number: "+7 707 737 33 33",
              label: "Логистика",
            },
            {
              href: "tel:+77752869576",
              number: "+7 775 286 95 76",
              label: "Сыпучие материалы",
            },
          ].map((c) => (
            <a
              key={c.href}
              href={c.href}
              className="flex items-center gap-3 group"
            >
              <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Phone className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-foreground font-semibold text-sm group-hover:text-primary transition-colors">
                  {c.number}
                </p>
                <p className="text-muted-foreground text-xs">{c.label}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="font-bold text-foreground text-sm mb-1">Офис</p>
            <p className="text-muted-foreground text-xs leading-relaxed">
              г. Алматы, пр. Райымбека, 481А,
              <br />
              БЦ «Эталон», 4 эт., офис 5
            </p>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

// ─── Success screen ───────────────────────────────────────────────
function SuccessScreen({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-card border border-border rounded-2xl p-10 text-center"
    >
      <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-8 h-8 text-primary" />
      </div>
      <h2 className="text-2xl font-black text-foreground mb-3">Отлично!</h2>
      <p className="text-muted-foreground leading-relaxed mb-8 max-w-sm mx-auto">
        WhatsApp открыт с вашим сообщением. После отправки наш менеджер свяжется
        с вами в ближайшее время.
      </p>
      <button
        onClick={onReset}
        className="px-6 py-3 rounded-full bg-card border border-border text-foreground font-semibold text-sm hover:border-primary/40 transition-colors"
      >
        Оформить ещё один заказ
      </button>
    </motion.div>
  );
}

// ─── Bulk materials form ──────────────────────────────────────────
function BulkForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState<BulkForm>(initialBulk);
  const [errors, setErrors] = useState<BulkErrors>({});

  const set =
    (key: keyof BulkForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateBulk(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const orderNumber = Math.floor(100000000000 + Math.random() * 900000000000);
    const now = new Date();
    const dateStr = now.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const timeStr = now.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const text = [
      `№ ${orderNumber}`,
      `${dateStr}, ${timeStr}`,
      ``,
      `Имя: ${form.fullName}`,
      `Телефон: ${form.phone}`,
      ``,
      `Материал / услуга: ${form.material}`,
      `Количество: ${form.quantity} ${form.unit}`,
      `Адрес доставки: ${form.address}`,
      form.comment ? `Комментарий: ${form.comment}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER_BULK}?text=${encodeURIComponent(text)}`,
      "_blank",
    );
    onSuccess();
  };

  return (
    <motion.form
      key="bulk-form"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      onSubmit={handleSubmit}
      noValidate
      className="bg-card border border-border rounded-2xl p-6 sm:p-10"
    >
      {/* Name + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            ФИО <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            placeholder="ФИО или название компании"
            value={form.fullName}
            onChange={set("fullName")}
            className={inputCls(!!errors.fullName)}
          />
          {errors.fullName && (
            <p className="text-destructive text-xs mt-1">{errors.fullName}</p>
          )}
        </div>
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Телефон <span className="text-primary">*</span>
          </label>
          <input
            type="tel"
            placeholder="+7 707 000 00 00"
            value={form.phone}
            onChange={set("phone")}
            className={inputCls(!!errors.phone)}
          />
          {errors.phone && (
            <p className="text-destructive text-xs mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Material */}
      <div className="mb-5">
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Материал / услуга <span className="text-primary">*</span>
        </label>
        <Dropdown
          options={bulkMaterialOptions}
          value={form.material}
          onChange={(v) => {
            setForm((p) => ({ ...p, material: v }));
            setErrors((p) => ({ ...p, material: undefined }));
          }}
          placeholder="Выберите материал или услугу"
          hasError={!!errors.material}
        />
        {errors.material && (
          <p className="text-destructive text-xs mt-1">{errors.material}</p>
        )}
      </div>

      {/* Quantity + unit toggle */}
      <div className="mb-5">
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Количество <span className="text-primary">*</span>
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            min="0"
            placeholder="Например: 20"
            value={form.quantity}
            onChange={set("quantity")}
            className={`flex-1 ${inputCls(!!errors.quantity)}`}
          />
          <div className="flex rounded-xl border border-border overflow-hidden shrink-0">
            {(["тонн", "м³"] as UnitType[]).map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => setForm((p) => ({ ...p, unit: u }))}
                className={`px-4 py-3 text-sm font-semibold transition-colors ${
                  form.unit === u
                    ? "bg-primary text-primary-foreground"
                    : "bg-[oklch(0.16_0.01_250)] text-muted-foreground hover:text-foreground"
                }`}
              >
                {u}
              </button>
            ))}
          </div>
        </div>
        {errors.quantity && (
          <p className="text-destructive text-xs mt-1">{errors.quantity}</p>
        )}
        <p className="text-muted-foreground text-xs mt-1.5">
          Например: 4 тонны щебня или 3 м³ песка
        </p>
      </div>

      {/* Address */}
      <div className="mb-5">
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Адрес доставки <span className="text-primary">*</span>
        </label>
        <input
          type="text"
          placeholder="г. Алматы, ул. Примерная, 10"
          value={form.address}
          onChange={set("address")}
          className={inputCls(!!errors.address)}
        />
        {errors.address && (
          <p className="text-destructive text-xs mt-1">{errors.address}</p>
        )}
      </div>

      {/* Comment */}
      <div className="mb-8">
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Комментарий{" "}
          <span className="ml-2 text-muted-foreground/50 normal-case font-normal">
            (необязательно)
          </span>
        </label>
        <textarea
          rows={3}
          placeholder="Дополнительные пожелания, особенности подъезда..."
          value={form.comment}
          onChange={set("comment")}
          className={`${inputCls(false)} resize-none`}
        />
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[oklch(0.38_0.15_155)] hover:bg-[oklch(0.42_0.17_155)] text-white font-bold text-base transition-all hover:scale-[1.02] active:scale-95 shadow-lg"
      >
        <MessageCircle className="w-5 h-5" />
        Отправить в WhatsApp
      </button>
      <p className="text-muted-foreground text-xs text-center mt-3">
        Откроется WhatsApp с готовым сообщением — просто нажмите «Отправить»
      </p>
    </motion.form>
  );
}

// ─── Cargo transport form ─────────────────────────────────────────
function CargoFormSection({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState<CargoForm>(initialCargo);
  const [errors, setErrors] = useState<CargoErrors>({});

  const set =
    (key: keyof CargoForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateCargo(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const orderNumber = Math.floor(100000000000 + Math.random() * 900000000000);
    const now = new Date();
    const dateStr = now.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const timeStr = now.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const text = [
      `№ ${orderNumber}`,
      `${dateStr}, ${timeStr}`,
      ``,
      `Имя: ${form.fullName}`,
      `Телефон: ${form.phone}`,
      ``,
      `Тип груза: ${form.cargoType}`,
      `Вес: ${form.weight} тонн`,
      `Адрес погрузки: ${form.from}`,
      `Адрес выгрузки: ${form.to}`,
      form.comment ? `Комментарий: ${form.comment}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER_CARGO}?text=${encodeURIComponent(text)}`,
      "_blank",
    );
    onSuccess();
  };

  return (
    <motion.form
      key="cargo-form"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      onSubmit={handleSubmit}
      noValidate
      className="bg-card border border-border rounded-2xl p-6 sm:p-10"
    >
      {/* Name + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            ФИО <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            placeholder="ФИО или название компании"
            value={form.fullName}
            onChange={set("fullName")}
            className={inputCls(!!errors.fullName)}
          />
          {errors.fullName && (
            <p className="text-destructive text-xs mt-1">{errors.fullName}</p>
          )}
        </div>
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Телефон <span className="text-primary">*</span>
          </label>
          <input
            type="tel"
            placeholder="+7 707 000 00 00"
            value={form.phone}
            onChange={set("phone")}
            className={inputCls(!!errors.phone)}
          />
          {errors.phone && (
            <p className="text-destructive text-xs mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Cargo type */}
      <div className="mb-5">
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Тип груза <span className="text-primary">*</span>
        </label>
        <Dropdown
          options={cargoTypeOptions}
          value={form.cargoType}
          onChange={(v) => {
            setForm((p) => ({ ...p, cargoType: v }));
            setErrors((p) => ({ ...p, cargoType: undefined }));
          }}
          placeholder="Выберите тип груза"
          hasError={!!errors.cargoType}
        />
        {errors.cargoType && (
          <p className="text-destructive text-xs mt-1">{errors.cargoType}</p>
        )}
      </div>

      {/* Weight — tonnes only */}
      <div className="mb-5">
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Вес груза, тонн <span className="text-primary">*</span>
        </label>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            min="5"
            placeholder="Минимум 5 тонн"
            value={form.weight}
            onChange={set("weight")}
            className={`flex-1 ${inputCls(!!errors.weight)}`}
          />
          <div className="shrink-0 px-4 py-3 rounded-xl bg-[oklch(0.16_0.01_250)] border border-border text-muted-foreground text-sm font-semibold">
            тонн
          </div>
        </div>
        {errors.weight && (
          <p className="text-destructive text-xs mt-1">{errors.weight}</p>
        )}
        <p className="text-muted-foreground text-xs mt-1.5">
          Минимальный заказ — 5 тонн
        </p>
      </div>

      {/* From + To */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Адрес погрузки <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            placeholder="г. Алматы, ул. Складская, 5"
            value={form.from}
            onChange={set("from")}
            className={inputCls(!!errors.from)}
          />
          {errors.from && (
            <p className="text-destructive text-xs mt-1">{errors.from}</p>
          )}
        </div>
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Адрес выгрузки <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            placeholder="г. Алматы, пр. Абая, 100"
            value={form.to}
            onChange={set("to")}
            className={inputCls(!!errors.to)}
          />
          {errors.to && (
            <p className="text-destructive text-xs mt-1">{errors.to}</p>
          )}
        </div>
      </div>

      {/* Comment */}
      <div className="mb-8">
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Комментарий{" "}
          <span className="ml-2 text-muted-foreground/50 normal-case font-normal">
            (необязательно)
          </span>
        </label>
        <textarea
          rows={3}
          placeholder="Особенности груза, требования к транспорту, желаемое время..."
          value={form.comment}
          onChange={set("comment")}
          className={`${inputCls(false)} resize-none`}
        />
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[oklch(0.38_0.15_155)] hover:bg-[oklch(0.42_0.17_155)] text-white font-bold text-base transition-all hover:scale-[1.02] active:scale-95 shadow-lg"
      >
        <MessageCircle className="w-5 h-5" />
        Отправить в WhatsApp
      </button>
      <p className="text-muted-foreground text-xs text-center mt-3">
        Откроется WhatsApp с готовым сообщением — просто нажмите «Отправить»
      </p>
    </motion.form>
  );
}

// ─── Tab picker from URL ──────────────────────────────────────────
function OrderPageInner() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "cargo" ? "cargo" : "bulk";
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const [submitted, setSubmitted] = useState(false);

  // Reset submitted state when tab changes
  useEffect(() => {
    setSubmitted(false);
  }, [activeTab]);

  const tabs: { id: TabType; label: string }[] = [
    { id: "bulk", label: "Доставка сыпучих материалов" },
    { id: "cargo", label: "Грузоперевозка" },
  ];

  return (
    <main>
      <Navbar />

      {/* Header */}
      <section className="relative pt-32 pb-16 bg-[oklch(0.09_0.01_250)] overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.65_0.2_45) 1px, transparent 1px), linear-gradient(to right, oklch(0.65_0.2_45) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">
              Быстро и удобно
            </p>
            <h1 className="text-4xl sm:text-5xl font-black text-foreground mb-4 text-balance">
              Оформить заказ
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
              Заполните форму — мы откроем WhatsApp с уже готовым сообщением.
              Вам останется только нажать «Отправить».
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab switcher */}
          <FadeIn className="mb-8">
            <div className="inline-flex bg-card border border-border rounded-xl p-1 gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-200 ${
                    activeTab === tab.id
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {activeTab === tab.id && (
                    <motion.span
                      layoutId="tab-bg"
                      className="absolute inset-0 rounded-lg bg-primary"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Form area */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <SuccessScreen
                    key="success"
                    onReset={() => setSubmitted(false)}
                  />
                ) : activeTab === "bulk" ? (
                  <BulkForm key="bulk" onSuccess={() => setSubmitted(true)} />
                ) : (
                  <CargoFormSection
                    key="cargo"
                    onSuccess={() => setSubmitted(true)}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Sidebar */}
            <Sidebar />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function OrderPage() {
  return (
    <Suspense>
      <OrderPageInner />
    </Suspense>
  );
}
