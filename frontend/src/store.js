// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import { thunk } from 'redux-thunk'; // ✅ CORRECT


// const reducer = combineReducers({
//   // Add your reducers here
// });

// const store = configureStore({
//   reducer,
//   middleware: [thunk]
// }); 

// export default store;


import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import productReducer from "./slices/productSlice";

const reducer = combineReducers({
    productsState: productsReducer,
    productState: productReducer
});

const store = configureStore({
  reducer,
  // no need to add middleware unless you want custom ones
});

export default store;

// `combineReducers`: lets you combine multiple reducer functions into one — useful when your app has multiple features (e.g., auth, products, cart).
// `configureStore`: a smarter alternative to `createStore()` — sets up the Redux store with default middleware (like thunk) and development tools like Redux DevTools.
