import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";

// Only import browser storage when in browser
let storage;
if (typeof window !== "undefined") {
  storage = require("redux-persist/lib/storage").default;
}

// Slices
import locationReducer from "./features/locationSlice";
import carReducer from "@/redux/features/carSlice";
import authReducer from "@/redux/features/authSlice";
import bookingReducer from "@/redux/features/bookingSlice";
import filterSlice from "@/redux/features/filterSlice";
import tripReducer from "@/redux/features/tripSlice";
import userReducer from "@/redux/features/userSlice";

// Root reducer
const rootReducer = combineReducers({
  location: locationReducer,
  cars: carReducer,
  auth: authReducer,
  booking: bookingReducer,
  filterSlice: filterSlice,
  trip: tripReducer,
  User: userReducer,
});

// Persist config only for browser
const isBrowser = typeof window !== "undefined";

const persistConfig = {
  key: "root",
  storage: isBrowser ? storage : undefined,
  whitelist: ["booking", "auth"],
};

const persistedReducer = isBrowser
  ? persistReducer(persistConfig, rootReducer)
  : rootReducer;

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefault) =>
    getDefault({ serializableCheck: false }),
});

// Persistor only in browser
export const persistor = isBrowser ? persistStore(store) : null;
