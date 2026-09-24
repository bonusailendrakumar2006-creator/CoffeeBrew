# ☕ CoffeeBrew — Artisanal Coffee Digital Experience

[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-R3F-black?style=flat-square&logo=three.js&logoColor=white)](https://threejs.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white)](https://github.com/bonusailendrakumar2006-creator/CoffeeBrew/actions)

> **A luxury, sensory-first web experience crafted for artisanal coffee culture.**  
> CoffeeBrew bridges digital artistry and specialty coffee craft, blending interactive 3D WebGL scenes, acoustic micro-interactions, fluid storytelling, and modern headless e-commerce.

---

## 📖 Table of Contents

- [The Vision](#-the-vision)
- [✨ Key Features](#-key-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📂 Project Architecture](#-project-architecture)
- [🚀 Quick Start Guide](#-quick-start-guide)
- [🧪 Testing & Quality Assurance](#-testing--quality-assurance)
- [🎨 Design Philosophy](#-design-philosophy)
- [🤝 Contributing & License](#-contributing--license)

---

## 🌟 The Vision

Most coffee websites feel like standard e-commerce catalogs. **CoffeeBrew was designed to feel like walking into a dimly lit, high-end roastery at 7:00 AM.**

From the sound of the pour to the tactile warmth of a ceramic cup, every pixel and animation is tuned to evoke the calm ritual of specialty brewing. Behind the aesthetic warmth lies an enterprise-grade technical foundation built with React 19, Three.js, and Zustand.

---

## ✨ Key Features

### 🏺 1. The Interactive 3D "Perfect Pour"
- **WebGL Ceramic Cup**: Real-time 3D rendered cup and saucer crafted with `@react-three/fiber` and custom procedural textures.
- **CoffeeBrew Branding**: High-fidelity embossed brand typography directly integrated onto the ceramic surface.
- **Atmospheric Particles**: Real-time volumetric steam rising dynamically above the brew.
- **Orbital Interaction**: Intuitive 360° mouse-drag and touch controls with damped physics and mobile optimization.

### 🎧 2. Sensory Audio & Haptic Feedback
- **Tactile Click Synthesis**: Integrated Web Audio API producing subtle, organic acoustic clicks on button interactions without external sound assets.
- **Haptic Feedback**: Native vibration API integration for mobile devices to simulate tactile mechanical switches.

### 🛒 3. Headless E-Commerce Cart Drawer
- **Global State with Zustand**: Instant, reactive cart management with local storage persistence.
- **Animated Slide-Over Drawer**: Smooth spring physics powered by Framer Motion.
- **Live Calculations**: Subtotal, estimated shipping, and dynamic counter badges across the navigation bar.

### 🌊 4. Butter-Smooth Narrative Scrolling
- **Lenis Smooth Scroll**: Inertial, synchronized scrolling that feels natural on both desktop and mobile.
- **Smart Hover Gating**: Custom velocity-based pointer detection that prevents accidental hover flashes while scrolling quickly.
- **Scroll-Triggered Reveals**: Multi-stage parallax storytelling guiding visitors through *The Story*, *The Craft*, *Our Blends*, and *The Ritual*.

### 🗺️ 5. Interactive Roastery Map
- **Leaflet & OpenStreetMap**: Custom-styled dark-mode interactive map locating CoffeeBrew roasteries, tasting rooms, and partner cafes.
- **Custom Coffee Pinpoints**: Styled markers with popup information and directions.

---

## 🛠️ Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend Core** | [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/) |
| **3D & Graphics** | [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei) |
| **Motion & Physics** | [Framer Motion](https://www.framer.com/motion/), [GSAP](https://greensock.com/), [Lenis](https://lenis.darkroom.engineering/) |
| **State Management** | [Zustand](https://zustand-demo.pmnd.rs/) (Cart & Global UI state) |
| **Styling & UI** | [Tailwind CSS v4](https://tailwindcss.com/), [Lucide React](https://lucide.dev/) icons |
| **Mapping** | [Leaflet](https://leafletjs.com/), [React-Leaflet](https://react-leaflet.js.org/) |
| **Testing & CI** | [Playwright](https://playwright.dev/) (E2E), [Oxlint](https://oxc.rs/) (Next-gen Linter), GitHub Actions |

---

## 📂 Project Architecture

```plaintext
coffebrew/
├── .github/workflows/      # Automated CI/CD pipelines (Lint, Build, E2E tests)
├── e2e/                    # Playwright end-to-end automated tests
│   └── cart.spec.ts        # Cart drawer and interaction test suite
├── public/                 # Static assets, favicon, and 3D textures
├── src/
│   ├── components/
│   │   ├── 3d/             # Three.js / WebGL canvas components
│   │   │   ├── CoffeeCupScene.tsx  # 3D Cup, steam & brand text scene
│   │   │   └── HeroScene.tsx       # Floating beans & hero backdrop
│   │   ├── layout/         # Shell components (Navbar, Footer, SmoothScroller)
│   │   ├── sections/       # Narrative landing page sections
│   │   │   ├── Hero.tsx            # Introduction with video/3D banner
│   │   │   ├── Story.tsx           # Heritage and philosophy
│   │   │   ├── TheCraft.tsx        # Sourcing & roasting steps
│   │   │   ├── OurBlends.tsx       # Curated blends with Add-to-Cart
│   │   │   ├── FeaturedDrink.tsx   # Seasonal highlight spotlight
│   │   │   ├── Experience3D.tsx    # Dedicated 3D showcase viewport
│   │   │   ├── TheRitual.tsx       # Interactive brewing guide
│   │   │   ├── CafeExperience.tsx  # Atmosphere & interior gallery
│   │   │   ├── Testimonials.tsx    # Community reviews
│   │   │   └── Location.tsx        # Interactive cafe map
│   │   └── ui/             # Reusable UI primitives (Button, CartDrawer, Cursor)
│   ├── hooks/              # Custom hooks (Audio, Haptics, Scroll velocity)
│   ├── store/              # Zustand global store (Cart & Drawer state)
│   ├── styles/             # Global CSS and custom theme utilities
│   ├── App.tsx             # Root layout orchestrator
│   └── main.tsx            # Application entry point
├── package.json            # Project manifest & dependencies
└── vite.config.ts          # Vite build & plugin configuration
```

---

## 🚀 Quick Start Guide

Follow these steps to run CoffeeBrew locally on your machine:

### 1. Prerequisites
Ensure you have **Node.js 18+** installed:
```bash
node -v
npm -v
```

### 2. Clone the Repository
```bash
git clone https://github.com/bonusailendrakumar2006-creator/CoffeeBrew.git
cd CoffeeBrew
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173` to explore the experience.

### 5. Create a Production Build
To create an optimized production bundle:
```bash
npm run build
npm run preview
```

---

## 🧪 Testing & Quality Assurance

CoffeeBrew includes a dedicated quality and testing suite to ensure rock-solid stability:

- **Type Safety**: Full TypeScript strict checking.
- **Fast Linting**: Powered by [Oxlint](https://oxc.rs/) for near-instant lint feedback:
  ```bash
  npm run lint
  ```
- **End-to-End Testing**: Automated browser testing with [Playwright](https://playwright.dev/):
  ```bash
  npx playwright test
  ```
- **Continuous Integration**: Every push and pull request is automatically validated using GitHub Actions (`.github/workflows/main.yml`).

---

## 🎨 Design Philosophy

- **Warm Crema & Obsidian**: The palette draws inspiration from dark roasted beans, natural parchment, warm crema, and brushed brass.
- **Typography with Gravitas**: Classic serif titles paired with clean, ultra-readable modern sans-serif body copy.
- **Performance Without Compromise**: Dynamic render loops sleep when offscreen; geometry and shaders are optimized to maintain 60 FPS across both desktop and mobile devices.

---

## 🤝 Contributing & License

Contributions, feedback, and suggestions are always welcome! Feel free to open an issue or submit a pull request.

Crafted with care and precision by **Sailendra Kumar** & the CoffeeBrew team. ☕
