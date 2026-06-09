"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Phone,
  Navigation,
  MessageCircle,
  CreditCard,
  ChevronDown,
  ArrowRight,
  UtensilsCrossed,
} from "lucide-react";
import { MENU, FEATURED, I18N, CONTACT } from "@/lib/menu";
import { useLang } from "@/lib/lang-context";
import { useScrollReveal } from "@/lib/use-reveal";
import { ForkDivider } from "./ForkDivider";

function InstagramGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function FondueMenu() {
  const { lang } = useLang();
  const [heroShown, setHeroShown] = useState(false);
  const t = I18N[lang];

  useScrollReveal();

  useEffect(() => {
    const id = requestAnimationFrame(() => setHeroShown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // QR codes on the tables point to `/#menu`. Jump straight to the menu
  // section. The browser's native hash scroll is unreliable here: the hero
  // image, the web fonts (display: swap) and reveal animations keep growing the
  // layout above #menu for the first second, so a one-shot scroll lands short.
  // Re-pin to the menu on every layout change until things settle.
  useEffect(() => {
    if (window.location.hash !== "#menu") return;
    const scrollToMenu = () =>
      document
        .getElementById("menu")
        ?.scrollIntoView({ behavior: "auto", block: "start" });

    scrollToMenu();
    const ro = new ResizeObserver(scrollToMenu);
    ro.observe(document.body);
    // Stop fighting the user once the page has stabilised.
    const stop = setTimeout(() => ro.disconnect(), 1500);
    return () => {
      ro.disconnect();
      clearTimeout(stop);
    };
  }, []);

  return (
    <div className="relative z-10" id="top">
      {/* ============================ HERO ============================ */}
      <header className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
        {/* background photo + overlays */}
        <div className="absolute inset-0">
          <Image
            src="/img/grill-hero.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-[radial-gradient(120%_85%_at_50%_28%,transparent_0%,rgba(22,5,8,0.55)_55%,rgba(22,5,8,0.95)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-transparent to-bg" />
        </div>

        <div
          className={`t-stagger relative z-10 flex flex-col items-center ${heroShown ? "is-shown" : ""}`}
        >
          <span className="t-stagger-line t-stagger-line--1 mb-6 text-[0.72rem] font-semibold uppercase tracking-[0.42em] text-gold/90">
            {t.kicker}
          </span>

          <h1 className="t-stagger-line t-stagger-line--2 font-display text-gilded text-[clamp(4.5rem,22vw,12rem)] font-medium italic leading-[0.82] drop-shadow-[0_8px_40px_rgba(0,0,0,0.6)]">
            Fondue
          </h1>

          <ForkDivider className="t-stagger-line t-stagger-line--3 mt-5 h-4 w-[min(78vw,340px)] text-gold/80" />

          <p className="t-stagger-line t-stagger-line--4 mt-7 max-w-md text-balance font-display text-xl italic leading-snug text-cream/90 sm:text-2xl">
            {t.heroTagline}
          </p>

          <div className="t-stagger-line t-stagger-line--5 mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#menu"
              className="rounded-pill bg-gold px-7 py-3 text-sm font-semibold tracking-wide text-bg shadow-[0_8px_30px_-8px_rgba(201,163,106,0.6)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              {t.viewMenu}
            </a>
            <a
              href="#info"
              className="rounded-pill border border-gold/45 bg-bg/30 px-7 py-3 text-sm font-semibold tracking-wide text-cream backdrop-blur-sm transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              {t.howToGet}
            </a>
          </div>
        </div>

        <a
          href="#featured"
          className="absolute bottom-7 z-10 text-gold/70 transition-colors hover:text-gold"
          aria-label={t.viewMenu}
        >
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </a>
      </header>

      {/* ===================== STICKY CATEGORY NAV ===================== */}
      <div className="sticky top-0 z-50 border-b border-gold/15 bg-bg/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-3 pr-48 2xl:pr-3">
          <a
            href="#top"
            className="hidden shrink-0 items-center gap-2 font-display text-2xl italic text-gilded md:flex"
          >
            <Image
              src="/logo.png"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 rounded-full object-cover"
            />
            Fondue
          </a>
          <nav
            className="flex flex-1 gap-1.5 overflow-x-auto py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Категории меню"
          >
            {MENU.map((c) => (
              <Link
                key={c.id}
                href={`/menu/${c.id}`}
                className="shrink-0 rounded-pill border border-gold/25 px-3.5 py-1.5 text-[0.82rem] font-medium tracking-wide whitespace-nowrap text-cream/70 transition-colors duration-200 hover:border-gold/60 hover:text-cream"
              >
                {c.title[lang]}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* ========================== FEATURED ========================== */}
      <section id="featured" className="reveal mx-auto max-w-5xl px-6 pt-16">
        <div className="mb-9 text-center">
          <div className="ornament mb-5 text-[0.7rem]">✦</div>
          <h2 className="font-display text-4xl font-medium text-cream sm:text-5xl">
            {t.featuredTitle}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3">
          {FEATURED.map((f) => (
            <Link
              key={f.image}
              href={`/menu/${f.to}/${f.index}`}
              className="group relative block aspect-[4/5] overflow-hidden rounded-2xl border border-gold/20"
            >
              <Image
                src={f.image}
                alt={f.name[lang]}
                fill
                sizes="(max-width: 768px) 50vw, 30vw"
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/25 to-transparent" />
              {f.tag && (
                <span className="absolute left-3 top-3 rounded-pill border border-gold/40 bg-bg/60 px-2 py-[2px] text-[0.6rem] font-semibold uppercase tracking-wider text-gold backdrop-blur-sm">
                  {f.tag[lang]}
                </span>
              )}
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="font-display text-xl font-semibold leading-tight text-cream sm:text-2xl">
                  {f.name[lang]}
                </h3>
                <p className="mt-1 font-display text-lg font-semibold text-gilded">
                  {f.price}
                  <span className="ml-1 text-sm text-gold/70">{t.currency}</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =========================== ABOUT US =========================== */}
      <section
        id="about"
        className="reveal scroll-mt-24 mx-auto max-w-3xl px-6 pt-20 text-center"
      >
        <div className="ornament mb-6 text-[0.7rem]">✦</div>
        <h2 className="font-display text-5xl font-medium text-cream sm:text-6xl">
          {t.aboutTitle}
        </h2>
        <p className="mx-auto mt-5 max-w-xl font-display text-xl italic leading-snug text-gold-soft sm:text-2xl">
          {t.aboutLead}
        </p>
        <ForkDivider className="mx-auto mt-7 h-3 w-40 text-gold/50" />
        <div className="mx-auto mt-8 max-w-2xl space-y-5 text-[0.98rem] leading-relaxed text-ink">
          <p>{t.aboutP1}</p>
          <p>{t.aboutP2}</p>
        </div>
      </section>

      {/* ===================== MENU — CATEGORY PANEL ===================== */}
      <main className="mx-auto max-w-5xl px-6 pb-24 pt-20" id="menu">
        <div className="reveal mb-14 text-center">
          <div className="ornament mb-6 text-[0.7rem]">✦</div>
          <h2 className="font-display text-6xl font-medium tracking-tight text-cream sm:text-7xl">
            {t.menuTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-ink">
            {t.menuPanelNote}
          </p>
        </div>

        <div className="reveal grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MENU.map((cat, i) => {
            const preview = cat.items
              .slice(0, 3)
              .map((it) => it.name)
              .join(" · ");
            return (
              <Link
                key={cat.id}
                href={`/menu/${cat.id}`}
                className="reveal-row group flex flex-col justify-between overflow-hidden rounded-2xl border border-gold/20 bg-wine/20 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/60 hover:bg-wine/35"
                style={{ "--i": i } as React.CSSProperties}
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-2xl font-semibold leading-tight text-gold-soft sm:text-3xl">
                      {cat.title[lang]}
                    </h3>
                    <span className="mt-1 inline-flex shrink-0 items-center gap-1 text-[0.7rem] font-semibold uppercase tracking-widest text-gold/60">
                      <UtensilsCrossed className="h-3.5 w-3.5" />
                      {cat.items.length}
                    </span>
                  </div>
                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink">
                    {preview}
                  </p>
                </div>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide text-gold transition-colors group-hover:text-gold-bright">
                  {t.categoryCta}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </main>

      {/* ============================ INFO ============================ */}
      <section
        id="info"
        className="reveal scroll-mt-24 border-t border-gold/15 bg-wine/30 px-6 py-20"
      >
        <div className="mx-auto max-w-3xl text-center">
          <div className="ornament mb-6 text-[0.7rem]">✦</div>
          <h2 className="font-display text-5xl font-medium text-cream sm:text-6xl">
            {t.infoTitle}
          </h2>

          <div className="mx-auto mt-12 grid max-w-xl gap-px overflow-hidden rounded-2xl border border-gold/20 bg-gold/10 sm:grid-cols-3">
            <InfoCell icon={<MapPin className="h-5 w-5" />} label={t.address} value={t.addressValue} />
            <InfoCell icon={<Clock className="h-5 w-5" />} label={t.hours} value={t.hoursValue} />
            <InfoCell icon={<Phone className="h-5 w-5" />} label={t.phone} value={CONTACT.phoneDisplay} />
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Action href={CONTACT.twoGis} icon={<Navigation className="h-4 w-4" />} label={t.route} primary />
            <Action href={CONTACT.whatsapp} icon={<MessageCircle className="h-4 w-4" />} label={t.whatsapp} />
            <Action href={CONTACT.instagram} icon={<InstagramGlyph className="h-4 w-4" />} label={t.instagram} />
            <Action href={CONTACT.kaspi} icon={<CreditCard className="h-4 w-4" />} label={t.kaspi} />
          </div>
        </div>
      </section>

      {/* ============================ FOOTER ============================ */}
      <footer className="px-6 py-12 text-center">
        <p className="font-display text-4xl italic text-gilded">Fondue</p>
        <ForkDivider className="mx-auto mt-3 h-3 w-44 text-gold/50" />
        <p className="mt-5 text-xs leading-relaxed text-ink">
          {t.footerMade}
          <br />
          <span className="text-gold/50">{t.footerDemo}</span>
        </p>
      </footer>
    </div>
  );
}

function InfoCell({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-bg/60 px-5 py-7">
      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-gold">
        {icon}
      </div>
      <p className="text-[0.68rem] font-semibold uppercase tracking-widest text-gold/70">
        {label}
      </p>
      <p className="mt-1.5 text-sm font-medium text-cream">{value}</p>
    </div>
  );
}

function Action({
  href,
  icon,
  label,
  primary = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        "inline-flex items-center gap-2 rounded-pill px-5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5",
        primary
          ? "bg-gold text-bg shadow-[0_8px_30px_-10px_rgba(201,163,106,0.7)]"
          : "border border-gold/40 text-cream hover:border-gold hover:text-gold",
      ].join(" ")}
    >
      {icon}
      {label}
    </a>
  );
}
