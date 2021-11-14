import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sideBarOpened: true,
};

export const manageSlice = createSlice({
    name: "manage",
    initialState,
    reducers: {
        changeSideBarOpened: (state, action) => {
            state.sideBarOpened = action.payload;
        },
    },
});

export const { changeSideBarOpened } = manageSlice.actions;
export default manageSlice.reducer;
