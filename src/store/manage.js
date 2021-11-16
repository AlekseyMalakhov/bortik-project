import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sideBarOpened: false,
    screenWidth: 0,
    mobileScreen: true,
};

export const manageSlice = createSlice({
    name: "manage",
    initialState,
    reducers: {
        changeSideBarOpened: (state, action) => {
            state.sideBarOpened = action.payload;
        },
        setScreenWidth: (state, action) => {
            state.screenWidth = action.payload;
        },
        setMobileScreen: (state, action) => {
            state.mobileScreen = action.payload;
        },
    },
});

export const { changeSideBarOpened, setScreenWidth, setMobileScreen } = manageSlice.actions;
export default manageSlice.reducer;
