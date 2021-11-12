import { StorageContext } from "components/service/StorageContext";
import React, { useContext, useState } from "react";
import { useMapEvents } from "utils/react-utils";
import { Box, Status } from "vendor/misc/Box";
import { Heading } from "../../features/Heading";
import { CreateCard } from "./CreateCard";
import { GratitudeBanner } from "./GratitudeBanner";
import { Listing } from "./Listing";
import { NoBookmarks } from "./NoBookmarks";

type ListingPropTypes = typeof ListingDefaults;
type Status = "initial" | "empty" | "have bookmarks" | "reload bookmarks" | "error";
type AddStatus = "idle" | "creating" | "show gratitute";

export const ListingPage = (props: ListingPropTypes) => {
  const { display, content, mapEvents } = useListingPage(props);
  return (
    <Box expand background="--background" column flex={1}>
      <Heading onEvent={mapEvents("heading")} />
      {display.gratitude && <GratitudeBanner onEvent={mapEvents("banner")} />}
      {display.noBookmarks && <NoBookmarks onEvent={mapEvents("empty")} />}
      {display.listing && <Listing onEvent={mapEvents("listing")} items={content.filteredList} />}
      {display.createCard && <CreateCard onEvent={mapEvents("bookmark")} />}
    </Box>
  );
};

// nb: This switch statement helps with managing statuses and checking upon events only on a specific status combination...
// almost same as reducer pattern but with extra statemachine (async) bonuses
const useListingPage = (props: ListingPropTypes) => {
  const [status, setStatus] = useState<Status>("initial");
  const [createStatus, setCreateStatus] = useState<AddStatus>("idle");
  const [onEvent, onEvents, mapEvents] = useMapEvents();
  const [items, setItems] = useState<Bookmark[]>([]);
  const [filter, setFilter] = useState<string>("");
  const { status: storageStatus, command, onUpdate } = useContext(StorageContext);
  const filteredList = items.filter(item => item.name.includes(filter) || item.url.includes(filter));

  switch (status) {
    case "initial": {
      switch (storageStatus) {
        case "initialised": {
          // Extract bookmarks from store, set and determine empty or with items status
          const bookmarks = command("get bookmarks for user", props.user);
          setItems(bookmarks);
          if (bookmarks.length) setStatus("have bookmarks");
          else setStatus("empty");
        }
      }
      break;
    }

    case "empty":
    case "have bookmarks":
      switch (createStatus) {
        case "idle":
          onEvent(event => {
            switch (event) {
              case "press add":
                setCreateStatus("creating");
                break;
            }
          });
          break;

        case "creating":
          onEvent((event, meta?) => {
            switch (event) {
              case "press submit":
                const map = { name: meta["Bookmark name"], url: meta["Web address"] };
                const bookmarks = command("add bookmark", { user: props.user, value: map });
                setItems(bookmarks);
                bookmarks.length ? setStatus("have bookmarks") : setStatus("empty");
                status === "empty" ? setCreateStatus("show gratitute") : setCreateStatus("idle");
                break;
              case "press cancel create":
              case "press background":
                setCreateStatus("idle");
                break;
            }
          });

          break;

        case "show gratitute":
          onEvent(event => {
            switch (event) {
              case "press close thanks":
                setCreateStatus("idle");
                break;
            }
          });
          break;
        default:
      }

      break;

    case "reload bookmarks":
      {
        const bookmarks = command("get bookmarks for user", props.user);
        setItems(bookmarks);
        if (bookmarks.length) setStatus("have bookmarks");
        else setStatus("empty");
      }
      break;

    case "error":
      break;

    default:
  }

  onEvent((event, meta?) => {
    switch (event) {
      case "user confirm delete bookmark":
        const items = command("delete bookmark", { user: props.user, value: meta });
        if (items.length) setStatus("have bookmarks");
        else setStatus("empty");
        setCreateStatus("idle");
        setItems(items);
        break;
    }
  });

  return {
    mapEvents,
    display: {
      gratitude: createStatus === "show gratitute",
      listing: status === "have bookmarks",
      createCard: createStatus === "creating",
      noBookmarks: status === "empty"
    },
    content: {
      filteredList
    }
  };
};

type Bookmark = { name: string; url: string; date: Date };

const ListingDefaults = {
  user: null as string
};

ListingPage.defaultProps = ListingDefaults;
