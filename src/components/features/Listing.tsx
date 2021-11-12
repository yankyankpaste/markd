import { H, Text } from "components/resource/controls/Text";
import { Bookmark } from "components/service/StorageContext";
import React, { useState } from "react";
import { Div, Status } from "vendor/misc/Flex";
import { Footer } from "./Footer";
import { Heading } from "./Heading";

import * as Icons from "react-feather";

/**
 * Listing
 * @component
 *
 */
export const Listing = (props: ListingPropTypes) => {
  // type PaginationStatus = "on first" | "at end" | "in middle";

  return (
    <>
      <Div column flex={1} gap={10} padding={30} style={{ overflow: "scroll" }}>
        {props.items.map(bookmark => (
          <Div key={bookmark.url} column background="--grey" rounded={10} padding={10}>
            {/* name */}

            <Div flex={1} padding={20} rounded={10} column>
              <H variant="regular">
                <a display={{ all: "unset" }}>{bookmark.name}</a>
              </H>
              <Text variant="regular">
                <a display={{ all: "unset" }}>{bookmark.url}</a>
              </Text>
            </Div>

            {/* actions */}

            <Div bottom right>
              <Div padding="5px 20px" gap={10} rounded={20}>
                {/* delete */}

                <Div onClick={() => props.onEvent("press delete bookmark", bookmark)}>
                  <Icons.Trash2 />
                </Div>

                {/* open */}

                <a href={bookmark.url} target="_blank" display={{ all: "unset" }}>
                  <Icons.ExternalLink />
                </a>

                {/* favourite, share....  */}
              </Div>
            </Div>
          </Div>
        ))}
      </Div>

      <Div height={80}>
        <Div center expand padding={10}>
          <Div background="white" rounded={20} padding="10px 10px" center gap={10}>
            <Div disabled middle center background="--grey" padding={20} rounded={20}>
              <Icons.ArrowLeft />
            </Div>
            {/* Page slot 1 */}
            <Div middle center background="--grey" padding={20} rounded={20} minWidth={60}>
              <Text variant="large">1</Text>
            </Div>
            {/* Page slot 2 */}
            <Div hidden middle center background="--grey" padding={20} rounded={20}>
              <Text variant="large">1</Text>
            </Div>
            {/* Page slot 3  */}
            <Div hidden middle center background="--grey" padding={20} rounded={20}>
              <Text variant="large">1</Text>
            </Div>
            {/* next prev arrows */}
            <Div disabled middle center background="--grey" padding={20} rounded={20}>
              <Icons.ArrowRight />
            </Div>
          </Div>
        </Div>
      </Div>
    </>
  );
};

const ListingDefaultProps = {
  items: [] as Bookmark[],
  onEvent: (name, value) => {}
};
Listing.defaultProps = ListingDefaultProps;
type ListingPropTypes = typeof ListingDefaultProps;
