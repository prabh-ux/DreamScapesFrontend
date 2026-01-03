import { createSlice } from "@reduxjs/toolkit";

const saved=localStorage.getItem("canvasSize");

const initialState={
    size:saved?JSON.parse(saved):{width:200,
    height:200}
}

const CanvasSize=createSlice({

    name:"Canvassize",
    initialState,

    reducers:{

        setSize:(state,action)=>{

            state.size=action.payload;
            localStorage.setItem("canvasSize",JSON.stringify(state.size));

        }

    }


});

export const {setSize}=CanvasSize.actions;
export default CanvasSize.reducer;