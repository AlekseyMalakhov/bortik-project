import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import itemsAPI from "../api/items";

export const getItems = createAsyncThunk("manage/getItems", async (amount) => {
    const response = await itemsAPI.getItems();
    return response;
});

const initialState = {
    sideBarOpened: true,
    screenWidth: 0,
    mobileScreen: true,
    items: null,
    categories: [],
    loading: true,
    selectedCategory: null,
    cart: [],
    priceType: null,
    cartSum: 0,
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
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
        addItemToCart: (state, action) => {
            const newCart = [...state.cart];
            const index = newCart.findIndex((item) => item.id === action.payload.id);
            if (index !== -1) {
                newCart[index] = action.payload;
            } else {
                newCart.push(action.payload);
            }
            state.cart = newCart;
        },
        removeItemFromCart: (state, action) => {
            const newCart = [...state.cart];
            const index = newCart.findIndex((item) => item.id === action.payload.id);
            if (index !== -1) {
                const cart = newCart.filter((item) => item.id !== action.payload.id);
                state.cart = cart;
            }
        },
        setPriceType: (state, action) => {
            state.priceType = action.payload;
        },
        setCartSum: (state, action) => {
            state.cartSum = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getItems.pending, (state) => {
                state.loading = true;
            })
            .addCase(getItems.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    state.items = action.payload.items;
                    state.categories = action.payload.categories;
                    state.selectedCategory = action.payload.categories[0].name;
                }
                console.log(action.payload);
            });
    },
});

export const {
    changeSideBarOpened,
    setScreenWidth,
    setMobileScreen,
    setSelectedCategory,
    addItemToCart,
    removeItemFromCart,
    setPriceType,
    setCartSum,
    setLoading,
} = manageSlice.actions;
export default manageSlice.reducer;
