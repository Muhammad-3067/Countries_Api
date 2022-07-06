import { configureStore } from "@reduxjs/toolkit";
import countrySlice from "../country/countrySlice";

export const store = configureStore({
  reducer: {
    country: countrySlice,
  },
});
