import { db } from '../database';

export async function createResponsablesTable() {
    await db.execAsync(`
    CREATE TABLE IF NOT EXISTS responsables (
      id TEXT PRIMARY KEY NOT NULL,
      nombre TEXT NOT NULL,
      cargo TEXT
    );
  `);
}
