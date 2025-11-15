import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist"; // ⚠️ ADDED
import AsyncStorage from "@react-native-async-storage/async-storage"; // ⚠️ ADDED
import { combineReducers } from "redux"; // ⚠️ ADDED
import productsReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice";

// ⚠️ ADDED: Persist Config
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth", "cart"], // Only persist auth and cart
};

// ⚠️ ADDED: Combine Reducers
const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  auth: authReducer,
});

// ⚠️ ADDED: Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ⚠️ MODIFIED: Store with persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

// ⚠️ ADDED: Persistor
export const persistor = persistStore(store);

export default store;