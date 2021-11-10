import React from "react";
import { H, SpecCard, Text } from "resource/controls/Text";
import { useOnce } from "utils/react-utils";
import { Div } from "vendor/misc/Flex";
import "./App.css";
import { AsciiLogo } from "resource/logo";
import { ContextReplacementPlugin } from "webpack";
import { CreateBookmarkCard } from "components/features/CreateBookmarkCard";

export const App = (props) => {
  const { content, states } = useApp(props);
  useOnce(() => {
    console.log(AsciiLogo);
  });
  return (
    <Div expand padding={50} column gap={50} background="--black-x-dark">
      <CreateBookmarkCard />
    </Div>
  );
};

function useApp(props) {
  return {
    content: {},
    onEvent: () => {},
    states: {},
  };
}

const SpecSection = () => {
  return (
    <Div id="Specimen" row width="100%" padding={40} gap={20} rounded={20} column>
      <Div>
        <H variant="larger" color="white">
          Specimen
        </H>
      </Div>

      <Div gap={20}>
        <SpecCard name="Create bookmark"></SpecCard>

        <SpecCard name="Headings" hidden>
          <H variant="regular">Regular</H>
          <H variant="large">Large</H>
          <H variant="larger">Larger</H>
          <H variant="small">Small</H>
          <H variant="smaller">Smaller</H>
        </SpecCard>

        <SpecCard name="Text" hidden>
          <Text variant="regular">Regular</Text>
          <Text variant="large">Large</Text>
          <Text variant="larger">Larger</Text>
          <Text variant="small">Small</Text>
          <Text variant="smaller">Smaller</Text>
        </SpecCard>
      </Div>
    </Div>
  );
};
