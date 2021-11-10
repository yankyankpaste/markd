import { Text } from "components/resource/controls/Text";
import React, { useState } from "react";
import { Div } from "vendor/misc/Flex";
/**
 * Listing
 * @component
 *
 */
export const Listing = (props: ListingPropTypes) => {
  const map = useListing(props);
  return (
    <>
      <Div column gap={5} visible={map.status === "items"}>
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

      <Div column center middle visible={map.status === "empty"}>
        <Text>No bookmarks have been created yet</Text>
        {/* create bookmark button */}
      </Div>
    </>
  );
};

const useListing = (props: ListingPropTypes) => {
  type Status = "initial" | "empty" | "items" | "error";
  type Bookmark = { name: string; url: string };

  const [status, setStatus] = useState<Status>("initial");
  const [items, setItems] = useState<Bookmark[]>([]);

  switch (status) {
    case "initial":
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
