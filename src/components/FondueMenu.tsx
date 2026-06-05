"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  MapPin,
  Clock,
  Phone,
  Navigation,
  MessageCircle,
  CreditCard,
  ChevronDown,
} from "lucide-react";
import {
  MENU,
  FEATURED,
  I18N,
  LANGS,
  CONTACT,
  type Lang,
} from "@/lib/menu";
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
  const [lang, setLang] = useState<Lang>("ru");
  const [activeId, setActiveId] = useState<string>(MENU[0].id);
  const [heroShown, setHeroShown] = useState(false);
  const t = I18N[lang];

  const chipRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const id = requestAnimationFrame(() => setHeroShown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Reveal-on-scroll for any element marked `.reveal`.
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Scroll-spy: highlight the category currently in view.
  useEffect(() => {
    const sections = MENU.map((c) => document.getElementById(c.id)).filter(
      Boolean,
    ) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const chip = chipRefs.current[activeId];
    chip?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeId]);

  return (
    <div className="relative z-10" id="top">
      {/* ===================== LANGUAGE SWITCH ===================== */}
      <div
        className="fixed right-3 top-3 z-[60] flex items-center gap-0.5 rounded-pill border border-gold/30 bg-bg/80 p-1 backdrop-blur-md"
        role="group"
        aria-label={t.langLabel}
      >
        {LANGS.map(({ code, label }) => {
          const on = lang === code;
          return (
            <button
              key={code}
              onClick={() => setLang(code)}
              aria-pressed={on}
              className={[
                "rounded-pill px-2.5 py-1 text-[0.72rem] font-bold tracking-wide transition-colors duration-200",
                on ? "bg-gold text-bg" : "text-cream/65 hover:text-cream",
              ].join(" ")}
            >
              {label}
            </button>
          );
        })}
      </div>

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
      <div className="sticky top-0 z-50 border-b border-gold/15 bg-bg/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-3 pr-28 lg:pr-3">
          <span className="hidden shrink-0 font-display text-2xl italic text-gilded md:block">
            Fondue
          </span>
          <nav
            className="flex flex-1 gap-1.5 overflow-x-auto py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Категории меню"
          >
            {MENU.map((c) => {
              const active = activeId === c.id;
              return (
                <a
                  key={c.id}
                  href={`#${c.id}`}
                  ref={(el) => {
                    chipRefs.current[c.id] = el;
                  }}
                  aria-current={active ? "true" : undefined}
                  className={[
                    "shrink-0 rounded-pill px-3.5 py-1.5 text-[0.82rem] font-medium tracking-wide whitespace-nowrap transition-colors duration-200",
                    active
                      ? "bg-gold text-bg"
                      : "border border-gold/25 text-cream/70 hover:border-gold/60 hover:text-cream",
                  ].join(" ")}
                >
                  {c.title[lang]}
                </a>
              );
            })}
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
            <a
              key={f.image}
              href={`#${f.to}`}
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
            </a>
          ))}
        </div>
      </section>

      {/* ============================ MENU ============================ */}
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-16" id="menu">
        <div className="reveal mb-16 text-center">
          <div className="ornament mb-6 text-[0.7rem]">✦</div>
          <h2 className="font-display text-6xl font-medium tracking-tight text-cream sm:text-7xl">
            {t.menuTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-ink">
            {t.qrNote}
          </p>
        </div>

        <div className="space-y-16">
          {MENU.map((cat) => (
            <section
              key={cat.id}
              id={cat.id}
              className="reveal scroll-mt-24"
              aria-labelledby={`${cat.id}-title`}
            >
              <div className="mb-7 flex items-center gap-4">
                <h3
                  id={`${cat.id}-title`}
                  className="font-display text-4xl font-semibold tracking-tight text-gold-soft sm:text-[2.65rem]"
                >
                  {cat.title[lang]}
                </h3>
                <span className="h-px flex-1 bg-gradient-to-r from-gold/35 to-transparent" />
              </div>

              <ul className="space-y-5">
                {cat.items.map((item, i) => (
                  <li
                    key={item.name + i}
                    className="reveal-row"
                    style={{ "--i": i } as React.CSSProperties}
                  >
                    <div className="flex items-end">
                      <div className="min-w-0">
                        <span className="align-middle text-[1.06rem] font-medium leading-tight text-cream">
                          {item.name}
                        </span>
                        {item.tag && (
                          <span className="ml-2 inline-block translate-y-[-1px] rounded-pill border border-gold/40 px-2 py-[1px] align-middle text-[0.6rem] font-semibold uppercase tracking-wider text-gold">
                            {item.tag[lang]}
                          </span>
                        )}
                        {item.note && (
                          <span className="ml-2 align-middle text-xs text-ink">
                            {item.note}
                          </span>
                        )}
                      </div>
                      <span className="leader" aria-hidden="true" />
                      <span className="shrink-0 whitespace-nowrap font-display text-xl font-semibold text-gilded">
                        {item.price}
                        <span className="ml-1 text-sm text-gold/70">{t.currency}</span>
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
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
