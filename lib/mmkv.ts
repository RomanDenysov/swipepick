import { createMMKV } from 'react-native-mmkv';

const storage = createMMKV();

/** Zustand-compatible storage adapter for MMKV */
export const mmkvStorage = {
  getItem: (name: string): string | null => storage.getString(name) ?? null,
  setItem: (name: string, value: string) => storage.set(name, value),
  removeItem: (name: string) => {
    storage.remove(name);
  },
};
