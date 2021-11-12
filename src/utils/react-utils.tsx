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
export function useMapEvents<events>() {
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

export const useUpdateRender = () => {
  const [, setUpdate] = useState(null);
  return [() => setUpdate({})] as const;
};

export const useForm = () => {
  const ref = useRef<HTMLFormElement>();
  const callbackRef = useRef(values => {});
  type status = "initial" | "valid" | "invalid";

  const [status, setStatus] = useState<status>("initial");

  return [
    status,
    {
      onChange: event => {
        event.persist();
        setStatus(status => {
          switch (status) {
            case "initial":
            case "valid":
            case "invalid":
              return ref.current?.checkValidity() ? "valid" : "invalid";
            default:
              return status;
          }
        });
      },
      onSubmit: event => {
        event.persist();
        event.preventDefault();
        event.stopPropagation();
        if (status === "valid") {
          const values = {};
          ref.current.querySelectorAll("input").forEach(input => {
            if (input.type === "checked") values[input.name] = input.checked;
            values[input.name] = input.value;
          });
          if (callbackRef.current) callbackRef.current(values);
        }
      },
      ref
    } as FormElementProps,
    (callback: (inputs: { [name: string]: string }) => void) => {
      callbackRef.current = callback;
    }
  ] as const;
};
type FormElementProps = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;
type InputElementProps = React.HTMLProps<HTMLInputElement>;

/** So quick creation of pagination, slicing for now on return the items for current page.... could improve on slice every call... */
export const usePagination = (items = [], initialPage = 1, range = 5, perPage = 20) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [lastPage, setLastPage] = useState(1);
  const itemCount = items.length;

  useEffect(() => {
    setLastPage(Math.ceil(itemCount / perPage));
  }, [itemCount]);

  const pageRange = Array(range)
    .fill(1)
    .map((v, i) => {
      const rangeStart = Math.floor((currentPage - 1) / range) * range;
      return rangeStart + (i + 1);
    })
    .filter(index => index <= lastPage);

  return [
    items.slice((currentPage - 1) * perPage, currentPage * perPage),
    currentPage,
    pageRange,
    lastPage,
    /** next page */
    () => setCurrentPage(Math.min(currentPage + 1, lastPage)),
    /** previous page */
    () => setCurrentPage(Math.max(currentPage - 1, 1)),
    /** set page  */
    value => setCurrentPage(value)
  ] as const;
};
