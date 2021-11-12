import React, { useRef, useState } from "react";
import { AlertCircle } from "react-feather";
import { useUpdateRender } from "utils/react-utils";
import { Div } from "vendor/misc/Flex";
import { Text } from "./Text";

export const Button = (props: ButtonProps) => {
  const display = {
    submitButtonVisible: !props.pending,
    pendingButtonVisible: props.pending
  };
  const styling = {
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
  children: null
};
type ButtonProps = Partial<typeof ButtonDefaults>;
