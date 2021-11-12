import React, { useEffect } from "react";
import { cssVar } from "utils/utils";
import Box from "vendor/misc/Flex";

export const H = ({ styles = {}, variant = "regular" as keyof typeof hStyles, ...rest }) => {
  const s = hStyles[variant] || {};
  return <h1 style={{ ...s, ...styles, color: cssVar(rest.color) }}>{rest.children}</h1>;
};

const hStyles = {
  regular: { font: "var(--heading)", letterSpacing: -1 },
  large: { font: "var(--heading-large)", letterSpacing: -1 },
  larger: { font: "var(--heading-larger)", letterSpacing: -1 },
  small: { font: "var(--heading-small)", letterSpacing: -0.5 },
  smaller: { font: "var(--heading-smaller)" }
};

export const Text = ({ styles = {}, variant = "regular" as keyof typeof textStyles, ...rest }) => {
  const s = textStyles[variant] || {};
  s.color = cssVar(rest.color) || "auto";
  return (
    <Box {...rest} style={{ ...s, ...styles }}>
      {rest.children}
    </Box>
  );
};

const textStyles = {
  regular: { font: "var(--text)" },
  large: { font: "var(--text-large)" },
  larger: { font: "var(--text-larger)" },
  small: { font: "var(--text-small)" },
  smaller: { font: "var(--text-smaller)" }
};

export const SpecCard = props => {
  return (
    <Box rounded={20} background="--black" width={400} height={500} column padding={30} gap={30} {...props}>
      <H variant="regular" color="white">
        {props.name}
      </H>
      {props.children}
    </Box>
  );
};
