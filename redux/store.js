//store contiende el estado de la aplicacion y su function reducer
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import darkModeReducer from './features/darkModeSlice';

import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { thunk } from "redux-thunk";//sera encargado de hacer la conexion entre persist y toolkit

const persistConfig = {
    key:'root',//nombre que tendra en localStorage
    storage, //de redux
    whiteList:['darkModeState'] //whiteList nos sirve para especificar los reducer que querramos que persist de lo contrario se ejecutara todos los reducers que tengamos
}

const rootReducer = combineReducers({
    darkModeState:darkModeReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);
//este recibira un Objet
//y dentro podemos poner todos los reducer que querramos
export const store = configureStore({
    reducer:{
        // darkModeReducer, //antes
        persistedReducer,
        middleware:[thunk],
    },
})

