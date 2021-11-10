import React, { useState } from "react";
import { H, SpecCard, Text } from "resource/controls/Text";
import { useOnce } from "utils/react-utils";
import { Div } from "vendor/misc/Flex";
import "./App.css";
import { AsciiLogo } from "resource/logo";

export const CreateBookmarkCard = props => {
  const map = useCreateBookmarkCard(props);
  const { display, delegate } = map;
  return (
    <Div background="--black-light" rounded={20} expand column padding={20} gap={10}>
      <form {...delegate.form} autoComplete="off" noValidate>
        <Div column color="white" gap={5}>
          <H variant="regular">Add bookmark</H>
          <Text variant="regular">Where the magic happens.</Text>
        </Div>
        <Div column></Div>
        <Div></Div>
      </form>
    </Div>
  );
};

const useCreateBookmarkCard = props => {
  type status = "initial" | "valid" | "invalid" | "sending" | "sendError" | "sent";

  type formStatus = "initial" | "valid" | "invalid"; //  | "sending" | "sendError" | "sent"

  const [formStatus, setFormStatus] = useState<formStatus>("initial");

  const [status, setStatus] = useState<status>("initial");

  switch (status) {
    case "initial":
      switch (formStatus) {
        case "valid":
          setStatus("sending");
          break;
      }

      break;

    case "sending":
      break;

    default:
  }

  return {
    status,
    display: {
      disableSubmit: ["initial", "invalid"].includes(formStatus),
      pending: ["sending"].includes(formStatus)
    },
    styling: {},
    delegate: {
      form: {}
    }
  };
};
