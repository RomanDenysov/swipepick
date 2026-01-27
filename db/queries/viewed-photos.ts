import { db } from '../client';

export type PhotoAction = 'keep' | 'trash' | 'favorite';

export interface ViewedPhoto {
  photo_id: string;
  action: PhotoAction;
  viewed_at: number;
  deleted_at: number | null;
}

export const markPhotoViewed = (photoId: string, action: PhotoAction): void => {
  const now = Date.now();
  db.runSync(
    `INSERT INTO viewed_photos (photo_id, action, viewed_at)
     VALUES (?, ?, ?)
     ON CONFLICT(photo_id) DO UPDATE SET action = ?, viewed_at = ?`,
    [photoId, action, now, action, now]
  );
};

export const getViewedPhotos = (): Set<string> => {
  const rows = db.getAllSync<{ photo_id: string }>('SELECT photo_id FROM viewed_photos');
  return new Set(rows.map((r) => r.photo_id));
};

export const getTrashQueue = (): ViewedPhoto[] => {
  return db.getAllSync<ViewedPhoto>(
    `SELECT * FROM viewed_photos WHERE action = 'trash' AND deleted_at IS NULL`
  );
};

export const markPhotosDeleted = (photoIds: string[]): void => {
  if (photoIds.length === 0) return;

  const placeholders = photoIds.map(() => '?').join(',');
  const now = Date.now();
  db.runSync(`UPDATE viewed_photos SET deleted_at = ? WHERE photo_id IN (${placeholders})`, [
    now,
    ...photoIds,
  ]);
};

export const updatePhotoAction = (photoId: string, action: PhotoAction): void => {
  db.runSync('UPDATE viewed_photos SET action = ?, viewed_at = ? WHERE photo_id = ?', [
    action,
    Date.now(),
    photoId,
  ]);
};
