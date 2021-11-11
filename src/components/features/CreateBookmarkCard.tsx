import React, { useRef, useState } from "react";
import { H, SpecCard, Text } from "components/resource/controls/Text";
import { useOnce } from "utils/react-utils";
import { Div } from "vendor/misc/Flex";
import { AsciiLogo } from "logo";

export const CreateBookmarkCard = (props) => {
  const map = useCreateBookmarkCard(props);
  const { display, delegate } = map;
  return (
    <Div
      background="--black-light"
      rounded={20}
      expand
      column
      padding={20}
      gap={10}
    >
      <form {...delegate.form} autoComplete="off" noValidate>
        <Div column color="white" gap={5}>
          <H variant="regular">Add bookmark</H>
          <Text variant="regular">Where the magic happens.</Text>
        </Div>
        <Div column>{/* fields */}</Div>
        <Div>{/* button */}</Div>
      </form>
    </Div>
  );
};

const useCreateBookmarkCard = (props) => {
  type status = "initial" | "ready to send" | "invalid" | "final";
  type formStatus = "initial" | "valid" | "invalid"; //  | "sending" | "sendError" | "sent"

  const [formStatus, setFormStatus] = useState<formStatus>("initial");
  const [status, setStatus] = useState<status>("initial");
  const [onEvent, onEvents, mapEvents] = useMapEvents();

  switch (status) {
    case "initial":
      switch (formStatus) {
        case "valid":
          setStatus("ready to send");
          break;
      }
      break;

    case "ready to send":
      onEvent((name, meta) => {
        switch (name) {
          case "submit":
            storeBookmark(meta);
            setStatus("final");
            break;
        }
      });
      break;
    case "final":
      break;

    default:
  }

  const storeBookmark = (meta) => {
    const fields = meta as { url: string; name: string };
    localStorage.setItem(fields.name, fields.url);
    setStatus("stored");
  };

  return {
    status,
    display: {
      disableSubmit: ["initial", "invalid"].includes(formStatus),
      pending: ["sending"].includes(formStatus),
    },
    styling: {},
    delegate: {
      form: {
        onSubmit: () => mapEvents("from form")("submit"),
      },
    },
  };
};
