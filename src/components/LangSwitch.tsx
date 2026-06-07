"use client";

import { I18N, LANGS } from "@/lib/menu";
import { useLang } from "@/lib/lang-context";

export function LangSwitch() {
  const { lang, setLang } = useLang();
  const t = I18N[lang];

  return (
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
  );
}
