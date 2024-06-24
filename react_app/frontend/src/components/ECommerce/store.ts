// import { combineReducers, configureStore } from "@reduxjs/toolkit";

// import reducer from "./reducers/index";
// const reducers = combineReducers({
//   cartReducer: reducer
// })
// const store = configureStore({ reducer: reducers });


// export default store;

import { Reducer, combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import cartReducer, { initStateInterface } from "./reducers";
import thunk from 'redux-thunk';
import { PersistPartial } from "redux-persist/es/persistReducer";

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, cartReducer)

export const store = configureStore({
  reducer: persistedReducer,
})

export const persistor = persistStore(store)

