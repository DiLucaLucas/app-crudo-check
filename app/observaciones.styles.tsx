import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },

  card: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
    borderLeftWidth: 5,
    elevation: 1
  },

  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#007AFF',
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
  },

  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    width: '85%',
    padding: 16,
    alignSelf: 'center',
    elevation: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    color: '#000',
  },

  saveButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 10,
  },

  cancelText: {
    color: '#d32f2f',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: '600',
  },

  blackText: {
    color: '#000',
  },

  selectOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '80%',
    padding: 20,
  },

  selectOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
