import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import itemsAPI from "../api/items";

export const getItems = createAsyncThunk("counter/fetchCount", async (amount) => {
    const response = await itemsAPI.getItems();
    return response;
});

const initialState = {
    sideBarOpened: false,
    screenWidth: 0,
    mobileScreen: true,
    items: [],
    categories: [],
    loading: true,
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
        setItems: (state, action) => {
            state.items = action.payload;
        },
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getItems.pending, (state) => {
                state.loading = true;
            })
            .addCase(getItems.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items;
                state.categories = action.payload.categories;
                console.log(action.payload);
            });
    },
});

export const { changeSideBarOpened, setScreenWidth, setMobileScreen } = manageSlice.actions;
export default manageSlice.reducer;
