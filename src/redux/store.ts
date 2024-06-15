import { configureStore } from "@reduxjs/toolkit";
import { songSlice } from "./reducer.ts";

const store = configureStore({
    reducer: songSlice.reducer,
});

export default store;
