import { markPhotoViewed, updatePhotoAction } from '@/db/queries/viewed-photos';
import { useSessionStore } from '@/stores/session-store';
import { useCallback } from 'react';

export function useSwipeActions() {
  const { pushUndo, popUndo, incrementTrash } = useSessionStore();

  const onSwipeLeft = useCallback((photoId: string) => {
    markPhotoViewed(photoId, 'trash');
    incrementTrash();
    pushUndo({ photoId, type: 'trash', timestamp: Date.now() });
  }, [pushUndo, incrementTrash]);

  const onSwipeRight = useCallback((photoId: string) => {
    markPhotoViewed(photoId, 'keep');
    // 'keep' doesn't go to undo stack - it's the default/safe action
  }, []);

  const onSwipeUp = useCallback((photoId: string) => {
    markPhotoViewed(photoId, 'favorite');
    pushUndo({ photoId, type: 'favorite', timestamp: Date.now() });
  }, [pushUndo]);

  const undo = useCallback(() => {
    const lastAction = popUndo();
    if (!lastAction) return null;

    // Revert to 'keep' (safe default)
    updatePhotoAction(lastAction.photoId, 'keep');
    return lastAction;
  }, [popUndo]);

  return {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    undo,
  };
}
