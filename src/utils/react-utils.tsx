import { useEffect, useLayoutEffect, useRef, useState } from "react";
export const useOnce = (callback, ...args) => {
  useEffect(() => {
    callback(...args);
  }, []);
};


