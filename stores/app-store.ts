import { createMMKV } from 'react-native-mmkv';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const storage = createMMKV();


const mmkvStorage = {
  getItem: (name: string): string | null => storage.getString(name) ?? null,
  setItem: (name: string, value: string) => storage.set(name, value),
  removeItem: (name: string) => { storage.remove(name); },
};

type ThemeMode = 'system' | 'light' | 'dark';

type AppState = {
    isOnboardingCompleted: boolean;
    themeMode: ThemeMode;
    hapticEnabled: boolean;
}

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
    persist((set) =>({
        ...initialState,

        actions: {
            completeOnboarding: () => set({ isOnboardingCompleted: true }),
            setThemeMode: (themeMode) => set({ themeMode }),
            setHapticEnabled: (enabled) => set({ hapticEnabled: enabled }),
            reset: () => set(initialState),
        }
    }), {
        name: 'app-store',
        storage: createJSONStorage<AppState>(() => mmkvStorage),
        partialize: (state) => ({
            isOnboardingCompleted: state.isOnboardingCompleted,
            themeMode: state.themeMode,
            hapticEnabled: state.hapticEnabled,
        }),
    }) );


export const useIsOnboardingCompleted = () =>
  useAppStore((s) => s.isOnboardingCompleted);

export const useThemeMode = () =>
  useAppStore((s) => s.themeMode);

export const useAppActions = () =>
  useAppStore((s) => s.actions);