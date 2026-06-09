"use client";

import Link from "next/link";
import { User } from "lucide-react";
import { I18N, LANGS } from "@/lib/menu";
import { useLang } from "@/lib/lang-context";
import { useCart } from "@/lib/cart-context";

/**
 * Fixed top-right control cluster: personal/cart entry point + language switch.
 * Rendered once from the root layout so it follows the user across pages.
 */
export function TopBar() {
  const { lang, setLang } = useLang();
  const { count } = useCart();
  const t = I18N[lang];

  return (
    <div className="fixed right-3 top-3 z-[60] flex items-center gap-2">
      <Link
        href="/personal"
        aria-label={t.personal}
        className="relative flex items-center justify-center rounded-pill border border-gold/30 bg-bg/80 p-2 text-cream/75 backdrop-blur-md transition-colors duration-200 hover:text-gold"
      >
        <User className="h-4 w-4" />
        {count > 0 && (
          <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-gold px-1 text-[0.62rem] font-bold leading-none text-bg">
            {count}
          </span>
        )}
      </Link>

      <div
        className="flex items-center gap-0.5 rounded-pill border border-gold/30 bg-bg/80 p-1 backdrop-blur-md"
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
    </div>
  );
}
