# Modifying Taschen-Dolmetscher

All project source files live inside `artifacts/taschen-dolmetcher/src/` on the `improved-replit` branch.

---

## Entry Points

| File | Purpose |
|---|---|
| `src/main.tsx` | Mounts the React app into the DOM |
| `src/App.tsx` | Top-level state, wires all hooks, passes props down to every component |
| `src/index.css` | Tailwind config, CSS variables, dark mode variables, custom font declarations |

---

## Components (`src/components/`)

| File | What it controls |
|---|---|
| `Header.tsx` | Page title, subtitle, decorative book-cover SVG images |
| `Navbar.tsx` | Top navigation bar, centered score pill (desktop), dark mode toggle, share button |
| `ScoreTracker.tsx` | Desktop score pill inside the navbar + the mobile bottom banner (with minimize/expand) |
| `Footer.tsx` | Bottom attribution strip |
| `LanguageSelector.tsx` | From / To language dropdowns |
| `QuestionsFormat.tsx` | "Multiple choice / Type your answer" toggle |
| `QuestionsContainer.tsx` | Renders the full list of question cards |
| `Question.tsx` | A single typing-mode question card |
| `MultiChoiceQuestion.tsx` | A single multiple-choice question card |

### Question sub-components (`src/components/question/`)

| File | What it controls |
|---|---|
| `AnswerChoices.tsx` | The radio-button answer list inside a multiple-choice card |
| `FeedbackOverlay.tsx` | The wrong-answer Akhmatova / Pasternak image flash overlay |

---

## Hooks (`src/hooks/`)

| File | What it does |
|---|---|
| `useDarkMode.ts` | Toggles `.dark` class on `<html>`, persists preference to `localStorage` |
| `useShareScore.ts` | Web Share API with clipboard fallback; generates the share text |
| `useHighScore.ts` | Tracks the best correct-answer count across sessions in `localStorage` |

---

## Context (`src/contexts/`)

| File | What it does |
|---|---|
| `DarkModeContext.tsx` | React context that exposes the current dark mode boolean to any component without prop drilling |

---

## Utilities (`src/utils/`)

| File | What it does |
|---|---|
| `haptics.ts` | Vibration helpers (`hapticCorrect`, `hapticWrong`) and the haptic-enabled toggle |
| `questionHelpers.ts` | Picks the question text and answer based on the selected language pair |

---

## Data (`src/assets/data/`)

| File | Contents |
|---|---|
| `improved_data_deepseek_en_array.json` | Main phrase data — each entry has `de`, `en`, `ru`, `phonetic`, `media`, and `info` fields |
| `wrongAnswerImages.json` | Image URLs and captions shown on a wrong answer (Akhmatova / Pasternak photos) |

---

## Types

- `src/types/index.ts` — shared TypeScript types used across the project (`LanguageType`, `QuestionType`, `MediaItem`, `InfoItem`, etc.)

---

## Common edits

**Change the History or How to Play text**
→ Edit `src/components/Navbar.tsx`, find the `NavigationMenuContent` for `"history"` or `"game"`.

**Add or edit a phrase**
→ Edit `src/assets/data/improved_data_deepseek_en_array.json`. Each entry follows this shape:

```json
{
  "id": 1,
  "de": "Wo ist der Stab?",
  "en": ["Where is the headquarters?"],
  "ru": "Где штаб?",
  "phonetic": "Gde shtab?",
  "media": {
    "imgUrl": "https://...",
    "imgCaption": "...",
    "altText": "..."
  },
  "info": {
    "text": "Quote or context passage...",
    "sourceChicago": "Author, Title, Year."
  }
}
```

**Change the wrong-answer images**
→ Edit `src/assets/data/wrongAnswerImages.json`.

**Adjust scoring or game flow**
→ Edit `src/App.tsx` (`handleAnswer`, `handleNewGame`) and `src/components/ScoreTracker.tsx`.

**Change fonts or colors**
→ Edit the `@theme inline` block and `:root` / `.dark` variable blocks in `src/index.css`.

---

## Tech stack

- React 18 + TypeScript
- Vite
- Tailwind CSS v4
- shadcn/ui + Radix UI primitives
- Deployed to GitHub Pages from the `improved-replit` branch via GitHub Actions (output: `gh-pages` branch)
