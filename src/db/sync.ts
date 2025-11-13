import { isOnline } from '../utils/network';
import { setLastSync } from '../utils/storage';
import { db } from './database';

export async function syncobservaciones() {
    const online = await isOnline();
    if (!online) return;

    const unsynced = await db.getAllAsync(`SELECT * FROM observaciones WHERE synced = 0`);
    if (unsynced.length === 0) return;

    // Simulación de POST al servidor
    await Promise.all(
        unsynced.map(async (i: any) => {
            await db.runAsync(`UPDATE observaciones SET synced = 1 WHERE id = ?`, [i.id]);
        })
    );

    setLastSync(new Date().toISOString());
}
