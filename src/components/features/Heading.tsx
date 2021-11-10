import React from "react";
/**
 * Heading
 * @component
 *
 */
export const Heading = (props: HeadingPropTypes) => {
  const map = useHeading(props);
  return (
    <>
      <CreateBookmarkCard />
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
