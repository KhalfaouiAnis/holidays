import { MMKV } from "react-native-mmkv";
import { StateStorage } from "zustand/middleware";

export const storage = new MMKV();

export function getItem<T>(key: string): T {
  const value = storage.getString(key);
  if (value) {
    return JSON.parse(value);
  }
  return null as T;
}

export async function setItem<T>(key: string, value: T) {
  storage.set(key, JSON.stringify(value));
}

export async function removeItem(key: string) {
  storage.delete(key);
}

export const zustandStorage: StateStorage = {
  getItem,
  setItem,
  removeItem,
};
