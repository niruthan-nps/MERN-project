import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    product: [],   // ✅ always start with an array
    error: null     // ✅ to handle errors
  },
  reducers: {
    productRequest(state) {
      state.loading = true;
      state.error = null;
      state.product = []; // optional: reset products during loading
    },
    productSuccess(state, action) {
      state.loading = false;
      state.product = action.payload.product; // make sure payload has `.products`
    },
    productFail(state, action) {
      state.loading = false;
      state.error = action.payload;  // ✅ store error string
    }
  }
});

const { actions, reducer } = productSlice;
export const { productRequest, productSuccess, productFail } = actions;
export default reducer;