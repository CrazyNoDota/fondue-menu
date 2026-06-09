import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/lib/lang-context";
import { CartProvider } from "@/lib/cart-context";
import { TopBar } from "@/components/TopBar";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fondue — ресторан в Астане · Меню",
  description:
    "Электронное меню ресторана Fondue (Астана): стейки на углях, восточная кухня, паста, пицца, чаи и напитки. Цены в тенге.",
  openGraph: {
    title: "Fondue — ресторан в Астане",
    description: "Электронное меню: стейки, восточная кухня, паста, пицца и напитки.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#160508",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${cormorant.variable} ${manrope.variable} antialiased`}
    >
      <body>
        <LangProvider>
          <CartProvider>
            <TopBar />
            {children}
          </CartProvider>
        </LangProvider>
      </body>
    </html>
  );
}
