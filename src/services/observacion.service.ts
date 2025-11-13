import dayjs from 'dayjs';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db/database';
import { IObservacion } from '../models/observation.model';

export async function createObservacion(data: any) {
    console.log(data);

    const observacion = {
        ...data,
        id: uuidv4(),
        timestamp: dayjs().toISOString(),
        version: 1,
        synced: 0, // 0 = no sincronizado
    };

    await db.runAsync(
        `INSERT INTO observaciones 
      (id, titulo, severidad, responsable_id, descripcion, pozo_id, ubicacion, foto, timestamp, version, deviceId, synced)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            observacion.id,
            observacion.titulo,
            observacion.severidad,
            observacion.responsable_id,
            observacion.descripcion,
            observacion.pozo_id,
            observacion.ubicacion,
            observacion.foto,
            observacion.timestamp,
            observacion.version,
            observacion.deviceId,
            observacion.synced,
        ]
    );

    console.log('Observación creada:', observacion);
    return observacion;
}

export async function getAllObservacion(): Promise<IObservacion[]> {
    const result = await db.getAllAsync<IObservacion>(`SELECT * FROM observaciones ORDER BY timestamp DESC`);
    return result;
}

export async function updateobservacion(observacion: IObservacion) {
    await db.runAsync(
        `UPDATE observaciones SET titulo=?, severidad=?, responsable=?, descripcion=?, pozo=?, ubicacion=?, foto=?, version=?, synced=0 WHERE id=?`,
        [
            observacion.titulo,
            observacion.severidad,
            observacion.responsable,
            observacion.descripcion,
            observacion.pozo,
            observacion.ubicacion,
            observacion.foto,
            observacion.version + 1,
            observacion.id,
        ]
    );
}

export async function deleteobservacion(id: string) {
    await db.runAsync(`DELETE FROM observaciones WHERE id=?`, [id]);
}
