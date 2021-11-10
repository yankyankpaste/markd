import React from "react";
/**
 * Footer
 * @component
 *
 */
export const Footer = (props: FooterPropTypes) => {
  const map = useFooter(props);
  return <></>;
};

const useFooter = (props: FooterPropTypes) => {
  const map = {};
  return map;
};

const FooterDefaultProps = {};
Footer.defaultProps = FooterDefaultProps;
type FooterPropTypes = typeof FooterDefaultProps;
