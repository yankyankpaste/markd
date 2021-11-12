import { Listing } from "components/features/Listing";
import { Button } from "components/resource/controls/common";
import { Field } from "components/resource/controls/Field";
import { H, Text } from "components/resource/controls/Text";
import { StorageContext, StorageProvider } from "components/service/StorageContext";
import React, { useContext, useState } from "react";
import { useForm } from "utils/react-utils";
import { Box, Status } from "vendor/misc/Flex";
import Portal from "vendor/misc/Portal";
import { Footer } from "../features/Footer";
import { Heading, HeadingEvents } from "../features/Heading";

/**
 * Listing
 * @component
 *
 */
export const ListingPage = (props: ListingPropTypes) => {
  const map = useListing(props);
  const { status, addStatus } = map;
  return (
    <Box expand background="--background" column flex={1}>
      <Heading onEvent={map.onEvent} />
      {status === "empty" && <EmptyCard />}
      {status === "items" && <Listing items={map.items} />}
      {addStatus === "add" && <AddCard />}
      <Footer />
    </Box>
  );
};

type Status = "initial" | "empty" | "items" | "error";
type AddStatus = "idle" | "add";
type Bookmark = { name: string; url: string };

const useListing = (props: ListingPropTypes) => {
  const [status, setStatus] = useState<Status>("initial");
  const [addStatus, setAddStatus] = useState<AddStatus>("add");

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
      switch (addStatus) {
        case "idle":
          //listed for press
          break;
        case "add":

        // listen for added event, then set to added + items
        default:
      }
      break;

    case "items":
      //listen for close added, set addStatus back to idle
      break;

    case "error":
      break;

    default:
  }
  return {
    status,
    addStatus,
    items: items.filter(item => item.name.includes(filter) || item.url.includes(filter)),
    onEvent: (event: HeadingEvents, meta?) => {
      switch (event) {
        case "press add":
          setAddStatus("add");
          break;
      }
    }
  };
};

const ListingDefaultProps = {
  user: null as string
};
ListingPage.defaultProps = ListingDefaultProps;
type ListingPropTypes = typeof ListingDefaultProps;

const EmptyCard = props => {
  return (
    <Box rounded={10}>
      <H>Create your first item</H>
    </Box>
  );
};

const AddCard = props => {
  const [formStatus, formDelegate, onSubmit] = useForm();

  // onSubmit(values => {
  //   // shout
  //   props.onEvent("press submit");
  // });
  return (
    <Portal expand background="black">
      <Box expand middle center>
        <form {...formDelegate} autoComplete="off" noValidate>
          <Box column background="--primary-light" width={400} gap={20} padding={20} rounded={20}>
            <H variant="large" color="--primary-dark">
              Add internet thing
            </H>

            <Box column flex={1} gap={10}>
              <Field name="name" required></Field>
              <Field name="url"></Field>
            </Box>

            <Box right>
              <Button>Add</Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Portal>
  );
};
