import { H, Text } from "components/resource/controls/Text";
import { Bookmark } from "components/service/StorageContext";
import React, { useState } from "react";
import { Box, Status } from "vendor/misc/Flex";
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
      <Box column flex={1} gap={10} padding={30} style={{ overflow: "scroll" }}>
        {props.items.map(bookmark => (
          <Box key={bookmark.url} column background="--grey" rounded={10} padding={10}>
            {/* name */}

            <Box flex={1} padding={20} rounded={10} column>
              <H variant="regular">
                <a display={{ all: "unset" }}>{bookmark.name}</a>
              </H>
              <Text variant="regular">
                <a display={{ all: "unset" }}>{bookmark.url}</a>
              </Text>
            </Box>

            {/* actions */}

            <Box bottom right>
              <Box padding="5px 20px" gap={10} rounded={20}>
                {/* delete */}

                <Box onClick={() => props.onEvent("press delete bookmark", bookmark)}>
                  <Icons.Trash2 />
                </Box>

                {/* open */}

                <a href={bookmark.url} target="_blank" display={{ all: "unset" }}>
                  <Icons.ExternalLink />
                </a>

                {/* favourite, share....  */}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      <Box height={80}>
        <Box center expand padding={10}>
          <Box background="white" rounded={20} padding="10px 10px" center gap={10}>
            <Box disabled middle center background="--grey" padding={20} rounded={20}>
              <Icons.ArrowLeft />
            </Box>
            {/* Page slot 1 */}
            <Box middle center background="--grey" padding={20} rounded={20} minWidth={60}>
              <Text variant="large">1</Text>
            </Box>
            {/* Page slot 2 */}
            <Box hidden middle center background="--grey" padding={20} rounded={20}>
              <Text variant="large">1</Text>
            </Box>
            {/* Page slot 3  */}
            <Box hidden middle center background="--grey" padding={20} rounded={20}>
              <Text variant="large">1</Text>
            </Box>
            {/* next prev arrows */}
            <Box disabled middle center background="--grey" padding={20} rounded={20}>
              <Icons.ArrowRight />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

const ListingDefaultProps = {
  items: [] as Bookmark[],
  onEvent: (name, value) => {}
};
Listing.defaultProps = ListingDefaultProps;
type ListingPropTypes = typeof ListingDefaultProps;
