import { mmkvStorage } from '@/lib/mmkv';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

export type PhotoAction = 'keep' | 'trash' | 'favorite';

type ThemeMode = 'system' | 'light' | 'dark';

type AppState = {
  isOnboardingCompleted: boolean;
  themeMode: ThemeMode;
  hapticEnabled: boolean;
  viewedPhotos: Record<string, PhotoAction>;
};

type AppActions = {
  completeOnboarding: () => void;
  setThemeMode: (themeMode: ThemeMode) => void;
  setHapticEnabled: (enabled: boolean) => void;
  markPhoto: (photoId: string, action: PhotoAction) => void;
  removePhoto: (photoId: string) => void;
  reset: () => void;
};

type AppStore = AppState & { actions: AppActions };

const initialState: AppState = {
  isOnboardingCompleted: false,
  themeMode: 'system',
  hapticEnabled: true,
  viewedPhotos: {},
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
          markPhoto: (photoId, action) =>
            set((state) => ({
              viewedPhotos: { ...state.viewedPhotos, [photoId]: action },
            })),
          removePhoto: (photoId) =>
            set((state) => {
              const { [photoId]: _, ...rest } = state.viewedPhotos;
              return { viewedPhotos: rest };
            }),
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
          viewedPhotos: state.viewedPhotos,
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

export const useViewedPhotoIds = () => useAppStore((s) => s.viewedPhotos);

export const useTrashCount = () =>
  useAppStore((s) => Object.values(s.viewedPhotos).filter((a) => a === 'trash').length);

export const useFavoriteCount = () =>
  useAppStore((s) => Object.values(s.viewedPhotos).filter((a) => a === 'favorite').length);
