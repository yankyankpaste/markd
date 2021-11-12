import React, { useRef, useState } from "react";
import { AlertCircle } from "react-feather";
import { useUpdateRender } from "utils/react-utils";
import { Box } from "vendor/misc/Flex";
import { Text } from "./Text";
type status = "initial" | "input valid" | "input invalid";

/**
 *
 * @component
 *
 */
export const Field = React.forwardRef((props: TextFieldPropTypes, inRef) => {
  const [status, setStatus] = useState<status>("initial");
  const ref = useRef<HTMLInputElement>();

  const value = ref.current?.type === "checkbox" ? ref.current?.checked : ref.current?.value;

  const [update] = useUpdateRender();

  return (
    <Box column gap={5}>
      <Box padding={5}>
        <Text>
          <label htmlFor={props.name} style={{ all: "inherit" }}>
            {props.name}
          </label>
        </Text>
        <Box flex={1} right>
          <AlertCircle size={20} opacity={Number(status === "input invalid")} />
        </Box>
      </Box>
      <Box column height={40} padding={10} background="white" rounded={10}>
        <Text>
          <input
            id={props.name}
            ref={ref}
            placeholder={props.placeholder}
            style={{ all: "inherit", width: "100%" }}
            required={props.required}
            onChange={event => {
              event.persist();
              setStatus(status => {
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
            }}
          />
        </Text>
      </Box>
    </Box>
  );
});

const FieldDefaults = {
  id: null,
  name: "Blank" as string,
  placeholder: "Enter value" as string,
  onEvent: (type, value?) => {},
  required: false
};

Field.defaultProps = FieldDefaults;
type TextFieldPropTypes = Partial<typeof FieldDefaults>;
