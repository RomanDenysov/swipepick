import { useEffect, useRef, useState } from 'react';

import * as MediaLibrary from 'expo-media-library';

import { useAppActions, useTrashPhotoIds } from '@/stores/app-store';

const BATCH_SIZE = 20;

export function useTrashPhotos() {
  const trashIds = useTrashPhotoIds();
  const { removePhoto } = useAppActions();
  const [assets, setAssets] = useState<MediaLibrary.Asset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (trashIds.length === 0) {
      setAssets([]);
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchAssets() {
      setIsLoading(true);

      const results: MediaLibrary.Asset[] = [];

      for (let i = 0; i < trashIds.length; i += BATCH_SIZE) {
        if (cancelled) return;

        const batch = trashIds.slice(i, i + BATCH_SIZE);
        const batchResults = await Promise.all(
          batch.map((id) => MediaLibrary.getAssetInfoAsync(id).catch(() => null))
        );

        for (let j = 0; j < batchResults.length; j++) {
          const asset = batchResults[j];
          if (asset) {
            results.push(asset);
          } else {
            removePhoto(batch[j]);
          }
        }
      }

      if (!cancelled && isMountedRef.current) {
        setAssets(results);
        setIsLoading(false);
      }
    }

    fetchAssets();

    return () => {
      cancelled = true;
    };
  }, [trashIds, removePhoto]);

  return { assets, isLoading };
}
