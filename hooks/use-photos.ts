import { useCallback, useEffect, useRef, useState } from 'react';

import * as MediaLibrary from 'expo-media-library';

import { useViewedPhotoIds } from '@/stores/app-store';

const BATCH_SIZE = 50;

interface UsePhotosReturn {
  assets: MediaLibrary.Asset[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  totalCount: number;
  remainingCount: number;
}

interface LoadState {
  endCursor?: string;
  hasMore: boolean;
  totalCount: number;
}

interface BatchResult {
  assets: MediaLibrary.Asset[];
  endCursor?: string;
  hasNextPage: boolean;
  totalCount: number;
}

export function usePhotos(): UsePhotosReturn {
  const viewedIds = useViewedPhotoIds();
  const [assets, setAssets] = useState<MediaLibrary.Asset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadState, setLoadState] = useState<LoadState>({
    hasMore: true,
    totalCount: 0,
  });

  const viewedIdsRef = useRef(viewedIds);
  viewedIdsRef.current = viewedIds;

  const isLoadingRef = useRef(false);
  const isMountedRef = useRef(true);

  async function fetchBatch(cursor?: string): Promise<BatchResult> {
    const result = await MediaLibrary.getAssetsAsync({
      mediaType: MediaLibrary.MediaType.photo,
      sortBy: [MediaLibrary.SortBy.creationTime],
      first: BATCH_SIZE,
      after: cursor,
    });

    const unviewedAssets = result.assets.filter((asset) => !(asset.id in viewedIdsRef.current));

    return {
      assets: unviewedAssets,
      endCursor: result.endCursor,
      hasNextPage: result.hasNextPage,
      totalCount: result.totalCount,
    };
  }

  async function loadUntilFilled(
    cursor?: string,
    existingAssets: MediaLibrary.Asset[] = [],
    targetCount = BATCH_SIZE
  ): Promise<{
    assets: MediaLibrary.Asset[];
    endCursor?: string;
    hasMore: boolean;
    totalCount: number;
  }> {
    let accumulated = [...existingAssets];
    let nextCursor = cursor;
    let hasNext = true;
    let total = 0;

    while (accumulated.length < targetCount && hasNext) {
      const batch = await fetchBatch(nextCursor);
      accumulated = [...accumulated, ...batch.assets];
      nextCursor = batch.endCursor;
      hasNext = batch.hasNextPage;
      total = batch.totalCount;
    }

    return {
      assets: accumulated,
      endCursor: nextCursor,
      hasMore: hasNext,
      totalCount: total,
    };
  }

  const initialLoad = useCallback(async (): Promise<void> => {
    if (isLoadingRef.current) return;

    isLoadingRef.current = true;
    setIsLoading(true);
    setError(null);

    const permissionResult = await MediaLibrary.getPermissionsAsync();

    if (permissionResult.status !== 'granted') {
      if (isMountedRef.current) {
        setError('Photo library permission not granted');
        setIsLoading(false);
      }
      isLoadingRef.current = false;
      return;
    }

    try {
      const result = await loadUntilFilled();

      if (isMountedRef.current) {
        setAssets(result.assets);
        setLoadState({
          endCursor: result.endCursor,
          hasMore: result.hasMore,
          totalCount: result.totalCount,
        });
      }
    } catch (err) {
      if (isMountedRef.current) {
        const message = err instanceof Error ? err.message : 'Failed to load photos';
        setError(message);
      }
    } finally {
      isLoadingRef.current = false;
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }, []);

  const loadMore = useCallback(async (): Promise<void> => {
    if (isLoadingRef.current || !loadState.hasMore) return;

    isLoadingRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const result = await loadUntilFilled(loadState.endCursor);

      if (isMountedRef.current) {
        setAssets((prev) => [...prev, ...result.assets]);
        setLoadState({
          endCursor: result.endCursor,
          hasMore: result.hasMore,
          totalCount: result.totalCount,
        });
      }
    } catch (err) {
      if (isMountedRef.current) {
        const message = err instanceof Error ? err.message : 'Failed to load more photos';
        setError(message);
      }
    } finally {
      isLoadingRef.current = false;
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }, [loadState.endCursor, loadState.hasMore]);

  const refresh = useCallback(async (): Promise<void> => {
    setAssets([]);
    setLoadState({ hasMore: true, totalCount: 0 });
    isLoadingRef.current = false;
    await initialLoad();
  }, [initialLoad]);

  useEffect(() => {
    isMountedRef.current = true;
    initialLoad();

    return () => {
      isMountedRef.current = false;
    };
  }, [initialLoad]);

  const remainingCount = Math.max(0, loadState.totalCount - Object.keys(viewedIdsRef.current).length);

  return {
    assets,
    isLoading,
    error,
    hasMore: loadState.hasMore,
    loadMore,
    refresh,
    totalCount: loadState.totalCount,
    remainingCount,
  };
}
