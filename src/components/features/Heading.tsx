import { H } from "components/resource/controls/Text";
import React from "react";
import { Div } from "vendor/misc/Flex";
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
    <Div height={80} middle padding={10} row>
      {/* <Div background="white" rounded={10} padding={10}>
        <Icons.Search size={20} onClick={() => props.onEvent("press search")} />
      </Div> */}

      <Div flex={1} right gap={10}>
        <Div background="white" rounded={10} padding={10}>
          <Icons.PlusCircle size={20} onClick={() => props.onEvent("press add")} />
        </Div>
        <Div background="white" rounded={10} padding={10}>
          <Icons.User size={20} onClick={() => props.onEvent("press account")} />
        </Div>
      </Div>
    </Div>
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
