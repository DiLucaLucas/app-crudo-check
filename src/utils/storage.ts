

export const storage = new MMKV();

export const getLastSync = () => storage.getString('lastSync');
export const setLastSync = (date: string) => storage.set('lastSync', date);
