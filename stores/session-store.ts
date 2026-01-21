import { create } from "zustand";

type UndoAction = {
    photoId: string;
    type: 'trash' | 'favorite'
    timestamp: number;
}

interface SessionStore {
    undoStack: UndoAction[];
    trashQueueCount: number;

    pushUndo: (action: UndoAction) => void;
    popUndo: () => UndoAction | undefined;
    incrementTrash: () => void;
    resetTrashQueue: () => void
}

export const useSessionStore = create<SessionStore>((set, get) => ({
    undoStack: [],
    trashQueueCount: 0,

    pushUndo: (action) => set((state) => ({
        undoStack: [...state.undoStack, action].slice(-10)
    })),

    popUndo: () => {
        const { undoStack } = get();
        if(undoStack.length === 0) return undefined;

        const last = undoStack[undoStack.length - 1];
        set({undoStack: undoStack.slice(0, -1)})
        return last;
    },

    incrementTrash: () => set((state) => ({
        trashQueueCount: state.trashQueueCount + 1
    })),

    resetTrashQueue: () => set({trashQueueCount: 0}),
}))