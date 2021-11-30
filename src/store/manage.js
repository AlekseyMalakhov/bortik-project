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
    search: false,
    searchInput: [],
    user: null,
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
            localStorage.setItem("cart", JSON.stringify(newCart));
        },
        removeItemFromCart: (state, action) => {
            const newCart = [...state.cart];
            const index = newCart.findIndex((item) => item.id === action.payload.id);
            if (index !== -1) {
                const cart = newCart.filter((item) => item.id !== action.payload.id);
                state.cart = cart;
                localStorage.setItem("cart", JSON.stringify(cart));
            }
        },
        cleanCart: (state) => {
            state.cart = [];
            localStorage.setItem("cart", JSON.stringify([]));
            state.cartSum = 0;
        },
        setPriceType: (state, action) => {
            state.priceType = action.payload;
            localStorage.setItem("price_type", action.payload);
        },
        setCartSum: (state, action) => {
            state.cartSum = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setSearch: (state, action) => {
            state.search = action.payload;
        },
        setSearchInput: (state, action) => {
            const arr = action.payload.map((word) => word.toLowerCase());
            state.searchInput = arr;
        },
        setUser: (state, action) => {
            state.user = action.payload;
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
                    const cart = localStorage.getItem("cart");
                    if (cart) {
                        const data = JSON.parse(cart);
                        state.cart = data;
                    }
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
    cleanCart,
    setSearch,
    setSearchInput,
    setUser,
} = manageSlice.actions;
export default manageSlice.reducer;
