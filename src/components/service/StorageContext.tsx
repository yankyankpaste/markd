import React, { useState } from "react";
import { Users as UsersPool } from "react-feather";

export const StorageContext = React.createContext({
  users: {},
  bookmarkPool: {},
  command: null as Command
});

export const useLocalStorage = () => {
  type StorageStatus = "initial" | "retrieving" | "initialising" | "initialised" | "storing" | "idle" | "not supported";

  const [status, setStorageStatus] = useState<StorageStatus>("initial");

  const [userData, setUserData] = useState<UsersPool>({});

  const [bookmarkData, setBookmarkData] = useState<BookmarkPool>({});

  switch (status) {
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
      setStorageStatus("initialising");
      break;
    }

    case "initialising": {
      // fake it till you make it...
      const users: UsersPool = { bananaMan: { avatar: "banana", user: "bananaMan" } };
      const bookmark: BookmarkPool = {
        bananaMan: [
          {
            name: "bbc",
            url: "https://bbc.co.uk"
          },
          {
            name: "bbc",
            url: "https://bbc.co.uk"
          },
          {
            name: "bbc",
            url: "https://bbc.co.uk"
          },

          {
            name: "bbc",
            url: "https://bbc.co.uk"
          },

          {
            name: "bbc",
            url: "https://bbc.co.uk"
          },

          {
            name: "bbc",
            url: "https://bbc.co.uk"
          },

          {
            name: "bbc",
            url: "https://bbc.co.uk"
          },
          {
            name: "bbc",
            url: "https://bbc.co.uk"
          }
        ]
      };
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

  const onCommand: Command = (name, value) => {
    switch (name) {
      case "get bookmarks for user": {
        const user = value as string;
        return bookmarkData[user];
        break;
      }
    }
  };

  const contextData = { users: userData, bookmarkPool: bookmarkData, command: onCommand };
  return [status, contextData] as const;
};

// Types

type ProviderRequests = "get bookmarks for user" | "update user" | "add bookmark" | "update bookmark";

type UsersPool = {
  [name: UserUuid]: {
    avatar: string;
    user: string;
  };
};

type BookmarkPool = {
  [name: UserUuid]: Bookmark[];
};

export type Bookmark = {
  name: string;
  url: link;
};

type UserUuid = string;

type link = string;

type Command = (name: ProviderRequests, value: string | { user: UserUuid; value: Bookmark | string }) => any;
