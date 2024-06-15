import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    songs: [],
};

export const songSlice = createSlice({
    name: "songs",
    initialState,
    reducers: {
        addSong: (state, action) => {},
        getSongs: (state, action) => {
            state.songs = action.payload;
        },
        removeSong: (state, action) => {},
    },
});

export const { addSong, getSongs, removeSong } = songSlice.actions;
