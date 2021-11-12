import { Button } from "components/resource/controls/common";
import { Field } from "components/resource/controls/Field";
import { H, Text } from "components/resource/controls/Text";
import React from "react";
import { useForm } from "utils/react-utils";
import { Box } from "vendor/misc/Flex";
import Portal from "vendor/misc/Portal";

export const NoBookmarks = props => {
  return (
    <Box expand middle center>
      <Box flex={0} column background="white" width={300} gap={20} padding={20} rounded={20}>
        <Box column padding={10} gap={10}>
          <H>Create your first webby thing.</H>
          <Text>Bookmark sites and content, the world is yours.</Text>
        </Box>
        <Box right stretch bottom>
          <Button onEvent={() => props.onEvent("press add")}>Add web thang</Button>
        </Box>
      </Box>
    </Box>
  );
};
