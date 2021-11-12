import { H, SpecCard, Text } from "components/resource/controls/Text";
import React, { useContext, useRef, useState } from "react";
import { Box } from "vendor/misc/Box";
import { StorageContext, useLocalStorage } from "../service/StorageContext";
import "./App.css";
import { ListingPage } from "./listing/ListingPage";
import * as Icons from "react-feather";

export const App = props => {
  const { status, storageContext, targetUser } = useApp(props);
  return (
    <StorageContext.Provider value={storageContext}>
      <Box expand background="--black-x-dark">
        {/* welcome page?? */}
        {/* signin page?? */}
        {/* render the listing page when we have targetted an intended user */}
        {/* for now assuming user has been targetted */}
        {status === "loaded user" && <ListingPage user={targetUser} />}
        {status === "deserialising storage" && (
          <Box expand middle center color="white">
            <Icons.Loader />
            <H variant="large">Firing up</H>
          </Box>
        )}
        {status === "browser incompatible" && (
          <Box expand middle center column color="white" gap={20}>
            <Icons.AlertTriangle />
            <H variant="large">Ahh crap, your browser is incompatible</H>
            <Text variant="large">Localstorage needs to be available in order to use this app.</Text>
          </Box>
        )}
      </Box>
    </StorageContext.Provider>
  );
};

type Status = "initial" | "deserialising storage" | "oops" | "browser incompatible" | "loaded user";

function useApp(props) {
  const [storageStatus, storageContext] = useLocalStorage();

  const [status, setStatus] = useState<Status>("initial");

  // for now hard coding this in, we would get this through through dynamic means (sign in, url etc)
  const [user, setUser] = useState("bananaMan");

  switch (status) {
    case "initial":
      // future: get user from login or params
      if (storageStatus === "retrieving") {
        setStatus("deserialising storage");
      }
      break;
    case "deserialising storage":
      if (storageStatus === "initialised") {
        setStatus("loaded user");
      }
      if (storageStatus === "not supported") setStatus("browser incompatible");
      break;
  }
  return {
    storageContext,
    status,
    targetUser: user
  };
}
