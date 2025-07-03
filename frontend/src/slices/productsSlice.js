// import { createSlice } from "@reduxjs/toolkit";

// const productsSlice = createSlice({
//   name: "products",
//   initialState: {
//     loading: false
//   },
//   reducers: {
//     productsRequest(state, action) {
//         return {
//           loading: true
//         };
//     },
//     productsSuccess(state, action){
//       return {
//           loading: false,
//           products: action.payload.products};
//     },
//     productsFail(state, action) {
//       return {
//           loading: false,
//           products: action.payload};
//     }
//   }
// });

// const { actions, reducer } = productsSlice;
// export const { productsRequest, productsSuccess, productsFail } = actions;
// export default reducer;


// Store - Holds all the app’s data (state) in one place
// Action - A plain object describing what happened (e.g., { type: 'ADD_PRODUCT' })
// Reducer - function that updates the state based on the action
// Dispatch - Sends an action to the reducer to update the store
// Selector - A way to read data from the store in your component


// import { createSlice } from "@reduxjs/toolkit";

// const productsSlice = createSlice({
//   name: "products",
//   initialState: {
//     loading: false,
//     products: [],   // ✅ always start with an array
//     error: null     // ✅ to handle errors
//   },
//   reducers: {
//     productsRequest(state) {
//       state.loading = true;
//       state.error = null;
//       state.products = []; // optional: reset products during loading
//     },
//     productsSuccess(state, action) {
//       state.loading = false;
//       state.products = action.payload.products;
//       state.productsCount = action.payload.count; // make sure payload has `.products`
//     },
//     productsFail(state, action) {
//       state.loading = false;
//       state.error = action.payload;  // ✅ store error string
//     }
//   }
// });

// const { actions, reducer } = productsSlice;
// export const { productsRequest, productsSuccess, productsFail } = actions;
// export default reducer;


import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    products: [],
    error: null,
    productsCount: 0
  },
  reducers: {
    productsRequest(state) {
      state.loading = true;
      state.error = null;
      state.products = [];
      state.productsCount = 0;
    },
    productsSuccess(state, action) {
      state.loading = false;
      state.products = action.payload.products;
      state.productsCount = action.payload.count;
      state.resPerPage = action.payload.resPerPage; // optional, if you need it
    },
    productsFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

const { actions, reducer } = productsSlice;
export const { productsRequest, productsSuccess, productsFail } = actions;
export default reducer;