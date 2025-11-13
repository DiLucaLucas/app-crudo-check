import * as SQLite from 'expo-sqlite';
import { createObservacionTable } from './tables/observacion';
import { createPozosTable } from './tables/pozo';
import { createResponsablesTable } from './tables/responsable';

export const db = SQLite.openDatabaseSync('app.db');

export async function initDB() {
    console.log('🗄️ Iniciando base de datos...');
    await createObservacionTable();
    await createPozosTable();
    await createResponsablesTable();
    console.log('✅ Tablas inicializadas correctamente');
}