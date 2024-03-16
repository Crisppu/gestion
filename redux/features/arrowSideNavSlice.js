import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    arrowSideNav:false,
}

export const arrowSideNavSlice = createSlice({
    name:'arrowStateSlice',
    initialState,
    reducers:{
        setArrowSideNav:(state)=>{
            state.arrowSideNav = !state.arrowSideNav
        }
    }
})
export const {setArrowSideNav} = arrowSideNavSlice.actions;
export const selectArrowSideNav = (state)=> state.arrowSideNavState.arrowSideNav;
export default arrowSideNavSlice.reducer;