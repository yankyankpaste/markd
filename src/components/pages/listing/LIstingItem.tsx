import { H, Text } from "components/resource/controls/Text";
import { Bookmark } from "components/service/StorageContext";
import React, { useState } from "react";
import { Box, Status } from "vendor/misc/Flex";
import { Footer } from "../../features/Footer";
import { Heading } from "../../features/Heading";

import * as Icons from "react-feather";
import { Button } from "components/resource/controls/common";

export const ListingItem = props => {
  const map = useListingItem(props);
  const { content, display, onEvent } = map;
  const { bookmark } = content;
  return (
    <Box stretch column gap={5} stretchItems disabled={map.display.disable}>
      <Box aria="bookmark card" column background={display.backgroundColor} rounded={10} padding={5} stretch>
        <Box flex={1} padding={10} rounded={10} column>
          <H variant="small">
            <a display={{ all: "unset" }}>{bookmark.name}</a>
          </H>
          <Text variant="small">
            <a display={{ all: "unset" }}>{bookmark.url}</a>
          </Text>
        </Box>
        <Box aria="actions" bottom right stretch>
          <Box padding="5px 20px" gap={10} rounded={20}>
            <Box name="delete icon" onClick={() => onEvent("press delete bookmark", bookmark)} title="delete bookmark">
              <Icons.Trash2 size={20} />
            </Box>
            <a href={bookmark.url} target="_blank" display={{ all: "unset" }} title="link to site">
              <Icons.ExternalLink size={20} />
            </a>
          </Box>
        </Box>
      </Box>
      <Box aria="delete card" visible={display.deletePrompt}>
        <Box background="--secondary" flex={1} height={100} rounded={20} padding={20} column>
          <H variant="small">Remove this bookmark?</H>
          <Box stretch right gap={5}>
            <Button variant="secondary" onClick={() => onEvent("press cancel delete", bookmark)}>
              No way
            </Button>
            <Button onClick={() => onEvent("press confirm delete", bookmark)}>Remove</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

type Status = "initial" | "delete prompt" | "deleting";

const useListingItem = props => {
  const [status, setStatus] = useState<Status>("initial");
  const onEvent = (name, value) => {
    switch (name) {
      case "press delete bookmark":
        setStatus("delete prompt");
        break;
      case "press confirm delete":
        setStatus("deleting");
        props.onEvent("user confirm delete bookmark", props.bookmark);
        break;

      case "press cancel delete":
        setStatus("initial");
        break;
    }
  };
  return {
    display: {
      disable: status === "deleting",
      backgroundColor: status === "delete prompt" ? "--secondary-light" : "--grey",
      deletePrompt: status === "delete prompt"
    },
    content: {
      bookmark: props.bookmark
    },
    onEvent
  };
};

const defaultProps = {
  bookmark: null as Bookmark,
  onEvent: (name, value) => {}
};
ListingItem.defaultProps = defaultProps;
