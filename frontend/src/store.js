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

const reducer = combineReducers({
  // Add your reducers here
});

const store = configureStore({
  reducer,
  // no need to add middleware unless you want custom ones
});

export default store;