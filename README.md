# Fondue — электронное QR-меню (Фаза 1, прототип)

Мобильный сайт-меню для ресторана **Fondue** (Астана). Открывается по QR со столов и из
шапки Instagram. Это прототип **Фазы 1** из общего плана (`../PLAN.md`).

🌐 **Лайв:** https://fondue-menu.vercel.app
📱 **QR-код:** `../fondue-qr.png` (фирменный) и `../fondue-qr-bw.png` (ч/б, для печати)

## Что внутри
- **Hero** с фирменным стилем (бордовый + золото из лого), анимация появления.
- **Липкая навигация по категориям** со scroll-spy (активная категория подсвечивается).
- **Меню** по разделам в редакторском стиле (точечные лидеры, цены в ₸).
- **Переключатель языков RU / KZ**.
- **Блок «Как нас найти»**: адрес, часы, телефон + кнопки «Маршрут в 2ГИС», WhatsApp,
  Instagram, «Оплата Kaspi».
- Адаптив (mobile-first), `prefers-reduced-motion`, тёмная свечная атмосфера.

## Стек
Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · shadcn-токены · lucide-react ·
шрифты Cormorant Garamond + Manrope. Анимации — паттерны из transitions.dev.

## Запуск
```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build && pnpm start
```

## ⚠️ Заглушки — заполнить перед запуском
В `src/lib/menu.ts` → `CONTACT` и `I18N.*.addressValue / hoursValue`:
- точный адрес и часы работы;
- телефон / WhatsApp (`phoneHref`, `whatsapp`);
- ссылка на 2ГИС-карточку заведения;
- ссылка/QR оплаты Kaspi.

Меню (категории, блюда, цены, теги «хит/остро/от шефа») — в том же `src/lib/menu.ts`.

## Деплой
Готов к деплою на **Vercel** (push в репозиторий → import → deploy). Домен: `fondue.kz`
или `fondueastana.kz` (проверить доступность).
