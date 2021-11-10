import React from "react";
import { CreateBookmarkCard } from "./CreateBookmarkCard";
/**
 * Heading
 * @component
 *
 */
export const Heading = (props: HeadingPropTypes) => {
  const map = useHeading(props);
  return (
    <>
      {/* App Title */}
      <CreateBookmarkCard />
      {/* if pages... navigation? */}
    </>
  );
};

const useHeading = (props: HeadingPropTypes) => {
  const map = {};
  return map;
};

const HeadingDefaultProps = {};
Heading.defaultProps = HeadingDefaultProps;
type HeadingPropTypes = typeof HeadingDefaultProps;
