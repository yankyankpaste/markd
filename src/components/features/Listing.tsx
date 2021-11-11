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
  return (
    <>
      <Div expand column>
        <Div column gap={10} padding={30} expand>
          {props.items.map(bookmark => (
            <Div key={bookmark} row background="--grey" rounded={10} padding={10}>
              {/* name */}
              <Div flex={1} padding={20} rounded={10} column>
                <H variant="large">
                  <a display={{ all: "unset" }}>{bookmark.name}</a>
                </H>
                <Text variant="larger">
                  <a display={{ all: "unset" }}>{bookmark.url}</a>
                </Text>
              </Div>

              {/* actions */}
              <Div bottom>
                <Div padding="10px 20px" gap={10} rounded={20}>
                  {/* delete */}
                  <Div onClick={() => props.onEvent("press delete bookmark", bookmark)}>
                    <Icons.Trash2 />
                  </Div>
                  {/* share */}

                  <a href={bookmark.url} target="_blank" display={{ all: "unset" }}>
                    <Icons.ExternalLink />
                  </a>

                  {/* favourite */}
                </Div>
              </Div>
            </Div>
          ))}
        </Div>

        <Div style={{ position: "absolute", bottom: 0, width: "100%" }}>
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
      </Div>
    </>
  );
};

const useListing = (props: ListingPropTypes) => {
  type Status = "initial" | "empty" | "items" | "error";
  return {};
};

const ListingDefaultProps = {
  items: [] as Bookmark[],
  onEvent: (name, value) => {}
};
Listing.defaultProps = ListingDefaultProps;
type ListingPropTypes = typeof ListingDefaultProps;
