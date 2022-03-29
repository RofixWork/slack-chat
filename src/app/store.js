import { configureStore } from "@reduxjs/toolkit";
import GeneralReducer from "./slices/GeneralSlice";
export const store = configureStore({
  reducer: {
    general: GeneralReducer,
  },
});
