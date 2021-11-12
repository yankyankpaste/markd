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

export const useUpdateRender = () => {
  const [, setUpdate] = useState(null);
  return [() => setUpdate({})] as const;
};

export const useForm = () => {
  const ref = useRef<HTMLFormElement>();
  type status = "initial" | "valid" | "invalid"; //  | "sending" | "sendError" | "sent"

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
      },
      ref
    } as FormElementProps
  ] as const;
};
type FormElementProps = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;
type InputElementProps = React.HTMLProps<HTMLInputElement>;
