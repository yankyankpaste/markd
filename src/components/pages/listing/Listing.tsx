import { H, Text } from "components/resource/controls/Text";
import { Bookmark } from "components/service/StorageContext";
import React, { useEffect, useState } from "react";
import { Box, Status } from "vendor/misc/Box";
import { Footer } from "../../features/Footer";
import { Heading } from "../../features/Heading";

import * as Icons from "react-feather";
import { Button } from "components/resource/controls/common";
import { ListingItem } from "./LIstingItem";
import { useMapEvents, usePagination } from "utils/react-utils";

/**
 * Listing
 * @component
 *
 */
export const Listing = (props: ListingPropTypes) => {
  const map = useListing(props);
  return (
    <>
      <Box column stretch flex={1} gap={10} padding={30} style={{ overflow: "scroll" }}>
        {map.contents.itemsForPage.map(bookmark => (
          <ListingItem key={bookmark.date} bookmark={bookmark} onEvent={props.onEvent} />
        ))}
      </Box>

      <Box aria="pagination" height={80} stretch>
        <Box flex={1} center expand middle>
          <Box background="white" middle gap={10} padding={10} rounded={10} style={{ userSelect: "none" }}>
            <Box
              aria="back"
              disabled={map.display.disablePrevious}
              middle
              center
              background="--grey"
              padding={10}
              rounded={10}
              height={40}
              onClick={() => map.callbacks.previousPage()}
            >
              <Icons.ArrowLeft size={20} />
            </Box>
            {map.contents.pageRange.map(page => (
              <Box
                aria="page"
                key={page}
                middle
                center
                background={map.display.activePageBackground(page)}
                padding={10}
                rounded={10}
                minWidth={50}
                height={40}
                onClick={() => map.callbacks.setPage(page)}
              >
                <Text>{page}</Text>
              </Box>
            ))}

            <Box
              aria="forward"
              disabled={map.display.disableNext}
              middle
              center
              background="--grey"
              padding={10}
              rounded={10}
              height={40}
              onClick={() => map.callbacks.nextPage()}
            >
              <Icons.ArrowRight size={20} />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

const useListing = (props: ListingPropTypes) => {
  const [itemsForPage, currentPage, pageRange, lastPage, nextPage, previousPage, setPage] = usePagination(props.items);

  return {
    contents: {
      pageRange,
      itemsForPage
    },
    callbacks: {
      nextPage,
      previousPage,
      setPage
    },
    display: {
      disablePrevious: currentPage === 1,
      disableNext: currentPage === lastPage,
      activePageBackground(page) {
        return page === currentPage ? "--primary" : "--grey";
      }
    }
  };
};
const ListingDefaultProps = {
  items: [] as Bookmark[],
  onEvent: (name, value) => {}
};
Listing.defaultProps = ListingDefaultProps;
type ListingPropTypes = typeof ListingDefaultProps;
