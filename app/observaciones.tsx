import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { FlatList, Modal, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from "./observaciones.styles";

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { initDB } from '@/src/db/database';
import { createObservacion, deleteObservacion, getAllObservacion } from '@/src/services/observacion.service';

type Observacion = {
  id: string;
  titulo: string;
  severidad: 'Alta' | 'Media' | 'Baja';
  descripcion: string;
  pozo: string;
  responsable: 'Jero' | 'Lucas';
  ubicacion?: string;
};

export default function ObservacionesScreen() {
  const [observaciones, setObservaciones] = useState<any>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Observacion>>({});
  const [selectType, setSelectType] = useState<'severidad' | 'responsable' | null>(null);

  const severidades = ['Alta', 'Media', 'Baja'];
  const responsables = ['Jero', 'Lucas'];

  useEffect(() => {
    initDB();
    getAllObservacion().then((res) => {
      setObservaciones(res);
      console.log('res', res)
    });

  }, []);



  const handleAddObservacion = async () => {
    if (!form.titulo || !form.severidad) return;

    const payload: Observacion = form;

    let response = await createObservacion(payload); // 💾 guarda en SQLite
    console.log('response', response);
    const updated = await getAllObservacion(); // 🔄 recarga desde DB
    setObservaciones(updated);


    setObservaciones([...observaciones, { id: Date.now().toString(), ...form } as Observacion]);
    setForm({});
    setModalVisible(false);
  };

  const handleDelete = async (id: string) => {
    await deleteObservacion(id);      // ❌ borrar en SQLite
    const updated = await getAllObservacion();
    setObservaciones(updated);        // 🔄 actualizar lista
  };


  const renderSelectModal = (type: 'severidad' | 'responsable') => {
    const options = type === 'severidad' ? severidades : responsables;
    return (
      <Modal visible={selectType === type} transparent animationType="fade">
        <View style={styles.selectOverlay}>
          <View style={styles.selectContainer}>
            <ThemedText type="title" style={[styles.blackText, { marginBottom: 10 }]}>
              Seleccionar {type === 'severidad' ? 'Severidad' : 'Responsable'}
            </ThemedText>
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.selectOption}
                onPress={() => {
                  setForm({ ...form, [type]: option });
                  setSelectType(null);
                }}>
                <ThemedText style={styles.blackText}>{option}</ThemedText>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => setSelectType(null)}>
              <ThemedText type="link" style={styles.cancelText}>
                Cancelar
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getSeverityColor = (severidad: string) => {
    switch (severidad) {
      case 'Alta':
        return '#ff4d4d';
      case 'Media':
        return '#ffcc00';
      case 'Baja':
        return '#4caf50';
      default:
        return '#999';
    }
  };

  return (
    <ThemedView style={styles.container}>
      {/* Lista de observaciones */}
      <FlatList
        data={observaciones}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => toggleExpand(item.id)}
            activeOpacity={0.8}
            style={[styles.card, { borderLeftColor: getSeverityColor(item.severidad) }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <ThemedText type="defaultSemiBold">{item.titulo}</ThemedText>
              <ThemedText style={{ color: getSeverityColor(item.severidad) }}>
                {item.severidad}
              </ThemedText>

              {/* Botón eliminar */}
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Ionicons name="trash" size={22} color="#d32f2f" />
              </TouchableOpacity>
            </View>

            {expandedId === item.id && (
              <View style={{ marginTop: 6 }}>
                <ThemedText>Responsable: {item.responsable}</ThemedText>
                <ThemedText>Pozo: {item.pozo}</ThemedText>
                <ThemedText>Ubicación: {item.ubicacion}</ThemedText>
                <ThemedText style={{ marginTop: 4 }}>{item.descripcion}</ThemedText>
              </View>
            )}
          </TouchableOpacity>
        )}
      />

      {/* Botón flotante */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>

      {/* Modal principal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <ScrollView contentContainerStyle={styles.modalContainer}>
            <ThemedText type="title" style={[styles.blackText, { marginBottom: 10 }]}>
              Nueva Observación
            </ThemedText>

            <TextInput
              placeholder="Título"
              placeholderTextColor="#666"
              style={styles.input}
              value={form.titulo}
              onChangeText={(text) => setForm({ ...form, titulo: text })}
            />

            {/* Selector de Severidad */}
            <TouchableOpacity
              style={styles.input}
              onPress={() => setSelectType('severidad')}>
              <ThemedText style={styles.blackText}>
                {form.severidad ? form.severidad : 'Seleccionar Severidad'}
              </ThemedText>
            </TouchableOpacity>

            {/* Selector de Responsable */}
            <TouchableOpacity
              style={styles.input}
              onPress={() => setSelectType('responsable')}>
              <ThemedText style={styles.blackText}>
                {form.responsable ? form.responsable : 'Seleccionar Responsable'}
              </ThemedText>
            </TouchableOpacity>

            <TextInput
              placeholder="Descripción"
              placeholderTextColor="#666"
              style={[styles.input, { height: 60 }]}
              multiline
              value={form.descripcion}
              onChangeText={(text) => setForm({ ...form, descripcion: text })}
            />

            <TextInput
              placeholder="Pozo"
              placeholderTextColor="#666"
              style={styles.input}
              value={form.pozo}
              onChangeText={(text) => setForm({ ...form, pozo: text })}
            />

            <TextInput
              placeholder="Ubicación"
              placeholderTextColor="#666"
              style={styles.input}
              value={form.ubicacion}
              onChangeText={(text) => setForm({ ...form, ubicacion: text })}
            />
            <TouchableOpacity
              style={[styles.saveButton, { backgroundColor: '#4caf50' }]}>
              <ThemedText type="defaultSemiBold" style={{ color: '#fff' }}>
                Tomar foto
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleAddObservacion}>
              <ThemedText type="defaultSemiBold" style={{ color: '#fff' }}>
                Guardar
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <ThemedText type="link" style={styles.cancelText}>
                Cancelar
              </ThemedText>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>

      {/* Modales de selección */}
      {renderSelectModal('severidad')}
      {renderSelectModal('responsable')}
    </ThemedView>
  );
}
