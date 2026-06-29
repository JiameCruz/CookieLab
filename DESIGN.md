---
name: The cookie lab
description: Coffee shop digital brand — cookies, sandwiches, matcha. Counter-warm, script-forward, product-first.
colors:
  primary: "#3D2E28"
  primary-deep: "#2A1F1B"
  matcha: "#3A7A5E"
  matcha-soft: "#E8F2EC"
  brand-pink: "#E8A4B8"
  brand-pink-soft: "#F9EDF2"
  ink: "#1A2420"
  muted: "#5F6B66"
  surface: "#F5F8F6"
  line: "#DDE5E1"
  bg: "#FFFFFF"
  on-primary: "#FFFFFF"
  on-matcha: "#FFFFFF"
  danger: "#9E2B2B"
typography:
  script:
    fontFamily: "\"Bonheur Royale\", \"Segoe Script\", cursive"
    fontSize: "clamp(2.75rem, 9vw, 5.5rem)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "0.01em"
  display:
    fontFamily: "\"Fredoka\", system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5.5vw, 4.25rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "\"Fredoka\", system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "0"
  title:
    fontFamily: "\"Nunito Sans\", system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "0"
  body:
    fontFamily: "\"Nunito Sans\", system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0"
  label:
    fontFamily: "\"Nunito Sans\", system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.02em"
  price:
    fontFamily: "\"Nunito Sans\", system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0"
rounded:
  sm: "6px"
  md: "12px"
  lg: "20px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  xxl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
  button-primary-hover:
    backgroundColor: "{colors.primary-deep}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
  button-matcha:
    backgroundColor: "{colors.matcha}"
    textColor: "{colors.on-matcha}"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "12px 20px"
  menu-row:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "16px 0"
  chip-category:
    backgroundColor: "{colors.matcha-soft}"
    textColor: "{colors.matcha}"
    rounded: "{rounded.pill}"
    padding: "8px 14px"
---

# Design System: The cookie lab

## 1. Overview

**Creative North Star: "The Cookie Counter"**

The cookie lab se siente como el mostrador de un café-boutique donde la gente se inclina para ver qué hay hoy: cálido, directo, un poco juguetón — pero nunca franquicia. La referencia [The Cookie Lab MX](https://www.instagram.com/thecookielabmxx) aporta producto real y tono artesanal-contemporáneo; la interfaz traduce eso con tipografía script en momentos de marca (como el logotipo pintado a mano), sans redondeada para escanear el menú, y toques de rosa de marca sobre chocolate profundo.

El visitante llega en móvil, a menudo de pie frente al mostrador. La pantalla prioriza nombres legibles, precios visibles y categorías claras (Galletas · Sandwiches · Matcha · Café). El panel admin comparte tokens pero reduce ornamentación: utilidad sin romper la voz.

**Key Characteristics:**

- **Mostrador, no vitrina clínica** — calidez en tipografía, scrim rosa suave y producto fotografiado; no minimalismo frío.
- **Script + redondeada** — Bonheur Royale para lockups de marca; Fredoka + Nunito Sans para UI y menú.
- **Chocolate + matcha + rosa** — cacao como ancla; matcha como categoría; rosa solo en momentos de identidad (hero, logo, promos puntuales).
- **Menú en filas editoriales** — lista escaneable con hairline; no grid de cards idénticas.
- **Plano por defecto** — profundidad tonal; sombras solo en hover de botón o thumbnail.

## 2. Colors: The Counter Palette

Paleta **Committed-Restrained**: blanco limpio + chocolate primario + matcha funcional + rosa de marca como tercera voz — nunca fast-food ni beige AI-default.

### Primary

- **Cookie Chocolate** (#3D2E28 / oklch(0.38 0.06 55)): CTAs principales, texto script en variante café, sombras tipográficas sobre rosa.
- **Cookie Chocolate Deep** (#2A1F1B / oklch(0.28 0.05 55)): hover de botones primarios, títulos de menú, `text-shadow` sobre headlines rosa.

### Secondary

- **Matcha Field** (#3A7A5E / oklch(0.52 0.12 155)): categoría matcha, links activos, chips de filtro, focus rings.
- **Matcha Mist** (#E8F2EC / oklch(0.95 0.025 155)): fondos de chip activo — sin sustituir fotografía de producto.

### Tertiary

- **Frosting Pink** (#E8A4B8 / oklch(0.82 0.08 350)): headlines script en hero, acentos de marca, scrim del hero — nunca relleno de UI completa.
- **Frosting Wash** (#F9EDF2 / oklch(0.95 0.03 350)): halo suave en logo (About), bandas de scrim — compañera del rosa, no sustituto de blanco.

### Neutral

- **Counter White** (#FFFFFF / oklch(1 0 0)): fondo principal. Calidez viene del producto y del script, no de un body bg crema.
- **Counter Surface** (#F5F8F6 / oklch(0.97 0.004 155)): hover de filas de menú, sección menú, paneles admin.
- **Ink** (#1A2420 / oklch(0.22 0.012 160)): cuerpo, descripciones, navegación activa.
- **Muted Label** (#5F6B66 / oklch(0.48 0.014 160)): metadata y subheadlines; ≥4.5:1 sobre blanco.
- **Hairline** (#DDE5E1 / oklch(0.90 0.008 155)): divisores 1px entre filas de menú y borde de nav.

### Named Rules

**The Product Carries Warmth Rule.** Nunca compenses la falta de fotografía con fondos sand/linen/parchment. Si no hay imagen, usa Counter Surface + tipografía — no simules calidez con color de fondo.

**The Frosting Cap Rule.** Frosting Pink ocupa ≤12% del viewport en cualquier pantalla. Es voz de marca, no relleno decorativo. El hero scrim puede usar Frosting Wash; el texto script encima lleva sombra chocolate.

**The Matcha Accent Cap Rule.** Matcha Field ocupa ≤15% del viewport en páginas de menú. Su rareza mantiene la señal de categoría.

## 3. Typography

**Script Font:** Bonheur Royale (with Segoe Script fallback) — Spencerian, referencia logotipo pintado / Coca-Cola artesanal  
**Display Font:** Fredoka (with system-ui fallback) — redondeada, amigable, legible en secciones  
**Body Font:** Nunito Sans (with system-ui fallback) — menú, precios, admin

**Character:** Dos registros deliberados: script fluida para seducción de marca (una línea por fold); sans redondeada para escaneo rápido bajo presión en mostrador. Nunca script en precios ni en formularios admin.

### Hierarchy

- **Script** (400, clamp 2.75–5.5rem, lh 1.05): hero headline de marca — una frase corta. Variantes de color:
  - **Coffee Script:** `color: Cookie Chocolate Deep` — sobre Frosting Wash / blanco.
  - **Pink Script:** `color: Frosting Pink` + `text-shadow: 0 1px 0 Cookie Chocolate Deep, 0 3px 12px oklch(0.28 0.05 55 / 0.35)` — efecto pintado sobre scrim.
- **Display** (600, clamp 2.25–4.25rem, lh 1.08): titulares secundarios cuando script no aplica. Fredoka, `text-wrap: balance`.
- **Headline** (600, clamp 1.75–2.75rem, lh 1.15): títulos de sección (Menú, Promociones, Nosotros).
- **Title** (600, 1.25rem, lh 1.25): nombre de producto en fila de menú — Nunito Sans, no script.
- **Body** (400, 1rem, lh 1.55, max 65ch): descripciones breves. `text-wrap: pretty`.
- **Price** (600, 1.125rem): alineado a la derecha en filas; nunca más pequeño que body.
- **Label** (600, 0.8125rem, ls 0.02em): categorías y filtros; sentence case preferido.

### Named Rules

**The Script Sparingly Rule.** Bonheur Royale solo en hero, lockup de marca y promos editoriales (máx. una línea). Prohibido en precios, nav, labels de admin y listados largos.

**The Menu Scan Rule.** En filas de menú, Title + Price deben leerse en un solo vistazo (<2 s). Script y display nunca compiten en la misma fila.

## 4. Elevation

Sistema **plano por defecto**. La profundidad se comunica con contraste tonal (bg → surface), hairlines y fotografía a tamaño real — no con cards flotantes en reposo.

### Shadow Vocabulary

- **Lift Hover** (`0 8px 24px oklch(0.22 0.012 160 / 0.08)`): solo en hover de botón primario o thumbnail de menú — nunca en la fila completa.
- **Logo Halo** (`0 0 0 4px Frosting Wash, 0 12px 32px oklch(0.28 0.05 55 / 0.12)`): marco circular del logo en About — excepción de marca, no patrón de card.
- **Sticky Nav Hairline** (`0 1px 0 Hairline`): borde inferior de nav — preferir hairline a sombra difusa.

### Named Rules

**The Flat Menu Rule.** Las filas de menú no llevan `box-shadow` en reposo ni wrapper tipo card. Separación = padding + Hairline. Hover = Counter Surface, no lift.

## 5. Components

Filosofía: **táctil pero contenido** — pills en CTAs, filas de menú tipo lista editorial, script solo donde la marca respira.

### Buttons

- **Shape:** Píldora completa (999px radius).
- **Primary:** Cookie Chocolate sobre blanco; padding 14×28px; Fredoka/Nunito 600.
- **Matcha:** Matcha Field para acciones de categoría matcha.
- **Ghost:** Ink transparente; hover Counter Surface.
- **Hover / Focus:** Primary → Cookie Chocolate Deep + Lift Hover; focus-visible ring 2px Matcha Field offset 2px.

### Chips (categorías de menú)

- **Style:** Matcha Mist + Matcha Field cuando activo; Counter Surface + Ink cuando inactivo.
- **State:** filtro exclusivo por categoría en v1.

### Menu Rows (componente signature)

- **Layout:** fila horizontal — thumbnail 72×72px (radius md), Title + descripción corta (max 1 línea), Price alineado derecha.
- **Background:** Counter White; hover Counter Surface.
- **Border:** Hairline 1px bottom entre filas; **sin** card wrapper, **sin** sombra en reposo.
- **Thumbnail hover:** Lift Hover opcional solo en la imagen, no en la fila.
- **Padding:** 16px vertical.

### Cards / Containers

- **Prohibido** para el menú principal. Reservado como máximo 1–2 **destacados editoriales** en promociones — nunca grid homogéneo de cards idénticas.
- Si se usa destacado: radius lg en imagen, borde Hairline, sin sombra en reposo.

### Hero

- **Media:** fotografía full-bleed con scrim Frosting Wash → transparente (gradiente 105deg, no glassmorphism).
- **Headline:** Script en variante Pink Script o Coffee Script según contraste sobre scrim.
- **Subheadline + CTA:** Nunito Sans + botón Primary pill.

### Inputs / Fields (admin)

- **Style:** borde Hairline 1px, bg Counter White, radius sm (6px).
- **Focus:** borde Matcha Field 2px; sin glow difuso.
- **Error:** borde danger + mensaje Ink; nunca solo color.

### Navigation

- **Style:** sticky top, Counter White, nav hairline bottom.
- **Brand:** Fredoka 600, Cookie Chocolate Deep — no script en nav (legibilidad).
- **Links:** Nunito Sans 600, 0.9375rem; activo = Ink + subrayado 2px Matcha Field.

## 6. Do's and Don'ts

### Do:

- **Do** usar fotografía de producto real en hero y thumbnails de menú.
- **Do** reservar Bonheur Royale para una línea de marca por fold — con sombra chocolate si el relleno es Frosting Pink.
- **Do** listar el menú en **filas editoriales** con precio visible (`$46.00`).
- **Do** mantener Frosting Pink para identidad (hero scrim, logo halo, promos puntuales).
- **Do** respetar `prefers-reduced-motion`: crossfade 150ms o instantáneo.
- **Do** alinear el panel admin a los mismos tokens (Ink, Matcha, Cookie Chocolate).

### Don't:

- **Don't** usar fondos cream/beige/parchment/sand — calidez en producto y script, no en `--bg`.
- **Don't** imitar **fast food / cadena masiva**: rojo/amarillo promo, combos agresivos, tipografía condensada QSR.
- **Don't** caer en **SaaS genérico**: hero con métricas, grids de cards idénticas, gradientes decorativos.
- **Don't** usar script en precios, formularios admin o nav — legibilidad bajo presión primero.
- **Don't** usar **border-left** de acento en filas de menú o alertas.
- **Don't** poner **gradient text** ni glassmorphism decorativo.
- **Don't** repetir eyebrow uppercase tracked sobre cada sección ("GALLETAS · MATCHA · ABOUT").
- **Don't** convertir el menú en un grid de cards con sombra en reposo — eso contradice The Flat Menu Rule.
- **Don't** sustituir fotografía con bloques de color plano en secciones de producto.
