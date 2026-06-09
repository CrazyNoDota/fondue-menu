"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const CART_KEY = "fondue-cart";
const PURCHASED_KEY = "fondue-purchased";

/** A line in the cart: a reference into MENU plus a quantity. */
export type CartItem = { categoryId: string; index: number; qty: number };

/** Stable key for a dish, used for the purchased set. */
export function dishKey(categoryId: string, index: number) {
  return `${categoryId}:${index}`;
}

type CartCtx = {
  items: CartItem[];
  count: number; // total quantity across all lines
  add: (categoryId: string, index: number) => void;
  remove: (categoryId: string, index: number) => void;
  setQty: (categoryId: string, index: number, qty: number) => void;
  clear: () => void;
  qtyOf: (categoryId: string, index: number) => number;
  purchased: string[];
  buy: (categoryId: string, index: number) => void;
  isPurchased: (categoryId: string, index: number) => boolean;
};

const CartContext = createContext<CartCtx | null>(null);

function parseItems(raw: string | null): CartItem[] {
  if (!raw) return [];
  try {
    const v: unknown = JSON.parse(raw);
    if (!Array.isArray(v)) return [];
    return v.filter(
      (x): x is CartItem =>
        !!x &&
        typeof x === "object" &&
        typeof (x as CartItem).categoryId === "string" &&
        Number.isInteger((x as CartItem).index) &&
        Number.isInteger((x as CartItem).qty) &&
        (x as CartItem).qty > 0,
    );
  } catch {
    return [];
  }
}

function parsePurchased(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const v: unknown = JSON.parse(raw);
    if (!Array.isArray(v)) return [];
    return v.filter((x): x is string => typeof x === "string");
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [purchased, setPurchased] = useState<string[]>([]);
  // Gate persistence until after we've read the saved state, so the empty
  // initial render never overwrites what's in localStorage. Mirrors the
  // post-mount hydration used in lang-context.
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Intentional post-mount hydration from localStorage, so server and first
    // client render agree on the empty initial state (mirrors lang-context).
    /* eslint-disable react-hooks/set-state-in-effect */
    setItems(parseItems(localStorage.getItem(CART_KEY)));
    setPurchased(parsePurchased(localStorage.getItem(PURCHASED_KEY)));
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(PURCHASED_KEY, JSON.stringify(purchased));
  }, [purchased, hydrated]);

  const add: CartCtx["add"] = (categoryId, index) =>
    setItems((prev) => {
      const at = prev.findIndex(
        (x) => x.categoryId === categoryId && x.index === index,
      );
      if (at >= 0) {
        const next = [...prev];
        next[at] = { ...next[at], qty: next[at].qty + 1 };
        return next;
      }
      return [...prev, { categoryId, index, qty: 1 }];
    });

  const remove: CartCtx["remove"] = (categoryId, index) =>
    setItems((prev) =>
      prev.filter((x) => !(x.categoryId === categoryId && x.index === index)),
    );

  const setQty: CartCtx["setQty"] = (categoryId, index, qty) =>
    setItems((prev) => {
      if (qty <= 0)
        return prev.filter(
          (x) => !(x.categoryId === categoryId && x.index === index),
        );
      return prev.map((x) =>
        x.categoryId === categoryId && x.index === index ? { ...x, qty } : x,
      );
    });

  const clear = () => setItems([]);

  const qtyOf: CartCtx["qtyOf"] = (categoryId, index) =>
    items.find((x) => x.categoryId === categoryId && x.index === index)?.qty ??
    0;

  const buy: CartCtx["buy"] = (categoryId, index) =>
    setPurchased((prev) => {
      const key = dishKey(categoryId, index);
      return prev.includes(key) ? prev : [...prev, key];
    });

  const isPurchased: CartCtx["isPurchased"] = (categoryId, index) =>
    purchased.includes(dishKey(categoryId, index));

  const count = items.reduce((sum, x) => sum + x.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        count,
        add,
        remove,
        setQty,
        clear,
        qtyOf,
        purchased,
        buy,
        isPurchased,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
