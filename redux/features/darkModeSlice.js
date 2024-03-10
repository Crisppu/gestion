import { createSlice } from "@reduxjs/toolkit";

//este archivo si tendra la logica

const initialState = {
    mode : 'light',
}

export const darkModeSlice = createSlice (

    {
        name:'darkModeSlice',
        initialState,
        reducers:{
            setMode:(state)=>{
                state.mode = state.mode == 'light' ? 'dark':'light';
            }
        }
    }
)
//las actions serian todas las function que esten dentro del reducers
//para este caso solo tenemos una funtion(setMode) dentro del reducers
export const {setMode} = darkModeSlice.actions;
//esta linea dara el valor initial a este Slice cuando lo llamemos desde el story
export default darkModeSlice.reducer;

export const selectDarkMode = (state) => state.darkModeState.mode

