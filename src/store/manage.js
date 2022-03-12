import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import itemsAPI from "../api/items";
import userAPI from "../api/user";
import { calculateSum } from "../utilities/calculate";

export const getItems = createAsyncThunk("manage/getItems", async () => {
    const response = await itemsAPI.getItems();
    return response;
});

export const getHistory = createAsyncThunk("manage/getHistory", async (userID) => {
    const response = await userAPI.getHistory({ userID });
    return response;
});


// инитиализация состояния
const initialState = {
    sideBarOpened: true,
    sideBarShowType: "groups",
    screenWidth: 0,
    mobileScreen: true,
    items: [],
    selectedItems: [],
    catalog: [],
    loading: true,
    selectedCategory1: null,
    selectedCategory2: null,
    selectedGroup: null,
    cart: [],
    priceType: null,
    cartSum: 0,
    search: false,
    searchInput: [],
    user: null,
    history: [],
    showInStockOnly: true,
    antonAnton: false,
};

export const manageSlice = createSlice({
    name: "manage",
    initialState,
    reducers: {
        changeAntonAnton: (state, action) => {
            state.antonAnton = action.payload;
        },
        changeSideBarOpened: (state, action) => {
            state.sideBarOpened = action.payload;
        },
        changeSideBarShowType: (state, action) => {
            state.sideBarShowType = action.payload;
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
        setSelectedItems: (state, action) => {
            state.selectedItems = action.payload;
        },
        setSelectedCategory1: (state, action) => {
            state.selectedCategory1 = action.payload;
        },
        setSelectedCategory2: (state, action) => {
            state.selectedCategory2 = action.payload;
        },
        setSelectedGroup: (state, action) => {
            state.selectedGroup = action.payload;
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
        makeSelected: (state, action) => {
            const newCart = [...state.cart];
            const index = newCart.findIndex((item) => item.id === action.payload.item.id);
            if (index !== -1) {
                newCart[index].selected = action.payload.selected;
                state.cart = newCart;
                localStorage.setItem("cart", JSON.stringify(newCart));
            }
            return;
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
        cleanHistory: (state, action) => {
            state.history = [];
        },
        setShowInStockOnly: (state, action) => {
            state.showInStockOnly = action.payload;
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
                    state.catalog = action.payload.catalog;
                    //state.selectedCategory = action.payload.categories[0].name;
                    const cart = localStorage.getItem("cart");
                    if (cart) {
                        const data = JSON.parse(cart);
                        state.cart = data;
                        const sum = calculateSum(data, state.priceType);
                        state.cartSum = sum;
                    }
                }
                console.log(action.payload);
            });
        builder
            .addCase(getHistory.pending, (state) => {
                state.loading = true;
            })
            .addCase(getHistory.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    state.history = action.payload;
                }
            });
    },
});

export const {
    changeAntonAnton,
    changeSideBarOpened,
    changeSideBarShowType,
    setScreenWidth,
    setMobileScreen,
    setSelectedCategory1,
    setSelectedCategory2,
    setSelectedGroup,
    addItemToCart,
    removeItemFromCart,
    setPriceType,
    setCartSum,
    setLoading,
    cleanCart,
    setSearch,
    setSearchInput,
    setUser,
    setSelectedItems,
    cleanHistory,
    makeSelected,
    setShowInStockOnly,
} = manageSlice.actions;
export default manageSlice.reducer;
