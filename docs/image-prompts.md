# Image generation prompts — Fondue menu

Brand palette to keep every image consistent with the site:
- Background: deep oxblood / near-black `#160508`, wine `#3a0e13`
- Accent: champagne gold `#c9a36a`, cream `#f5ead9`
- Mood: candlelit, warm, moody, low-key restaurant lighting, shallow depth of field

---

## 1. `public/img/karak.jpg` — replace the placeholder (HIGH PRIORITY)

The current `karak.jpg` is a ~7.7 KB placeholder and looks blurry in the
"Chef's Picks" card (shown at a **4:5 portrait** crop, alongside steak / caesar /
ramen / pizza / burger photos that are 90–275 KB). Needs a real, crisp shot.

**Prompt:**

> Professional food photography of karak chai (spiced cardamom milk tea) served
> in a small clear glass cutting-chai cup with a delicate golden crema on top,
> a wisp of steam rising. Set on a dark moody table against a deep oxblood,
> almost-black background. Warm candlelight from the side, champagne-gold
> highlights on the glass rim. A few whole cardamom pods and a cinnamon stick
> scattered nearby, slightly out of focus. Shallow depth of field, elegant
> restaurant atmosphere, cinematic warm color grade. Portrait orientation 4:5,
> high detail, photorealistic.

- Negative / avoid: bright daylight, white studio background, text, watermark,
  cartoon look, oversaturation.
- Export: ~1000×1250 px, JPEG quality ~80 (aim for 80–180 KB to match siblings).

---

## 2. Open Graph share image — `public/og.jpg` (MISSING)

`src/app/layout.tsx` defines `openGraph` metadata but has **no `images`**, so
links shared in WhatsApp / Telegram / social show no preview card. Standard OG
size is **1200×630**.

**Prompt:**

> A cinematic, dark and moody restaurant hero image: char-grilled steak and
> warm Eastern dishes on a rustic dark table, glowing candlelight, deep oxblood
> and near-black background with champagne-gold rim light. Generous empty darker
> space on the left third for a logo/title overlay. Elegant fine-dining
> atmosphere, shallow depth of field, photorealistic. Landscape 1200×630.

- After generating, the wordmark **"Fondue"** (gilded serif italic, gold
  `#c9a36a` → cream gradient) can be overlaid on the dark left third, with the
  kicker "Астана · Ресторан" beneath it.
- Then wire it up in `layout.tsx`:
  ```ts
  openGraph: {
    // ...existing fields
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
  ```
- Export: 1200×630 px, JPEG quality ~80.
