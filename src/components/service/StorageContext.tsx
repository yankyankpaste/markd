import React, { useState } from "react";

export const StorageContext = React.createContext({
  users: {},
  bookmarkPool: {}
});

const StorageProvider = props => {
  type StorageStatus = "initial" | "retrieving" | "initialising" | "initialised" | "storing" | "idle" | "not supported";
  const [storageStatus, setStorageStatus] = useState<StorageStatus>("initial");
  const [userData, setUserData] = useState<Users>({});
  const [bookmarkData, setBookmarkData] = useState<BookmarkPool>({});

  switch (storageStatus) {
    case "initial":
      if ("localStorage" in window) {
        setStorageStatus("retrieving");
      } else {
        setStorageStatus("not supported");
      }
      break;

    case "retrieving": {
      const users = localStorage.getItem("users");
      const bookmarks = localStorage.getItem("bookmarks");
      if (!users || !bookmarks) setStorageStatus("initialising");
      break;
    }

    case "initialising": {
      const users = { bananaMan: { avatar: "banana", user: "bananaMan" } };
      const bookmark = { bananaMan: [] };
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("bookma", JSON.stringify(bookmark));
      setUserData(users);
      setBookmarkData(bookmark);
      setStorageStatus("initialised");
      break;
    }

    case "initialised": {
      break;
    }

    case "storing": {
      break;
    }
  }

  return <StorageContext.Provider value={{}}>{props.children}</StorageContext.Provider>;
};

type Users = {
  [name: string]: {
    avatar: string;
    user: string;
  };
};
type BookmarkPool = {
  [uuidRef: UserUuid]: {
    name: string;
    url: link;
  }[];
};
type UserUuid = string;
type link = string;
