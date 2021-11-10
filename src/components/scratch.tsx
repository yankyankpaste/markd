import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Div, Section } from "vendor/misc/Flex";
import { processCssVar, utils } from "utils/utils";
import * as Icons from "react-feather";
import { H, Text } from "../resource/controls/Text";
import { SelectionBox } from "./Selection";
import { type } from "os";
import { wrap } from "module";




const useMachine = () => {
  type tuple = [token, number];
  type token = { hash: number; state: any };
  const tuplesRef = useRef([] as tuple[]);
  const onEnter = (tokenRef: tokenRef, callback) => {
    const token = tokenRef.current as token;
    const stateTuple = tuplesRef.current.find((tuple) => tuple[0] === token);
    if (stateTuple && stateTuple[1] !== token.state) {
      stateTuple[1] = token.state;
      callback(isValid(token), get(token));
    } else if (!stateTuple) {
      tuplesRef.current.push([token, token.state]);
      callback(isValid(token), get(token));
    }
  };

  const isValid = (token, state = token["state"]) => {
    const getStatus = get(token);
    return () => getStatus() === state;
  };

  const get = (token) => {
    const tuple = tuplesRef.current.find((tuple) => tuple[0] === token);
    return () => tuple[0]["state"];
  };
  return [onEnter] as const;
};



const useStateChange = (state, setter) => {
  // take in state

  type tuple = [token, number];
  type token = { hash: number; state: any };

  const stateRef = useRef(null);
  const setterRef = useRef(setter);
  const statePhase = useRef("initial");
  const leavingCallback = useRef(null);

  if (stateRef.current !== state) {
    statePhase.current = "entering";
  }

  const tuplesRef = useRef([] as tuple[]);

  const onEnter = (callback) => {
    // so if callback doesnt exist instorage, call as its first time
    // so idea is only call once for the latest state change
    if (statePhase.current === "entering") {
      statePhase.current = "entered";
      callback();
    }
  };

  const onLeave = (callback) => {
    // so unlike onenter, this is a hijack over set state to call on leave 
    // on leave gets called
    // we store the current state
    // when we call this hook again, we go through the stored on leaves and call them
    // problem: what do you want to achieve in a stale function?
    
    // on leave gets called
    // we call it only if setstate has been called since hook was invoked
    // would have to do something with hijacking the setstate function

    // on leave gets called
    // hijack setstate, any time this gets called we call only the latest function
    if (statePhase.current === "leaving") {
      callback();
    }
  };

  const get = (token) => {
    const tuple = tuplesRef.current.find((tuple) => tuple[0] === token);
    return () => tuple[0]["state"];
  };
  return [onEnter, onLeave] as const;
};

function useToken<T,U>([state,setState]: [T,U]) {
  const [ownState, set] = useState(state);
  const tokenRef = useRef({ hash: 0, state: state });
  const currentHash = tokenRef.current.hash;
  const setter = (args) => {
    if(currentHash !== tokenRef.current.hash){
      console.log('hmm stale call to setState');
      return;
    }
    ++tokenRef.current.hash;
    set(args);
  };
  tokenRef.current.state = state;
  const get = ()=> tokenRef.current.state;
  return [state, setter as U, get, tokenRef] as const;
}

const useTransiate = (status)=> {
  
  const onEnter = (c)=> {
    c();
    // now if state hasnt changed since last time, dont call
  }
  const onLeave = ()=> {
    // now if state has changed since last time, call this, but just once
  }
  const onDone = ()=> {}
  return [onEnter, onLeave, onDone]
}





const Button = (props: ButtonProps) => {
  const display = {
    submitButtonVisible: !props.pending,
    pendingButtonVisible: props.pending,
  };
  const styling = {
    submitButton: {
      all: "inherit",
      visibility: props.pending ? "hidden" : "visible",
    },
    pendingButton: {
      all: "inherit",
      position: "absolute",
      top: 0,
      visibility: !props.pending ? "hidden" : "visible",
    },
  };
  return (
    <Div column {...props} rounded={5} background="--black-dark" padding={15}>
      <Text variant="large" color="white">
        <button onSubmit={() => props.onEvent("submit")} style={styling.submitButton}>
          {props.children}
        </button>
        <Div style={styling.pendingButton}>*</Div>
      </Text>
    </Div>
  );
};

const ButtonDefaults = {
  onEvent: (type: "submit", value?) => {},
  pending: false,
  children: null,
};
type ButtonProps = Partial<typeof ButtonDefaults>;

/**
 *
 * @component
 *
 */
export const Field = React.forwardRef((props: TextFieldPropTypes, ref) => {
  const [status, value, inputProps] = useInput();

  return (
    <Div column gap={5} color="white">
      <Div padding={5}>
        <Text>
          <label htmlFor={props.name} style={{ all: "inherit" }}>
            {props.name}
            {value}
          </label>
        </Text>
        <Div flex={1} right>
          <Icons.AlertCircle size={20} opacity={Number(status === "input invalid")} />
        </Div>
      </Div>
      <Div column height={40} padding={10} background="black" rounded={10}>
        <Text>
          <input
            id={props.name}
            placeholder={props.placeholder}
            style={{ all: "inherit" }}
            required={props.required}
            {...inputProps}
          />
        </Text>
      </Div>
    </Div>
  );
});

const FieldDefaults = {
  id: null,
  name: null as string,
  placeholder: null as string,
  onEvent: (type, value?) => {},
  required: false,
};

Field.defaultProps = FieldDefaults;
type TextFieldPropTypes = typeof FieldDefaults;
type FormElementProps = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;
type InputElementProps = React.HTMLProps<HTMLInputElement>;

// export const Icon = (props: Partial<typeof IconDefaults>) => {
//   const I = Icons[props.name] || null;
//   const size = parseInt(props.size) * 0.5;
//   const color = processCssVar(props.color);
//   const background = processCssVar(props.background);
//   return (
//     <Div
//       data-button
//       width={props.size}
//       height={props.size}
//       background={background}
//       rounded="100%"
//       center
//       middle
//     >
//       {I && <I {...props} size={size} color={color} />}
//     </Div>
//   );
// };

// const IconDefaults = {
//   name: null as keyof typeof Icons,
//   size: 35,
//   color: "white",
//   background: "transparent",
// };

// Icon.defaultProps = IconDefaults;

// /**
//  *
//  * @param props
//  *
//  */
// export const NumberInput = (props: typeof NumberInputDP) => {
//   return (
//     <>
//       <Div data-field column left background="--g1" width={60} rounded={5} padding={5} height={40}>
//         <Label>{props.title}</Label>
//         <LargeText>{props.value}</LargeText>
//       </Div>
//     </>
//   );
// };

// const NumberInputDP = {
//   title: "-" as string,
//   value: 0 as number,
// };

// NumberInput.defaultProps = NumberInputDP;

const useForm = () => {
  const ref = useRef<HTMLFormElement>();
  type status = "initial" | "valid" | "invalid"; //  | "sending" | "sendError" | "sent"

  const [status, setStatus] = useState<status>("initial");

  return [
    status,
    {
      onChange: (event) => {
        event.persist();
        setStatus((status) => {
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
      onSubmit: (event) => {
        event.persist();
        event.preventDefault();
        event.stopPropagation();

        setStatus((status) => {
          switch (status) {
            case "initial":
            case "valid":
              return "sending";
            default:
              return status;
          }
        });
      },
      ref,
    } as FormElementProps,
  ] as const;
};

const useInput = () => {
  const ref = useRef<HTMLInputElement>();
  type status = "initial" | "input valid" | "input invalid";

  const [status, setStatus] = useState<status>("initial");
  const [update] = useUpdateRender();
  const value = ref.current?.type === "checkbox" ? ref.current?.checked : ref.current?.value;
  return [
    status,
    value,
    {
      onChange: (event) => {
        event.persist();
        setStatus((status) => {
          switch (status) {
            case "initial":
            case "input valid":
            case "input invalid":
              // we do this to reflect the ref current value, which is only applied after rerender
              update();
              return ref.current?.checkValidity() ? "input valid" : "input invalid";
            default:
              return status;
          }
        });
      },
      ref,
    } as InputElementProps,
  ] as const;
};

 
type tokenRef = React.MutableRefObject<{
  hash: number;
  state: any;
}>;

function useStatus<S>(initialState) {
  const [state, set] = useState<S>(initialState);
  const tokenRef = useRef({ hash: 0, state: state });
  const setState = (args) => {
    ++tokenRef.current.hash;
    set(args);
  };
  tokenRef.current.state = state;
  return [state, setState, tokenRef] as const;
}

const useEvents = () => {
  return [] as const;
};



const useAddBookmark = (props) => {
  type status = "initial" | "valid" | "invalid" | "sending" | "sendError" | "sent";

  const [status, setStatus] = useToken(useState<status>("initial"));

  const [formStatus, formDelegate] = useForm();

  const [onEnter, onLeave, transition] = useOnTransition(status, setStatus);

  // const [onEvents, mapEvents] = useMapEvents();

  // useOnChange(formStatus, mapEvents("form"));

  switch (status) {
    case "initial":
      switch (formStatus) {
        case "valid":
          setStatus("sending");
          break;
      }
      // first entry, call first time
      onEnter(()=> {

      })

      // first entry, wont call as status hasnt changed
      // second entry, status not changing so not called
      // third entry, now the status has changed, this wont be entrant anyways
      // on third entry, we were aware of the last callback made in previous frame so 
      // call this, we need to know the current state over stale values...?
      
      onLeave(async (from, into, valid) => {
        console.log("a");
      });

      // onEvents((group, event, value) => {
      //   switch (formStatus) {
      //     case "valid":
      //       setStatus("sending");
      //       break;
      //   }
      // });

      break;

    case "sending":
      onEnter(async (valid) => {
        await doWait();
        // if (valid()) setStatus("sent");
      });
      console.log(status);
      // onEnter(status, async (set) => {
      //   await doWait();
      //   console.log(status);
      //   set("sent");
      // });

      // attachEvents(()=> {

      // })

      break;

    default:
  }

  // const useOnLeave(formStatus === "sending", ()=> {

  // })
  return {
    status,
    display: {
      disableSubmit: ["initial", "invalid"].includes(formStatus),
      pending: ["sending"].includes(formStatus),
    },
    styling: {},
    delegate: {
      form: formDelegate,
    },
  };
};
export const CreateBookmarkCard = (props) => {
  const map = useCreateBookmarkCard(props);
  const { display, delegate } = map;
  return (
    <Div background="--black-light" rounded={20} expand column padding={20} gap={10}>
      <form {...delegate.form} autoComplete="off" noValidate>
        <Div column color="white" gap={5}>
          <H variant="regular">Add bookmark</H>
          <Text variant="regular">Where the magic happens.</Text>
        </Div>
        <Div column>
          <Field name="name" placeholder="Enter bookmark name" required />
          <Field name="url" placeholder="Enter url" />
        </Div>
        <Div>
          <Button disabled={display.disableSubmit} pending={display.pending}>
            Add
          </Button>
        </Div>
      </form>
    </Div>
  );
};
