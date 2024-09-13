/*
 * Redux Store Configuration with Persistence
 *
 * This file sets up the Redux store with state persistence using redux-persist. It configures middleware, combines reducers, and
 * ensures the state is stored in and retrieved from localStorage.
 */

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./reducers/userSlice";

// Configuration for redux-persist (key for storage, version, and storage type)
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// Combine reducers (can add more slices here)
const rootReducer = combineReducers({
  user: userReducer,
});

// Create a persisted reducer using redux-persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store with middleware that ignores specific redux-persist actions
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create a persistor to handle rehydration of persisted state
export const persistor = persistStore(store);