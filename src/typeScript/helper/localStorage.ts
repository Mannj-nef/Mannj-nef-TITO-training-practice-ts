import { KEY } from "../constants/enum";

import { localStorageData } from "../constants/types";

const getLocalStorage = (key: KEY) =>
  (localStorage.getItem(key) && JSON.parse(localStorage.getItem(key) || "")) ||
  null;

const setLocalStorage = (key: KEY, data: localStorageData) =>
  localStorage.setItem(key, JSON.stringify(data));

const clearLocalStorage = (key: KEY) => localStorage.removeItem(key);

export { getLocalStorage, setLocalStorage, clearLocalStorage };
