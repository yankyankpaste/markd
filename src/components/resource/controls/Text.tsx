import React, { useEffect } from "react";
import { cssVar } from "utils/utils";
import Box from "vendor/misc/Flex";

export const H = ({ styles = {}, variant = "regular" as keyof typeof hStyles, ...rest }) => {
  const s = hStyles[variant] || {};
  return <h1 style={{ ...s, ...styles, color: cssVar(rest.color) }}>{rest.children}</h1>;
};

const hStyles = {
  regular: { font: "var(--heading)" },
  large: { font: "var(--heading-large)" },
  larger: { font: "var(--heading-larger)" },
  small: { font: "var(--heading-small)" },
  smaller: { font: "var(--heading-smaller)" }
};

export const Text = ({ styles = {}, variant = "regular" as keyof typeof textStyles, ...rest }) => {
  const s = textStyles[variant] || {};
  s.color = cssVar(rest.color) || "auto";
  return <div style={{ ...s, ...styles }}>{rest.children}</div>;
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
