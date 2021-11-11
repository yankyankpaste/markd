import { Listing } from "components/features/Listing";
import { Text } from "components/resource/controls/Text";
import React, { useState } from "react";
import { Div, Status } from "vendor/misc/Flex";
import { Footer } from "../features/Footer";
import { Heading } from "../features/Heading";
/**
 * Listing
 * @component
 *
 */
export const ListingPage = (props: ListingPropTypes) => {
  const map = useListing(props);
  return (
    <Div expand background="--background" column>
      <Heading />
      <Listing />
      <Footer />
    </Div>
  );
};

const useListing = (props: ListingPropTypes) => {
  type Status = "initial" | "empty" | "items" | "error";
  type Bookmark = { name: string; url: string };
  type PaginationStatus = "on first" | "at end" | "in middle";

  const [status, setStatus] = useState<Status>("initial");
  const [items, setItems] = useState<Bookmark[]>([]);
  const [filteredItems, setFilteredItems] = useState<Bookmark[]>([]);

  // switch (status) {
  //   case "initial":
  //     // feature: if search param is added, determine selected or current page...
  //     new Promise(resolve => {
  //       const storage = localStorage.getItem("bookmarks");
  //       const bookmarks = JSON.parse(storage);
  //       setItems(bookmarks);

  //       resolve(bookmarks);
  //     })
  //       .then(bookmarks => {
  //         // apply filter here???
  //         const filter = bookmarks;
  //         setFilteredItems(filter);
  //         filter.length ? setStatus("items") : setStatus("empty");
  //         // filter out bookmarks from search??
  //       })
  //       .catch(e => {
  //         setStatus("error");
  //       });

  //     break;

  //   case "empty":
  //     // await for localstorage update... need hook for this
  //     if (filteredItems.length > 0) {
  //       setStatus("items");
  //     }
  //     break;

  //   case "items":
  //     if (filteredItems.length === 0) {
  //       setStatus("empty");
  //     }
  //     break;

  //   case "error":
  //     // fatal, assuming only at this phase localstorage is unparseable...
  //     // ... only improvement could be to wipe local storage and reset
  //     break;

  //   default:
  // }
  return {
    status,
    items
  };
};

const ListingDefaultProps = {};
Listing.defaultProps = ListingDefaultProps;
type ListingPropTypes = typeof ListingDefaultProps;
