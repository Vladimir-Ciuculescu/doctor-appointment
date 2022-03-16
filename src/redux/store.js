import { persistStore } from "redux-persist";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userApp from "./user/user";

const persistConfig = {
  key: "persist-key",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userApp);

export const store = createStore(persistedReducer, composeWithDevTools());

export const persistor = persistStore(store);

export default { store, persistor };
