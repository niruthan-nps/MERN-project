import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    loading: false
  },
  reducers: {
    productsRequest(state, action) {
        return {
          loading: true
        };
    },
    productsSuccess(state, action){
      return {
          loading: false,
          products: action.payload.products};
    },
    productsFailure(state, action) {
      return {
          loading: false,
          products: action.payload};
    }
  }
});

const { actions, reducer } = productsSlice;
export const { productsRequest, productsSuccess, productsFailure } = actions;
export default reducer;





// Store - Holds all the app’s data (state) in one place
// Action - A plain object describing what happened (e.g., { type: 'ADD_PRODUCT' })
// Reducer - function that updates the state based on the action
// Dispatch - Sends an action to the reducer to update the store
// Selector - A way to read data from the store in your component
