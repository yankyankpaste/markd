import React, { useRef, useState } from "react";
import { AlertCircle } from "react-feather";
import { useUpdateRender } from "utils/react-utils";
import { Box } from "vendor/misc/Box";
import { Text } from "./Text";
type status = "initial" | "input valid" | "input invalid";

/**
 * Field component
 * @component
 *
 */
export const Field = React.forwardRef((props: TextFieldPropTypes, inRef) => {
  const [status, setStatus] = useState<status>("initial");
  const ref = useRef<HTMLInputElement>();
  const [update] = useUpdateRender();

  const value = ref.current?.type === "checkbox" ? ref.current?.checked : ref.current?.value;
  const showHint = props.hintMessage && status === "input invalid" && ref.current.value?.length > 12;

  const showAlert = props.required || props.pattern;
  const alertColor = status === "input invalid" ? "var(--error)" : "black";
  const alertTooltip = status === "input invalid" ? props.hintMessage : "Hey this is a required field";
  return (
    <Box column gap={5}>
      <Box stretch>
        <Text>
          <label htmlFor={props.name} style={{ all: "inherit" }}>
            {props.name}
          </label>
        </Text>
        <Box flex={1} right visible={showAlert} title={alertTooltip}>
          <AlertCircle size={20} color={alertColor} />
        </Box>
      </Box>
      <Box column minWidth={250} height={40} padding={10} middle background="white" rounded={10}>
        <Text stretch>
          <input
            id={props.name}
            ref={ref}
            name={props.name}
            placeholder={props.placeholder}
            style={{ width: "100%", height: 40 }}
            required={props.required}
            type={props.type}
            pattern={props.pattern}
            onChange={event => {
              event.persist();
              setStatus(status => {
                switch (status) {
                  case "initial":
                  case "input valid":
                  case "input invalid":
                    update(); // we do this to reflect the ref current value, which is only applied after rerender
                    return ref.current?.checkValidity() ? "input valid" : "input invalid";
                  default:
                    return status;
                }
              });
            }}
          />
        </Text>
      </Box>
      <Box visible={showHint} background="--primary-lighter" rounded={20} padding={10}>
        <Text variant="regular" color="--primary-dark">
          {props.hintMessage}
        </Text>
      </Box>
    </Box>
  );
});

const FieldDefaults = {
  id: null,
  name: "Blank" as string,
  type: "text",
  pattern: null,
  placeholder: "Enter value" as string,
  onEvent: (type, value?) => {},
  required: false,
  hintMessage: null as string
};

Field.defaultProps = FieldDefaults;
type TextFieldPropTypes = Partial<typeof FieldDefaults>;
