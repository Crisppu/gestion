import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from './features/counterSlice';
import darkModeSlice from "./features/darkModeSlice";

import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { thunk } from "redux-thunk";


const persistConfig ={
    key:'root',
    storage,
    whitelist:['counterState','darkModeState']
}
const rootReducer = combineReducers({
    counterState: counterReducer,
    darkModeState:darkModeSlice
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
                serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
                ignoredActionPaths: ['register', 'rehydrate'],
            },
    }).concat(thunk)
})

