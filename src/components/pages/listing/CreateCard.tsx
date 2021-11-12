import { Button } from "components/resource/controls/common";
import { Field } from "components/resource/controls/Field";
import { H } from "components/resource/controls/Text";
import React from "react";
import { useForm } from "utils/react-utils";
import { Box } from "vendor/misc/Box";
import Portal from "vendor/misc/Portal";

export const CreateCard = props => {
  const [formStatus, formDelegate, onSubmit] = useForm();

  onSubmit(values => {
    props.onEvent("press submit", values);
  });

  return (
    <Portal expand background="var(--semi-white)">
      <Box expand onClick={e => props.onEvent("press background")}>
        <Box expand middle center>
          <form {...formDelegate} autoComplete="off" noValidate>
            <Box
              column
              background="--primary-light"
              width={300}
              gap={20}
              padding={20}
              rounded={20}
              onClick={e => e.stopPropagation()}
            >
              <H variant="large">Its an internet, thing.</H>

              <Box column flex={1} gap={10} stretch>
                <Field name="Bookmark name" required />
                <Field
                  name="Web address"
                  type="url"
                  placeholder="https://example.com"
                  pattern="https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)"
                  hintMessage="Hey, make sure it begins with http https"
                  required
                />
              </Box>

              <Box stretch right>
                <Button variant="secondary" onClick={() => props.onEvent("press cancel create")}>
                  dismiss
                </Button>

                <Button disabled={formStatus !== "valid"}>Add</Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Box>
    </Portal>
  );
};

type AddBookmarkCardEvents = "press submit";
const addBookmarkCardDefaults = {
  onEvent: (event, value?) => {}
};
CreateCard.defaultProps = addBookmarkCardDefaults;
