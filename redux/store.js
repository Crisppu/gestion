//store contiende el estado de la aplicacion y su function reducer
import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from './features/darkModeSlice';

//este recibira un Objet
//y dentro podemos poner todos los reducer que querramos
export const store = configureStore({
    reducer:{
        darkModeReducer,
    },
})

