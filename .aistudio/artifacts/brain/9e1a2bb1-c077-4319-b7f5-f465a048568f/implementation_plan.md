# Multi-Language Support (UZ / RU / EN) & Difficulty Block Removal

Comprehensive architectural plan to introduce full trilingual localization (Uzbek, Russian, English) with instant reactive switching, and eliminate the legacy difficulty selection block in favor of natural progressive scenario progression.

## User Review & Critical Decisions

> [!IMPORTANT]
> All three key architectural decisions were confirmed in Phase 1 interactive clarification:
> - **Language Switcher Presentation**: Compact header dropdown menu displaying language names (O'zbekcha / Русский / English) with quick flag accents.
> - **Default Starting Language**: Uzbek (`uz`) as default, saving player selection in `localStorage` for instant reloads.
> - **Scenario Progression After Difficulty Removal**: Unified scenario pool with progressive day-based variety (introducing marketplace gross revenue, rentals, and multi-tax corporate filings as days advance).

- **Confirmed Decision 1**: Clean, lightweight Vanilla React/TypeScript translation architecture without heavy external libraries (`i18next` bundles avoided in favor of a type-safe `LanguageContext` and dictionary).
- **Confirmed Decision 2**: Zero progress reset on language toggle — balance, current day, business mode, streak, and history remain intact.
- **Confirmed Decision 3**: Complete removal of "QIYINLIK DARAJASI" UI block from `HomeScreen.tsx`, lifting "Daromad manbalari" and daily mission cards into an elevated, unified layout.

---

## 1. Overview & Core Concept

- **What It Does**: 
  - Allows players to experience the entire "Soliq Sim" educational tax simulator in Uzbek, Russian, or English.
  - Dynamically localizes all screens (Welcome, Home, Header, BottomNav, Calculation/Quiz, MChJ Monthly Reporting, Results, Statistics, Education, and AI Advisor).
  - Eliminates artificial difficulty buttons ("Oson", "O'rta", "Qiyin") and instead adapts tax cases naturally as the player advances through their business calendar.
- **Target Audience**: Students, young entrepreneurs, freelancers, and accounting learners in Uzbekistan and CIS regions who prefer studying in Uzbek, Russian, or English.
- **Key Value**: Accessible legal literacy in 3 languages, uncluttered mobile-first interface, and smooth educational onboarding.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Language Switching Flow**:
   - Player taps the compact language button in the top header (`Globe` icon + `UZ` / `RU` / `EN`).
   - An accessible dropdown opens showing:
     - 🇺🇿 **O'zbekcha** (default)
     - 🇷🇺 **Русский**
     - 🇬🇧 **English**
   - Tapping any option immediately re-renders all UI strings, scenario titles, and explanations across the app without reloading the page or losing current game state.
   - The selection is stored in `localStorage` under `soliq_sim_language`.

2. **Cleaned Home Screen Flow**:
   - The former 3-button "QIYINLIK DARAJASI" card is removed.
   - The "DAROMAD MANBALARI" (Income Sources) section and "KUN REJASI" (Day Plan) action card sit directly beneath the Financial & Literacy Dashboard with proper padding (`gap-3` to `gap-4`).
   - The overall screen height is tighter and optimized for mobile viewports without dead vertical space.

### Visual Identity & Theme
- **Theme & Colors**: Deep navy slate background (`#020617` / `#0F172A`), warm amber gold accents (`#F59E0B`), emerald success green (`#10B981`), and royal corporate blue (`#3B82F6`).
- **Dropdown Styling**: Dark glassmorphic floating menu (`bg-slate-900/95 border border-slate-700/80 shadow-2xl rounded-2xl`) with smooth highlight states and active indicator dot.
- **Typography**: `Plus Jakarta Sans` for titles and buttons, `JetBrains Mono` for tabular currency figures (`tabular-nums`).

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Lightweight React `LanguageContext` vs Heavy i18n Libraries**
  - *Chosen Approach*: Custom typed `LanguageContext` providing `language`, `setLanguage`, and a strongly typed dictionary `t` function with nested key support.
  - *Why*: Zero external bundle overhead, instant zero-latency updates, 100% TypeScript compile-time safety, and seamless integration with existing React state.
  - *Alternatives Considered*: `react-i18next` was avoided because it introduces unnecessary bundle weight and complex asynchronous initialization.

- **Decision 2: Multilingual Scenario Content Modeling**
  - *Chosen Approach*: Support localized scenario fields (`title`, `story`, `lawSummary`, `tip`, and `option.explanation`) via a scenario translation map or multilingual scenario definition, preserving numeric amounts across all languages.
  - *Why*: Soliq amounts (`so'm`) remain identical mathematical constants while descriptions, legal references, and tax tips reflect standard terminology in each respective language.

- **Decision 3: Natural Progressive Complexity vs Static Difficulty**
  - *Chosen Approach*: Map early days (Days 1–3) to straightforward gross turnover and baseline freelance contracts, Days 4–6 to marketplace gross turnover (Uzum Market commission rules) and property leases, and Days 7+ to higher volume contracts, deductions, and corporate MChJ filings.
  - *Why*: Matches real-world professional learning arcs and eliminates artificial UI toggles.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────┐
│                   App Root (main.tsx)                  │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│                    LanguageProvider                    │
│   - state: 'uz' | 'ru' | 'en' (stored in localStorage) │
│   - t(key, params?): string                            │
│   - translations dictionary (uz.ts, ru.ts, en.ts)      │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│                      GameProvider                      │
│   - Progressive scenario selection (day-based)         │
│   - Unified pool (oson/orta/qiyin removed from UI)     │
└─────────────┬───────────────────────────┬──────────────┘
              │                           │
┌─────────────▼──────────┐   ┌────────────▼──────────────┐
│         Header         │   │         HomeScreen        │
│  - Language Dropdown   │   │  - [Difficulty block CUT] │
│  - Synchronized Bal.   │   │  - Elevated Income Strip  │
│  - Player Name Pill    │   │  - Unified Daily Mission  │
└────────────────────────┘   └───────────────────────────┘
```

### Component & File Work Breakdown

1. **`src/i18n/` Module**:
   - `src/i18n/types.ts`: Translation keys and language types (`'uz' | 'ru' | 'en'`).
   - `src/i18n/translations.ts`: Comprehensive dictionary covering:
     - Navigation & Headers
     - Profile & Education modal
     - Dashboard & Metrics
     - Gameplay & Quiz controls
     - Results & Penalties
     - MChJ Corporate mode terms
     - AI Advisor prompts and guidance
     - Localized scenario stories & legal citations
   - `src/context/LanguageContext.tsx`: Provider with instant `useLanguage()` hook, `localStorage` synchronization, and fallback resilience.

2. **`src/components/Header.tsx`**:
   - Embed language switcher dropdown menu with flags and language names (`O'zbekcha`, `Русский`, `English`).
   - Bind all header text to `useLanguage()`.

3. **`src/components/HomeScreen.tsx`**:
   - Remove the `Qiyinlik darajasi` card block and buttons (`Oson`, `O'rta`, `Qiyin`).
   - Smoothly elevate `Daromad manbalari` and `Kun rejasi` cards.
   - Replace all hardcoded Uzbek strings with translation keys from `useLanguage()`.

4. **`src/context/GameContext.tsx` & `src/data/taxScenarios.ts`**:
   - Deprecate `setDifficulty` UI requirements while maintaining backward compatibility with saved games.
   - Update `getScenarioForDay` to implement progressive day-based difficulty:
     - Days 1–3: foundational freelance/contract scenarios.
     - Days 4–6: marketplace gross revenue, rental leases, education rebate.
     - Days 7+: complex mixed operations.
   - Provide multilingual resolution for current scenario texts.

5. **`CalculationScreen.tsx`, `ResultScreen.tsx`, `BottomNav.tsx`, `MChJ*` screens**:
   - Replace static strings with `t(...)` translations.

---

## 5. Verification Plan

1. **Build & Type Checking**:
   - Run `lint_applet` to confirm zero missing translation keys or TypeScript compilation errors.
   - Run `compile_applet` to verify clean Vite build.
2. **Functional Testing**:
   - Switch language to `RU`: verify header, home profile card, stats, quiz screen, and calculator display natural Russian text.
   - Switch language to `EN`: verify English terminology (`LLC`, `Sole Proprietor`, `Gross Turnover`, `Tax Rate`).
   - Switch language to `UZ`: verify exact original Uzbek wording is preserved.
   - Reload page: confirm selected language persists in `localStorage` without resetting game balance, day, or profile.
   - Verify that removing difficulty options did not break game start or question generation.
