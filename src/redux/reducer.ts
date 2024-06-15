import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    songs: [],
};

export const songSlice = createSlice({
    name: "songs",
    initialState,
    reducers: {
        getSongs: (state, action) => {
            state.songs = action.payload;
        },
    },
});

export const { getSongs } = songSlice.actions;
