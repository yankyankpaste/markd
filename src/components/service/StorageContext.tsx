import { createBatcher } from "framer-motion";
import React, { useState } from "react";
import { Users as UsersPool } from "react-feather";
import { useMapEvents } from "utils/react-utils";

export const StorageContext = React.createContext({
  users: {},
  bookmarkPool: {},
  command: null as Command,
  status: "initial" as StorageStatus,
  onUpdate: (name, value?) => {}
});

export const useLocalStorage = () => {
  const [status, setStatus] = useState<StorageStatus>("initial");

  const [userData, setUserData] = useState<UsersPool>({});

  const [bookmarkData, setBookmarkData] = useState<BookmarkPool>({});

  const [onEvent, onEvents, sendEvents] = useMapEvents();

  switch (status) {
    case "initial":
      if ("localStorage" in window) {
        setStatus("retrieving");
      } else {
        setStatus("not supported");
      }
      break;

    case "retrieving": {
      try {
        const users = localStorage.getItem("users");
        const bookmarks = localStorage.getItem("bookmarks");
        if (!users || !bookmarks) setStatus("initialising");
        else {
          setUserData(JSON.parse(users));
          setBookmarkData(JSON.parse(bookmarks));
          setStatus("initialised");
        }
      } catch (e) {
        setStatus("corrupt");
      }
      break;
    }

    case "initialising": {
      // fake it till you make it...
      const users: UsersPool = { bananaMan: { avatar: "banana", user: "bananaMan" } };
      const bookmark: BookmarkPool = {
        bananaMan: []
      };
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("bookmarks", JSON.stringify(bookmark));
      setUserData(users);
      setBookmarkData(bookmark);
      setStatus("initialised");
      break;
    }

    case "initialised": {
      break;
    }

    case "syncing": {
      try {
        localStorage.setItem("users", JSON.stringify(userData));
        localStorage.setItem("bookmarks", JSON.stringify(bookmarkData));
        setStatus("synced");
        sendEvents("storage")("synced");
      } catch (e) {
        setStatus("corrupt");
      }
      break;
    }

    case "synced":
      break;

    case "corrupt":
      break;
  }

  const onCommand: Command = (name, meta) => {
    switch (name) {
      case "get bookmarks for user": {
        const user = meta as string;
        return bookmarkData[user];
      }
      case "add bookmark": {
        const bookmark = meta.value as any;
        const user = meta.user;
        const userBookmarks = [...bookmarkData[user]];
        //enrich with latest date
        bookmark.date = new Date().toISOString();
        userBookmarks.push(bookmark);
        setBookmarkData({ ...bookmarkData, [user]: userBookmarks });
        setStatus("syncing");
        return userBookmarks;
      }

      case "delete bookmark": {
        const bookmark = meta.value as any;
        const user = meta.user;
        const userBookmarks = [...bookmarkData[user]].filter(b => b.date !== bookmark.date);
        const update = { ...bookmarkData, [user]: userBookmarks };
        setBookmarkData(update);
        setStatus("syncing");
        return userBookmarks;
      }
    }
  };

  const contextData = { users: userData, bookmarkPool: bookmarkData, command: onCommand, status, onUpdate: onEvent };
  return [status, contextData] as const;
};

// Types

type StorageStatus =
  | "initial"
  | "retrieving"
  | "initialising"
  | "initialised"
  | "syncing"
  | "synced"
  | "idle"
  | "not supported"
  | "corrupt";

type ProviderRequests =
  | "get bookmarks for user"
  | "update user"
  | "add bookmark"
  | "update bookmark"
  | "delete bookmark";

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
  date: string;
};

type UserUuid = string;

type link = string;

type Command = (name: ProviderRequests, value: string | { user: UserUuid; value: Bookmark | string }) => any;
