import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    counter:0,
}

export const counterSlice = createSlice({
    name:'counterSlice',
    initialState,
    reducers:{
        setCounter:(state, action)=>{
            state.counter = action.payload.counter
        }
    }
})
export const {setCounter} = counterSlice.actions;
export const selectCounter = (state)=> state.counterState.counter;
export default counterSlice.reducer;