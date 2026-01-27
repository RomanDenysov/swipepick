import { mmkvStorage } from '@/lib/mmkv';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

type ThemeMode = 'system' | 'light' | 'dark';

type AppState = {
  isOnboardingCompleted: boolean;
  themeMode: ThemeMode;
  hapticEnabled: boolean;
};

type AppActions = {
  completeOnboarding: () => void;
  setThemeMode: (themeMode: ThemeMode) => void;
  setHapticEnabled: (enabled: boolean) => void;
  reset: () => void;
};

type AppStore = AppState & { actions: AppActions };

const initialState: AppState = {
  isOnboardingCompleted: false,
  themeMode: 'system',
  hapticEnabled: true,
};

export const useAppStore = create<AppStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        actions: {
          completeOnboarding: () => set({ isOnboardingCompleted: true }),
          setThemeMode: (themeMode) => set({ themeMode }),
          setHapticEnabled: (enabled) => set({ hapticEnabled: enabled }),
          reset: () => set(initialState),
        },
      }),
      {
        name: 'app-store',
        storage: createJSONStorage<AppState>(() => mmkvStorage),
        partialize: (state) => ({
          isOnboardingCompleted: state.isOnboardingCompleted,
          themeMode: state.themeMode,
          hapticEnabled: state.hapticEnabled,
        }),
      }
    ),
    {
      name: 'app-store',
      enabled: __DEV__,
    }
  )
);

export const useIsOnboardingCompleted = () => useAppStore((s) => s.isOnboardingCompleted);

export const useThemeMode = () => useAppStore((s) => s.themeMode);

export const useAppActions = () => useAppStore((s) => s.actions);
