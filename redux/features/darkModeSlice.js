import { createSlice } from "@reduxjs/toolkit";

//este archivo si tendra la logica

const initialState = {
    mode : 'light',
}

export const styleSlice= createSlice (

    {
        name:'darkModeSlice',
        initialState,
        reducers:{
            changeMode:(state)=>{
                console.log(state)
                state.mode = state.mode == 'light' ? 'dark':'light';
            }
        }
    }
)
//las actions serian todas las function que esten dentro del reducers
//para este caso solo tenemos una funtion(changeMode) dentro del reducers
export const {changeMode} = styleSlice.actions;
//esta linea dara el valor initial a este Slice cuando lo llamemos desde el story
export default styleSlice.reducer;

