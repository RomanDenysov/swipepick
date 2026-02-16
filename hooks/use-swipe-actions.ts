import { useAppActions } from '@/stores/app-store';
import { useCallback, useRef } from 'react';

type UndoEntry = {
  photoId: string;
  type: 'trash' | 'keep' | 'favorite';
};

const MAX_UNDO = 10;

export function useSwipeActions() {
  const { markPhoto, removePhoto } = useAppActions();
  const undoStackRef = useRef<UndoEntry[]>([]);

  const onSwipeLeft = useCallback(
    (photoId: string) => {
      markPhoto(photoId, 'trash');
      const entry: UndoEntry = { photoId, type: 'trash' };
      undoStackRef.current = [...undoStackRef.current, entry].slice(-MAX_UNDO);
    },
    [markPhoto]
  );

  const onSwipeRight = useCallback(
    (photoId: string) => {
      markPhoto(photoId, 'keep');
      const entry: UndoEntry = { photoId, type: 'keep' };
      undoStackRef.current = [...undoStackRef.current, entry].slice(-MAX_UNDO);
    },
    [markPhoto]
  );

  const onSwipeUp = useCallback(
    (photoId: string) => {
      markPhoto(photoId, 'favorite');
      const entry: UndoEntry = { photoId, type: 'favorite' };
      undoStackRef.current = [...undoStackRef.current, entry].slice(-MAX_UNDO);
    },
    [markPhoto]
  );

  const undo = useCallback(() => {
    const stack = undoStackRef.current;
    if (stack.length === 0) return null;

    const last = stack[stack.length - 1];
    undoStackRef.current = stack.slice(0, -1);

    removePhoto(last.photoId);
    return last;
  }, [removePhoto]);

  const canUndo = undoStackRef.current.length > 0;

  return {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    undo,
    canUndo,
  };
}
