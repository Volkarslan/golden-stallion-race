# 🏇 Golden Stallion Race

A deterministic, simulation‑focused horse racing game built as a front‑end case study using Vue 3, Vuex and Tailwind CSS.

> *Six rounds. Dynamic physics. Fixed-seed randomness. Zero backend. Just pure racing logic.*

---

## ✨ Overview

Golden Stallion Race is a browser-based racing simulation that models a full race day consisting of **6 rounds**, each with a unique distance and dynamically selected horses. The project prioritizes clean architecture, deterministic logic and scalable UI patterns — much like a real-world product-grade frontend application.

This is not just a visual race — it is a carefully orchestrated simulation where each horse’s fate is influenced by:

* Condition value
* Distance
* Surprise factor
* Seed-based deterministic randomness

---

## 🎯 Key Features

* ✅ 6-round race day simulation
* ✅ Deterministic results with fixed seed per session
* ✅ Dynamic horse selection per round
* ✅ Animated race track with live leader glow
* ✅ Expandable round results
* ✅ Responsive layout (desktop & mobile)
* ✅ Vuex-based state management
* ✅ Tailwind-powered design system
* ✅ Lightweight Jest test suite for core logic

---

## 🧠 Simulation Highlights

* Each round selects **10 horses out of 20** based on seeded randomness
* Race results are deterministic for a given seed
* Horses can overtake each other mid-race
* Visual finish continues to 100% for realism, while ranking is calculated at 91%
* Leader horse receives a glowing animation effect

---

## 🛠️ Tech Stack

| Layer      | Technology                  |
| ---------- | --------------------------- |
| Framework  | Vue 3                       |
| State      | Vuex                        |
| Styling    | Tailwind CSS                |
| Animation  | CSS + requestAnimationFrame |
| Testing    | Jest                        |
| Build Tool | Vite                        |

---

## 📁 Project Structure

```
src/
├── assets/
│   └── images/
├── components/
│   ├── game/
│   └── layout/
├── core/
│   ├── race.js
│   └── raceEngine.js
├── display/
│   └── GameView.vue
├── locales/
│   └── en.json
├── store/
│   └── index.js
├── styles/
│   ├── index.css
│   └── track.css
├── utils/
│   └── text.js
└── main.js
```

---

## 🖥️ Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

---

## ✅ Running Tests

Core logic is covered by Jest tests located under `src/__tests__`.

```bash
npm test
```

Watch mode:

```bash
npm run test:watch
```

Test coverage includes:

* `raceEngine` deterministic logic
* Vuex store flow validation

---

## 🎮 Gameplay Flow

1. Click **Generate Program**
2. Review horses for the current round
3. Click **Start Round** to initiate simulation
4. Repeat for all 6 rounds
5. Review full race day results

---

## 🧩 Design Philosophy

This project follows:

* Component-first architecture
* Core logic isolation under `/core`
* JSDoc documentation for future extensibility
* Tailwind utility + component layer separation
* Predictable state transitions

Inspired by real-world front-end practices and clean code principles.

---

## 🚀 Deployment

This project is ready to be deployed on platforms like:

* Netlify
* Vercel
* GitHub Pages

Just ensure the following build command:

```bash
npm run build
```

And deploy the `dist/` folder.

---

## 🧪 Future Improvements

* 🎥 Replay mode per round
* 📊 Advanced leaderboard stats
* 🧠 Difficulty scaling
* 🌍 Multi-language support
* 👤 AI spectators reactions

---

## 🙌 Created As

Front-End Case Study Project

Designed and developed with a focus on clean architecture, simulation logic and UX clarity.

---

## 📜 License

This project is open for educational and showcase purposes.

Feel free to fork, adapt or extend.

---

## 🧪 Future Improvements (Geliştirilebilir Alanlar)

This project was intentionally scoped as a focused case study, but it has plenty of room to grow into a richer racing experience.

### 🔊 Audio & Atmosphere
- **Sound effects** for start bell, gallop, crowd reactions and photo-finish moments  
- Optional **sound packs** (arcade, realistic, retro)  
- Global **mute / volume** controls

### 🌗 Visual Modes & Theming
- **Day / Night mode** with different track lighting and ambience  
- Additional **track skins** (wet turf, dirt, championship day, festival theme)  
- Subtle **weather cues** (light rain, fog, sunny glare) that only affect visuals, not logic

### 🐎 Horse Variations & Favorites
- **Distinct horse appearances** (colors, patterns, icon variants) linked to each horse  
- Cosmetic **rarity tiers** (common / rare / legendary) for visual flair  
- **Favorite horse selection**:
  - Mark horses as favorites
  - Quick filtering / highlighting on the list and track
  - Simple per-favorite stats (wins, podiums, average time)

### 📺 Screens, Story Mode & UX Depth
- Additional **screens** beyond the core race view:
  - Race day summary dashboard
  - Horse detail panel with history and stats
  - “Hall of Fame” for memorable runs
- **Story mode**:
  - A light narrative layer where the user follows a season, trainer career or a stable
  - Progressive difficulty and scripted “event days”
- Story-aware enhancements:
  - **Visual improvements** (special overlays, story-specific track themes, NPC cards)
  - **Textual improvements** (commentary-style messages, narrative tooltips, pre/post-race summaries)

### 🌍 Localization & Languages
- Extend the existing `locales/en.json` structure to support:
  - **Multiple languages** (e.g. English, Turkish, etc.)
  - Locale-aware number and date formatting
- A small **language switcher** in the header

### 📊 Rankings, Stats & Leaderboards
- **Round-level ranking tables** with sortable columns (time, position, condition)  
- **Race day summary table** for all 6 rounds  
- Aggregated stats:
  - Best times per distance
  - Most consistent horses
  - Win / podium percentages

### 🧪 Engineering & Architecture Enhancements
- More **unit tests** for:
  - Speed curves and animation timing
  - Edge cases in the race engine
- Optional **component tests** (e.g. RaceTrack, RaceResult) with Vue Test Utils  
- Extract race animation logic into a dedicated composable (e.g. `useRaceAnimation`)  
- **PWA support** (installable app, offline-friendly basics)

--- 
🏁 *Let the stallions run wild.*
