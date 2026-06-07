"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { type Lang } from "./menu";

const STORAGE_KEY = "fondue-lang";

type LangCtx = { lang: Lang; setLang: (l: Lang) => void };

const LangContext = createContext<LangCtx | null>(null);

function isLang(v: unknown): v is Lang {
  return v === "ru" || v === "kz" || v === "en";
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ru");

  // Hydrate the saved choice after mount. This must run in an effect (not in a
  // lazy initializer) so the server and first client render agree on "ru" and
  // avoid a hydration mismatch.
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional post-mount hydration
    if (isLang(saved)) setLang(saved);
  }, []);

  // Persist + reflect on <html lang> so the choice survives navigation.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within a LangProvider");
  return ctx;
}
