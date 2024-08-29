import { localStorageKey } from "@/utils/variables";

export const saveTaskToLocalStorage = (stringifiedTask: string) => {
  return localStorage.setItem(localStorageKey, stringifiedTask);
};
export const deleteTaskFromLocalStorage = () => {
  return localStorage.removeItem(localStorageKey);
};
export const retrieveTaskFromLocalStorage = () => {
  return localStorage.getItem(localStorageKey);
};
