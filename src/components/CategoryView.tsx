"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MENU, I18N } from "@/lib/menu";
import { useLang } from "@/lib/lang-context";
import { useScrollReveal } from "@/lib/use-reveal";
import { ForkDivider } from "./ForkDivider";

export default function CategoryView({ id }: { id: string }) {
  const { lang } = useLang();
  const t = I18N[lang];
  const cat = MENU.find((c) => c.id === id)!;

  useScrollReveal();

  return (
    <div className="relative z-10 min-h-[100svh]" id="top">
      {/* ===================== STICKY CATEGORY NAV ===================== */}
      <div className="sticky top-0 z-50 border-b border-gold/15 bg-bg/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-3 pr-48 2xl:pr-3">
          <Link
            href="/"
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
          </Link>
          <nav
            className="flex flex-1 gap-1.5 overflow-x-auto py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Категории меню"
          >
            {MENU.map((c) => {
              const active = c.id === cat.id;
              return (
                <Link
                  key={c.id}
                  href={`/menu/${c.id}`}
                  aria-current={active ? "true" : undefined}
                  className={[
                    "shrink-0 rounded-pill px-3.5 py-1.5 text-[0.82rem] font-medium tracking-wide whitespace-nowrap transition-colors duration-200",
                    active
                      ? "bg-gold text-bg"
                      : "border border-gold/25 text-cream/70 hover:border-gold/60 hover:text-cream",
                  ].join(" ")}
                >
                  {c.title[lang]}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <main className="mx-auto max-w-3xl px-6 pb-24 pt-10">
        <Link
          href="/#menu"
          className="inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide text-gold/80 transition-colors hover:text-gold"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.backToMenu}
        </Link>

        <div className="reveal mb-12 mt-8 text-center">
          <div className="ornament mb-6 text-[0.7rem]">✦</div>
          <h1 className="font-display text-5xl font-medium tracking-tight text-cream sm:text-6xl">
            {cat.title[lang]}
          </h1>
          <ForkDivider className="mx-auto mt-5 h-3 w-44 text-gold/50" />
        </div>

        <ul className="reveal space-y-1">
          {cat.items.map((item, i) => (
            <li
              key={item.name + i}
              className="reveal-row"
              style={{ "--i": i } as React.CSSProperties}
            >
              <Link
                href={`/menu/${cat.id}/${i}`}
                className="group -mx-3 flex items-end rounded-xl px-3 py-3 transition-colors duration-200 hover:bg-wine/30"
              >
                <div className="min-w-0">
                  <span className="align-middle text-[1.06rem] font-medium leading-tight text-cream transition-colors group-hover:text-gold-soft">
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
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-16 text-center">
          <Link
            href="/#menu"
            className="inline-flex items-center gap-1.5 rounded-pill border border-gold/40 px-6 py-2.5 text-sm font-semibold tracking-wide text-cream transition-colors duration-300 hover:border-gold hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.backToMenu}
          </Link>
        </div>
      </main>
    </div>
  );
}
