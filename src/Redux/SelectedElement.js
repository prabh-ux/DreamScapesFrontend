import { createSlice } from "@reduxjs/toolkit";



const SelectedElement=createSlice({

name:"selectedElement",
initialState:{ 
    selectedElement:null
},
reducers:{
    updateSelectedElement:(state,action)=>{

        state.selectedElement=action.payload;
    }

    
}

});
export const {updateSelectedElement}=SelectedElement.actions;
export default SelectedElement.reducer;