import { Text } from "components/resource/controls/Text";
import React, { useState } from "react";
import { Div, Status } from "vendor/misc/Flex";
/**
 * Listing
 * @component
 *
 */
export const Listing = (props: ListingPropTypes) => {
  const map = useListing(props);
  return (
    <>
      <Status if={map.status === "items"}>
        <Div>
          <Div column gap={10}>
            {/* ideally pop this into a two col */}
            {map.items.map(bookmark => (
              <Div row>
                {/* name */}
                <Div flex={1}>
                  <Text>
                    <a display={{ all: "unset" }}>{bookmark.name}</a>
                  </Text>
                </Div>

                {/* actions */}
                <Div>
                  {/* delete */}
                  {/* share */}
                  {/* favourite */}
                </Div>
              </Div>
            ))}
          </Div>

          <Div data-pagination>
            {/* 1,2,3,4 list */}
            {/* next prev arrows */}
          </Div>
        </Div>
      </Status>

      <Status if={map.status === "empty"}>
        <Div column center middle>
          <Text>No bookmarks have been created yet</Text>
          {/* create bookmark button */}
        </Div>
      </Status>

      <Status if={map.status === "error"}>
        <Div column center middle>
          <Text>No bookmarks have been created yet</Text>
          {/* create bookmark button */}
        </Div>
      </Status>
    </>
  );
};

const useListing = (props: ListingPropTypes) => {
  type Status = "initial" | "empty" | "items" | "error";
  type Bookmark = { name: string; url: string };
  type PaginationStatus = "on first" | "at end" | "in middle";

  const [status, setStatus] = useState<Status>("initial");
  const [items, setItems] = useState<Bookmark[]>([]);

  switch (status) {
    case "initial":
      // feature: if search param is added, determine selected or current page...
      try {
        const storage = localStorage.getItem("bookmarks");
        const bookmarks = JSON.parse(storage);
        setItems(bookmarks);
        bookmarks.length ? setStatus("items") : setStatus("empty");
      } catch (e) {
        setStatus("error");
      }
      break;

    case "empty":
      // await for localstorage update... need hook for this
      if (items.length > 0) {
        setStatus("items");
      }
      break;

    case "items":
      if (items.length === 0) {
        setStatus("empty");
      }
      break;

    case "error":
      // fatal, assuming only at this phase localstorage is unparseable...
      // ... only improvement could be to wipe local storage and reset
      break;

    default:
  }
  return {
    status,
    items
  };
};

const ListingDefaultProps = {};
Listing.defaultProps = ListingDefaultProps;
type ListingPropTypes = typeof ListingDefaultProps;
