const getLocalStorage = (key: any) =>
  (localStorage.getItem(key) && JSON.parse(localStorage.getItem(key) || "")) ||
  null;

const setLocalStorage = (key: any, data: any) =>
  localStorage.setItem(key, JSON.stringify(data));

const clearLocalStorage = (key: any) => localStorage.removeItem(key);

export { getLocalStorage, setLocalStorage, clearLocalStorage };
