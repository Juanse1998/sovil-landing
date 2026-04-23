# SOVIL Landing — CLAUDE.md

## Stack

- **Framework**: React 19 + Vite 8
- **Lenguaje**: JSX (sin TypeScript)
- **Estilos**: Inline styles únicamente — no hay CSS modules, Tailwind ni clases externas
- **Fuentes**: Inter (sans), Archivo Black (display), JetBrains Mono (mono) — cargadas via Google Fonts en `index.html`
- **Dev server**: `npm run dev` → `http://localhost:5173`
- **Build**: `npm run build`

## Estructura

```
src/
  V1Editorial.jsx      # Componente raíz — ensambla todas las secciones
  styles.js            # Design tokens (S.ink, S.accent, S.display, etc.)
  hooks.jsx            # Hooks y componentes utilitarios compartidos
  content.js           # Todo el copy en ES y EN (SOVIL_CONTENT[lang])
  components/
    Nav.jsx            # Navbar sticky con toggle de idioma
    Hero.jsx           # Sección principal con gradiente, grilla y HeroNetwork
    HeroNetwork.jsx    # Red de nodos animada (solo desktop)
    LiveBadge.jsx      # Badge "en vivo" en el hero
    Marquee.jsx        # Banda de texto corrido
    Story.jsx          # Scroll storytelling sticky (5 frames)
    Manifesto.jsx      # "Un socio, no un proveedor" + 3 pilares
    Services.jsx       # Lista de servicios con hover expand
    Process.jsx        # Acordeón de 4 pasos con entregables
    Cases.jsx          # Grilla de casos + stats strip
    CaseCard.jsx       # Tarjeta individual de caso
    CaseModal.jsx      # Modal completo de caso (galería, métricas, testimonial)
    Contact.jsx        # Formulario de contacto
    Footer.jsx         # Pie de página
    ScrollProgress.jsx # Barra de progreso de scroll superior
    SectorGraphic.jsx  # Gráfico SVG decorativo por sector
    SovilLogoImg.jsx   # Logo img desde public/sovilLogo.png
    SovilMark.jsx      # Marca SVG inline
    Typewriter.jsx     # Efecto typewriter
public/
  sovilLogo.png        # Logo principal (también usado como favicon)
  favicon.svg
  icons.svg
```

## Convenciones clave

### Design tokens
Todos los estilos usan el objeto `S` importado desde `../styles`:
```js
import S from '../styles';
// S.bg, S.ink, S.inkSoft, S.accent, S.forest, S.display, S.sans, S.mono, etc.
```
Nunca usar colores o fuentes hardcodeados — siempre a través de `S`.

### Responsivo
Se usa el hook `useMobile()` de `hooks.jsx` para bifurcar estilos inline:
```jsx
import { useMobile } from '../hooks';
const isMobile = useMobile(); // breakpoint: 768px
// Uso: padding: isMobile ? '80px 20px' : '140px 48px'
```
No hay media queries — todo se maneja con `isMobile` inline.

### Animaciones de scroll
`Reveal` es un componente de `hooks.jsx` que usa `IntersectionObserver` para fade+slide al entrar en viewport:
```jsx
import { Reveal } from '../hooks';
<Reveal delay={150}>...</Reveal>
```

### Contadores animados
`CountUp` en `hooks.jsx` para números que cuentan al entrar en viewport:
```jsx
import { CountUp } from '../hooks';
<CountUp to={12} suffix="+" />
```

### Contenido bilingüe
Todo el copy vive en `src/content.js`. El idioma activo se gestiona con `useSovilState`:
```js
const { lang, t, toggleLang } = useSovilState('sovil.v1');
// t.hero.headline, t.services.items, t.cases.items, etc.
```
El idioma se persiste en `localStorage`.

## Paleta de colores

| Token         | Valor     | Uso                          |
|---------------|-----------|------------------------------|
| `S.bg`        | `#ffffff` | Fondo principal              |
| `S.bgSoft`    | `#f4f4f4` | Fondo secundario             |
| `S.bgInk`     | `#0A0A0A` | Fondo oscuro (secciones dark)|
| `S.ink`       | `#0A0A0A` | Texto principal              |
| `S.inkSoft`   | `#686868` | Texto secundario             |
| `S.inkOnDark` | `#ffffff` | Texto sobre fondos oscuros   |
| `S.accent`    | `#A3E635` | Verde lima — color de acento |
| `S.forest`    | `#14532D` | Verde oscuro — secciones alt |
| `S.line`      | `#e5e5e5` | Bordes sobre fondo claro     |
| `S.lineOnDark`| `#1f1f1f` | Bordes sobre fondo oscuro    |

## Secciones y sus IDs

| Componente  | ID anchor  | Fondo        |
|-------------|------------|--------------|
| Hero        | —          | `S.bg`       |
| Marquee     | —          | `S.bg`       |
| Story       | `#story`   | Cambia x paso|
| Manifesto   | —          | `S.bgSoft`   |
| Services    | `#s1`      | `S.bg`       |
| Process     | `#s2`      | `S.bgInk`    |
| Cases       | `#s3`      | `S.bgSoft`   |
| Contact     | `#contact` | `S.bg`       |

## Comandos

```bash
npm run dev      # Inicia dev server en localhost:5173
npm run build    # Build de producción en /dist
npm run preview  # Preview del build
```
