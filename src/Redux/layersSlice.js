import { createSlice } from "@reduxjs/toolkit";

const saved=localStorage.getItem("elements");
const layer=createSlice({
name:"layers",
initialState:{
    layers:saved?JSON.parse(saved):[]
},
reducers:{
    setLayers:(state,action)=>{
        state.layers=action.payload;
        localStorage.setItem("elements",JSON.stringify(state.layers));
        
    }
}



});

export const {setLayers} =layer.actions;
export default layer.reducer;