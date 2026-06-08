"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MENU, I18N, dishImage } from "@/lib/menu";
import { useLang } from "@/lib/lang-context";
import { useScrollReveal } from "@/lib/use-reveal";
import { ForkDivider } from "./ForkDivider";

export default function DishView({
  categoryId,
  index,
}: {
  categoryId: string;
  index: number;
}) {
  const { lang } = useLang();
  const t = I18N[lang];
  const cat = MENU.find((c) => c.id === categoryId)!;
  const item = cat.items[index];

  useScrollReveal();

  return (
    <div className="relative z-10 min-h-[100svh]" id="top">
      {/* ===================== STICKY CATEGORY NAV ===================== */}
      <div className="sticky top-0 z-50 border-b border-gold/15 bg-bg/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-3 pr-28 lg:pr-3">
          <Link
            href="/"
            className="hidden shrink-0 font-display text-2xl italic text-gilded md:block"
          >
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
          href={`/menu/${cat.id}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide text-gold/80 transition-colors hover:text-gold"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.backToCategory}
        </Link>

        <article className="reveal mt-8">
          {/* Hero photo */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-gold/20 sm:aspect-[16/9]">
            <Image
              src={dishImage(cat.id, item)}
              alt={item.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/15 to-transparent" />
            {item.tag && (
              <span className="absolute left-4 top-4 rounded-pill border border-gold/40 bg-bg/60 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-gold backdrop-blur-sm">
                {item.tag[lang]}
              </span>
            )}
          </div>

          {/* Section + title */}
          <p className="mt-8 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-gold/70">
            {cat.title[lang]}
          </p>
          <h1 className="mt-2 font-display text-4xl font-medium leading-tight text-cream sm:text-5xl">
            {item.name}
          </h1>

          {/* Price */}
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-display text-3xl font-semibold text-gilded sm:text-4xl">
              {item.price}
              <span className="ml-1.5 text-lg text-gold/70">{t.currency}</span>
            </span>
            {item.note && (
              <span className="text-sm text-ink">{item.note}</span>
            )}
          </div>

          <ForkDivider className="mt-7 h-3 w-44 text-gold/50" />

          {/* Description */}
          {item.desc && (
            <div className="mt-7">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-gold/60">
                {t.dishAbout}
              </p>
              <p className="mt-3 max-w-2xl text-[1.02rem] leading-relaxed text-ink">
                {item.desc[lang]}
              </p>
            </div>
          )}
        </article>

        <div className="mt-16 flex flex-wrap gap-3">
          <Link
            href={`/menu/${cat.id}`}
            className="inline-flex items-center gap-1.5 rounded-pill border border-gold/40 px-6 py-2.5 text-sm font-semibold tracking-wide text-cream transition-colors duration-300 hover:border-gold hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.backToCategory}
          </Link>
          <Link
            href="/#menu"
            className="inline-flex items-center gap-1.5 rounded-pill px-6 py-2.5 text-sm font-semibold tracking-wide text-gold/80 transition-colors duration-300 hover:text-gold"
          >
            {t.backToMenu}
          </Link>
        </div>
      </main>
    </div>
  );
}
