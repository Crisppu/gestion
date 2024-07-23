import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from './features/counterSlice';
import darkModeSlice from "./features/darkModeSlice";
import arrowSideNavSlice from "./features/arrowSideNavSlice";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { persistReducer, FLUSH, REHYDRATE,PAUSE, PERSIST, PURGE, REGISTER} from "redux-persist";

// descomentar si a futuro tendo reducerSlice de tipo async import { thunk } from "redux-thunk";



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
    whitelist:['counterState','darkModeState','arrowSideNavState'],
}
const rootReducer = combineReducers({
    counterState: counterReducer,
    darkModeState:darkModeSlice,
    arrowSideNavState:arrowSideNavSlice
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
        reducer:persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
              serializableCheck: {
                // Ignora acciones de redux-persist
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
    }
)

/**
 * TODO: esta parte es por si tengo que reducer de tipo async
 * ejemplo uso de thunk**
 * Middleware redux-thunk: Permite escribir funciones asíncronas y despachar acciones basadas en operaciones asíncronas.
    * onfiguración del Store: Configura el store para incluir redux-thunk como middleware.
    *Creación y Uso de Thunks: Define y usa thunks para manejar operaciones asíncronas en tus componentes.

 * middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
                serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
                ignoredActionPaths: ['register', 'rehydrate'],
            },
    }).concat(thunk)
 */