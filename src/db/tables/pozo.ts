import { db } from '../database';

export async function createPozosTable() {
    await db.execAsync(`
    CREATE TABLE IF NOT EXISTS pozos (
      id TEXT PRIMARY KEY NOT NULL,
      nombre TEXT NOT NULL,
      ubicacion TEXT
    );
  `);
}
