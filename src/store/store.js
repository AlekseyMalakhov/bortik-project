import { configureStore } from "@reduxjs/toolkit";
import manageReducer from "./manage";

export const store = configureStore({
    reducer: {
        manage: manageReducer,
    },
});
