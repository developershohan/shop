import { configureStore,combineReducers } from "@reduxjs/toolkit"
import userReducer from "../features/auth/authSlice"
import {persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"
import persistStore from "redux-persist/es/persistStore.js"

const rootReducer = combineReducers({user: userReducer})

const persistConfig = {
    key: 'root',
    version: 1,
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
    reducer: persistedReducer ,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})


export const persistor = persistStore(store)