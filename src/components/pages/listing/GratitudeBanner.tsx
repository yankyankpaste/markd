import { Button } from "components/resource/controls/common";
import { Field } from "components/resource/controls/Field";
import { H } from "components/resource/controls/Text";
import React from "react";
import { ThumbsUp, X } from "react-feather";
import { useForm } from "utils/react-utils";
import { Box } from "vendor/misc/Flex";
import Portal from "vendor/misc/Portal";

/** Singleton Internal Components */
export const GratitudeBanner = props => {
  return (
    <Box width="100%" background="--secondary" padding={20} radius={20} middle>
      <Box flex={1} middle className="bounce" gap={10}>
        <H>Wow, your first bookmark, good job </H>
        <ThumbsUp />
      </Box>
      <Box flex={0} margin="0" onClick={() => props.onEvent("press close thanks")}>
        <X />
      </Box>
    </Box>
  );
};
