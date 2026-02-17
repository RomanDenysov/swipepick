# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SwipePick is a React Native (Expo SDK 55 preview) photo management app. Users swipe through their device photo library to sort photos into keep/trash/favorite categories, similar to a Tinder-style UX. Targets iOS and Android with iPad-specific adaptations.

## Commands

- `bunx expo start` — start dev server
- `bunx expo run:ios` / `bunx expo run:android` — native builds
- `bun run typecheck` — TypeScript checking (`tsc --noEmit`)
- `bun run lint` — ESLint (flat config with expo + prettier)
- `bun run format` — Prettier format all files
- `bun run format:check` — check formatting without writing

No test framework is configured yet.

## Architecture

### Routing (expo-router, file-based)

- `app/index.tsx` — entry redirect: checks onboarding state, sends to `/onboarding` or `/(main)/swipe`
- `app/onboarding/` — onboarding flow (welcome, tutorial, permissions)
- `app/(main)/` — main app stack: `swipe` (home), `favorites`, `trash`, `settings` (modal/sheet)

### State Management

Single Zustand store persisted via MMKV (`lib/mmkv.ts`):

- **`stores/app-store.ts`** — all app state: onboarding, theme, haptics, and viewed photos map (`Record<string, PhotoAction>`). Actions nested under `.actions` property.

Derived selectors (computed, not stored): `useTrashCount`, `useFavoriteCount`, `useViewedPhotoIds`.

Zustand pattern: state + `actions` object separated via `partialize` to exclude actions from persistence. Use selector hooks exported from the store file (e.g., `useIsOnboardingCompleted`, `useTrashCount`).

### Core Flow

- `hooks/use-photos.ts` — loads unviewed photos from `expo-media-library`, filters out already-viewed (via store selector), supports pagination in batches of 50
- `hooks/use-swipe-actions.ts` — handles swipe left (trash), right (keep), up (favorite), and undo. Writes to store, undo stack kept as ephemeral `useRef`
- `components/cards/` — card stack and swipeable card (gesture-handler + reanimated)

### Theming

- `constants/theme.tsx` — centralized theme object with light/dark color pairs, spacing, font sizes, border radii. iPad-aware scaling via `spaceScale`/`fontScale`.
- `hooks/use-app-theme.ts` — resolves system/manual theme preference
- `hooks/use-theme-color.ts` — picks light/dark value from theme color pairs
- Font family: Montserrat (Light, Medium, SemiBold, Bold + italic variants)

## Key Conventions

- Path alias: `@/*` maps to project root
- Typed routes enabled (`experiments.typedRoutes: true`)
- React Compiler enabled (`experiments.reactCompiler: true`)
- New Architecture enabled by default (SDK 55 — no `newArchEnabled` in app.json)
- Prettier: single quotes, trailing commas (es5), 100 char print width, 2-space tabs
- iPadOS adaptations: liquid glass effects, form sheet presentations, scaled spacing/fonts

## Gotchas

- App runs in **Expo Go** — no custom dev client. `expo-symbols` (SymbolView) and `expo-image` SF Symbol source (`sf:`) don't work. Use `@expo/vector-icons` for icons.
- SDK 55 (preview): `newArchEnabled` and `edgeToEdgeEnabled` removed from app.json schema. Native builds may fail — use Expo Go during preview.
- RN 0.83+: `useColorScheme()` can return `'unspecified'` — don't index `{light, dark}` objects directly with it.
- `expo-linear-gradient` is deprecated in SDK 55+ — use `experimental_backgroundImage` with CSS gradients on View instead.
