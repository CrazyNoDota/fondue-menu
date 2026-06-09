"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Settings,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
} from "lucide-react";
import { MENU, I18N, dishImage, parsePrice } from "@/lib/menu";
import { useLang } from "@/lib/lang-context";
import { useCart } from "@/lib/cart-context";
import { ForkDivider } from "./ForkDivider";

function formatNum(n: number) {
  return n.toLocaleString("ru-RU");
}

export default function PersonalView() {
  const { lang } = useLang();
  const { items, setQty, add, remove, clear, count } = useCart();
  const t = I18N[lang];

  // Resolve each cart line against the menu (dropping anything stale).
  const lines = items
    .map((line) => {
      const cat = MENU.find((c) => c.id === line.categoryId);
      const item = cat?.items[line.index];
      if (!cat || !item) return null;
      return { ...line, cat, item };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  const total = lines.reduce(
    (sum, l) => sum + parsePrice(l.item.price) * l.qty,
    0,
  );

  return (
    <div className="relative z-10 min-h-[100svh]" id="top">
      {/* ===================== HEADER ===================== */}
      <div className="sticky top-0 z-50 border-b border-gold/15 bg-bg/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-3 py-2.5 pr-48 2xl:pr-3">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 font-display text-2xl italic text-gilded"
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
        </div>
      </div>

      <main className="mx-auto max-w-3xl px-6 pb-24 pt-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide text-gold/80 transition-colors hover:text-gold"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.home}
        </Link>

        <div className="mb-12 mt-8 text-center">
          <div className="ornament mb-6 text-[0.7rem]">✦</div>
          <h1 className="font-display text-5xl font-medium tracking-tight text-cream sm:text-6xl">
            {t.personal}
          </h1>
          <ForkDivider className="mx-auto mt-5 h-3 w-44 text-gold/50" />
        </div>

        {/* ===================== SETTINGS ===================== */}
        <section className="mb-12">
          <h2 className="mb-4 flex items-center gap-2 font-display text-2xl font-semibold text-gold-soft sm:text-3xl">
            <Settings className="h-5 w-5 text-gold/70" />
            {t.settingsSection}
          </h2>
          <div className="rounded-2xl border border-gold/20 bg-wine/20 p-6 text-sm leading-relaxed text-ink">
            {t.settingsSoon}
          </div>
        </section>

        {/* ===================== CART ===================== */}
        <section>
          <h2 className="mb-4 flex items-center gap-2 font-display text-2xl font-semibold text-gold-soft sm:text-3xl">
            <ShoppingCart className="h-5 w-5 text-gold/70" />
            {t.cartSection}
            {count > 0 && (
              <span className="text-base font-medium text-gold/60">
                · {count}
              </span>
            )}
          </h2>

          {lines.length === 0 ? (
            <div className="rounded-2xl border border-gold/20 bg-wine/20 p-8 text-center">
              <p className="text-sm text-ink">{t.cartEmpty}</p>
              <Link
                href="/#menu"
                className="mt-5 inline-flex items-center gap-1.5 rounded-pill border border-gold/40 px-6 py-2.5 text-sm font-semibold tracking-wide text-cream transition-colors duration-300 hover:border-gold hover:text-gold"
              >
                {t.browseMenu}
              </Link>
            </div>
          ) : (
            <>
              <ul className="space-y-3">
                {lines.map((l) => (
                  <li
                    key={`${l.categoryId}:${l.index}`}
                    className="flex items-center gap-4 rounded-2xl border border-gold/20 bg-wine/20 p-3"
                  >
                    <Link
                      href={`/menu/${l.categoryId}/${l.index}`}
                      className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-gold/20"
                    >
                      <Image
                        src={dishImage(l.categoryId, l.item)}
                        alt={l.item.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </Link>

                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/menu/${l.categoryId}/${l.index}`}
                        className="block truncate font-medium text-cream transition-colors hover:text-gold-soft"
                      >
                        {l.item.name}
                      </Link>
                      <p className="mt-0.5 text-xs uppercase tracking-wider text-gold/55">
                        {l.cat.title[lang]}
                      </p>
                      <p className="mt-1 font-display text-lg font-semibold text-gilded">
                        {l.item.price}
                        <span className="ml-1 text-sm text-gold/70">
                          {t.currency}
                        </span>
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-1 rounded-pill border border-gold/30 p-1">
                        <button
                          type="button"
                          aria-label="−"
                          onClick={() =>
                            setQty(l.categoryId, l.index, l.qty - 1)
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-full text-cream/80 transition-colors hover:bg-gold hover:text-bg"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-[1.25rem] text-center text-sm font-semibold text-cream">
                          {l.qty}
                        </span>
                        <button
                          type="button"
                          aria-label="+"
                          onClick={() => add(l.categoryId, l.index)}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-cream/80 transition-colors hover:bg-gold hover:text-bg"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(l.categoryId, l.index)}
                        className="inline-flex items-center gap-1 text-xs font-medium text-ink transition-colors hover:text-gold"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        {t.removeItem}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center justify-between border-t border-gold/15 pt-5">
                <button
                  type="button"
                  onClick={clear}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-gold"
                >
                  <Trash2 className="h-4 w-4" />
                  {t.clearCart}
                </button>
                <p className="font-display text-2xl font-semibold text-cream">
                  {t.total}:{" "}
                  <span className="text-gilded">{formatNum(total)}</span>
                  <span className="ml-1 text-base text-gold/70">
                    {t.currency}
                  </span>
                </p>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}
