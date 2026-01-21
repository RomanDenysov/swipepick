import { openDatabaseSync } from 'expo-sqlite';

export const db = openDatabaseSync('swipepick.db');

// Initialize tables on import
db.execSync(`
  CREATE TABLE IF NOT EXISTS viewed_photos (
    photo_id TEXT PRIMARY KEY NOT NULL,
    action TEXT NOT NULL CHECK (action IN ('keep', 'trash', 'favorite')),
    viewed_at INTEGER NOT NULL,
    deleted_at INTEGER
  );
`);
