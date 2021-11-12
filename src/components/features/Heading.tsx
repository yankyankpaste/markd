import { H } from "components/resource/controls/Text";
import React from "react";
import { Box } from "vendor/misc/Box";
import { CreateBookmarkCard } from "./CreateBookmarkCard";

import * as Icons from "react-feather";

/**
 * Heading
 * @component
 *
 */
export const Heading = (props: HeadingPropTypes) => {
  const map = useHeading(props);
  return (
    <Box height={80} middle padding={10} row>
      {/* <Box background="white" rounded={10} padding={10}>
        <Icons.Search size={20} onClick={() => props.onEvent("press search")} />
      </Box> */}

      <Box flex={1} right gap={10}>
        <Box background="white" rounded={10} padding={10}>
          <Icons.PlusCircle size={20} onClick={() => props.onEvent("press add")} />
        </Box>
        <Box background="white" rounded={10} padding={10}>
          <Icons.User size={20} onClick={() => props.onEvent("press account")} />
        </Box>
      </Box>
    </Box>
  );
};

const useHeading = (props: HeadingPropTypes) => {
  const map = {};
  return map;
};
const HeadingDefaultProps = {
  onEvent: (name: HeadingEvents, meta?) => {}
};
Heading.defaultProps = HeadingDefaultProps;
type HeadingPropTypes = typeof HeadingDefaultProps;

export type HeadingEvents = "press search" | "press add" | "press account";
