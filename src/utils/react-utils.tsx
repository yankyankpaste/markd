import { useEffect, useLayoutEffect, useRef, useState } from "react";
export const useOnce = (callback, ...args) => {
  useEffect(() => {
    callback(...args);
  }, []);
};

/**
 * Tasty little map event hook
 * @returns
 */
function useMapEvents<events>() {
  type Callback = (name: string, meta?: any) => void;
  type GroupCallback = (groupName: string, name: string, meta?: any) => void;
  let groupCallbacks: Callback[] = [];
  let callbacks: GroupCallback[] = [];
  return [
    // onEvent
    (callback: Callback) => {
      callbacks.push(callback);
    },
    // onEvents
    (callback: GroupCallback) => {
      groupCallbacks.push(callback);
    },
    // mapEvent
    groupName => {
      return (eventName: string, meta?: any) => {
        callbacks.forEach(callback => callback(eventName, meta));
        groupCallbacks.forEach(callback => callback(groupName, eventName, meta));
      };
    }
  ] as const;
}
