import { db } from '../database';

export async function createObservacionTable() {
    await db.execAsync(`
    CREATE TABLE IF NOT EXISTS observaciones (
      id TEXT PRIMARY KEY NOT NULL,
      titulo TEXT,
      severidad TEXT,
      responsable_id TEXT,
      descripcion TEXT,
      pozo_id TEXT,
      ubicacion TEXT,
      foto TEXT,
      timestamp TEXT,
      version INTEGER,
      deviceId TEXT,
      synced INTEGER DEFAULT 0,
      FOREIGN KEY (responsable_id) REFERENCES responsables(id),
      FOREIGN KEY (pozo_id) REFERENCES pozos(id)
    );
  `);
}
