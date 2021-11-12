import React, { useRef, useState } from "react";
import { AlertCircle } from "react-feather";
import { useUpdateRender } from "utils/react-utils";
import { Box } from "vendor/misc/Box";
import { Text } from "./Text";

export const Button = (props: ButtonProps) => {
  const styling = {
    box: {
      background: props.variant === "primary" ? "--black-dark" : "transparent",
      color: props.variant === "primary" ? "white" : "--black-dark"
    },
    submitButton: {
      all: "inherit",
      visibility: props.pending ? "hidden" : "visible"
    },
    pendingButton: {
      all: "inherit",
      position: "absolute",
      top: 0,
      visibility: !props.pending ? "hidden" : "visible"
    }
  };
  const { onEvent, pending, ...rest } = props;
  return (
    <Box
      flex={0}
      column
      {...rest}
      rounded={10}
      background={styling.box.background}
      color={styling.box.color}
      padding={15}
    >
      <Text variant="large">
        <button
          type={props.type}
          onSubmit={() => props.onEvent("submit")}
          onClick={() => props.onEvent("click")}
          style={styling.submitButton}
        >
          {props.children}
        </button>
        <Box style={styling.pendingButton}>*</Box>
      </Text>
    </Box>
  );
};

const ButtonDefaults = {
  variant: "primary" as "primary" | "secondary",
  onEvent: (type: "submit" | "click", value?) => {},
  pending: false,
  children: null,
  type: "button"
};
Button.defaultProps = ButtonDefaults;
type ButtonProps = Partial<typeof ButtonDefaults>;
