import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from './features/counterSlice';
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { thunk } from "redux-thunk";


const persistConfig ={
    key:'root',
    storage,
    whitelist:['counterState']
}
const rootReducer = combineReducers({
    counterState: counterReducer,
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

