import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from './features/counterSlice';
import darkModeSlice from "./features/darkModeSlice";
import arrowSideNavSlice from "./features/arrowSideNavSlice";

// import storage from "redux-persist/lib/storage";

import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { persistReducer, FLUSH, REHYDRATE,PAUSE, PERSIST, PURGE, REGISTER} from "redux-persist";

import { thunk } from "redux-thunk";

const createNoopStore = () =>{
    return {
        getItem(_key){
            return Promise.resolve(null);
        },
        setItem(_key, value){
            return Promise.resolve(value);
        },
        removeItem(_key){
            return Promise.resolve();
        },
    };
};

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStore();


const persistConfig ={
    key:'root',
    storage,
    whitelist:['counterState','darkModeState'],
}
const rootReducer = combineReducers({
    counterState: counterReducer,
    darkModeState:darkModeSlice,
    arrowSideNavState:arrowSideNavSlice
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer:persistedReducer,
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(thunk),
})

/**
 * middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
                serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
                ignoredActionPaths: ['register', 'rehydrate'],
            },
    }).concat(thunk)
 */