// Init
import React, { useContext, useState, createContext } from "react";

// Initializing Create Context Hook
const storeContext = createContext();
const storeUpdateContext = createContext();
const typeUpdateContext = createContext();

// We are also initializing useContexts here then we only call these functions where we need that data
export function Store() {
  return useContext(storeContext);
}

export function UpdateStore() {
  return useContext(storeUpdateContext);
}

export function TypeUpdate() {
  return useContext(typeUpdateContext);
}

// Initializing Store Provider
export function StoreProvider({ children }) {
  // Initializing State
  let [store, setStore] = useState({
    authorization: null,
    token: null,
    login: null,
    Users: null,
    singleUserResults: null,
    singleUserResult: null,
    results: null,
    user: {},
    questions: [],
    answers: [],
    institutes: [],
    history: [],
    disc_ans_id: [],
    result: {},
    allTypes: [],
    mainresultPage: null,
    screenshoots: [],
    blogs: [],
    singleBlog: {},
    channelVideos: []
  });

  const updateStore = (data) => {
    setStore((prev) => {
      return {
        ...prev,
        ...data
      };
    });
  };

  const typeUpdate = (data) => {
    setStore((prev) => {
      return {
        ...prev,
        allTypes: [...prev.allTypes, data]
      };
    });
  };

  // Render
  return (
    <storeContext.Provider value={store}>
      <storeUpdateContext.Provider value={updateStore}>
        <typeUpdateContext.Provider value={typeUpdate}>
          {children}
        </typeUpdateContext.Provider>
      </storeUpdateContext.Provider>
    </storeContext.Provider>
  );
}
