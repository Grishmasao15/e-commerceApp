import { useState } from "react";

export interface newValueInterface {
  contact_no: string
  dob: Date
  email: string
  firstname: string
  gender: string
  id: number
  lastname: string
  token: string
}

export const useLocalStorage = (keyName: string, defaultValue: null) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (newValue: { user: newValueInterface }) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {
      console.log(err);
    }
    setStoredValue(newValue);
  };

  return [storedValue, setValue];

};