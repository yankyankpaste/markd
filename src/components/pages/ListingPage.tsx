import { Listing } from "components/features/Listing";
import { H, Text } from "components/resource/controls/Text";
import { StorageContext, StorageProvider } from "components/service/StorageContext";
import React, { useContext, useState } from "react";
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
  const { status } = map;
  return (
    <Div expand background="--background" column>
      <Heading />
      {status === "empty" && <EmptyCard />}
      {status === "items" && <Listing items={map.items} />}
      <Footer />
    </Div>
  );
};

const EmptyCard = props => {
  return (
    <Div rounded={10}>
      <H>Create your first item</H>
    </Div>
  );
};

const useListing = (props: ListingPropTypes) => {
  type Status = "initial" | "empty" | "items" | "error";
  type Bookmark = { name: string; url: string };
  type PaginationStatus = "on first" | "at end" | "in middle";

  const [status, setStatus] = useState<Status>("initial");
  const [items, setItems] = useState<Bookmark[]>([]);
  const [filter, setFilter] = useState<string>("");
  const storage = useContext(StorageContext);

  switch (status) {
    case "initial":
      const bookmarks = storage.command("get bookmarks for user", props.user);
      setItems(bookmarks);

      if (bookmarks.length) setStatus("items");
      else setStatus("empty");
      break;

    case "empty":
      break;

    case "items":
      break;

    case "error":
      break;

    default:
  }
  return {
    status,
    items: items.filter(item => item.name.includes(filter) || item.url.includes(filter))
  };
};

const ListingDefaultProps = {
  user: null as string
};
ListingPage.defaultProps = ListingDefaultProps;
type ListingPropTypes = typeof ListingDefaultProps;
