import { mmkvStorage } from '@/lib/mmkv';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

type UndoAction = {
  photoId: string;
  type: 'trash' | 'favorite';
  timestamp: number;
};

type SessionState = {
  undoStack: UndoAction[];
  trashQueueCount: number;
}

type SessionActions = {
  pushUndo: (action: UndoAction) => void;
  popUndo: () => UndoAction | undefined;
  incrementTrash: () => void;
  resetTrashQueue: () => void;
}

type SessionStore = SessionState & {
  actions: SessionActions;
};

const initialState: SessionState = {
  undoStack: [],
  trashQueueCount: 0,
};

export const useSessionStore = create<SessionStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        actions: {
          pushUndo: (action: UndoAction) =>
            set((state) => ({
              undoStack: [...state.undoStack, action].slice(-10),
            })),
          popUndo: () => {
            const { undoStack } = get();
            if (undoStack.length === 0) return undefined;

            const last = undoStack[undoStack.length - 1];
            set({ undoStack: undoStack.slice(0, -1) });
            return last;
          },
          incrementTrash: () =>
            set((state) => ({
              trashQueueCount: state.trashQueueCount + 1,
            })),
          resetTrashQueue: () => set({ trashQueueCount: 0 }),
        },
      }),
      {
        name: 'session-store',
        storage: createJSONStorage(() => mmkvStorage),
        partialize: (state) => ({
          undoStack: state.undoStack,
          trashQueueCount: state.trashQueueCount,
        }),
      }
    ),
    {
      name: 'session-store',
      enabled: __DEV__,
    }
  )
);

export const useTrashQueueCount = () => useSessionStore((s) => s.trashQueueCount);
export const useUndoStack = () => useSessionStore((s) => s.undoStack);
export const useSessionActions = () => useSessionStore((s) => s.actions);
