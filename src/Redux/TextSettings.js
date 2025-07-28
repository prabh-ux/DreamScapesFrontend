import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
const TextSettings=createSlice({

name:"TextSettings",

initialState:{

color:"#F5A623",
stroke:40,
size:50,
shadow:0,
opacity:100,
ShadowColor:"black",
LineHeight:20
},

reducers:{

    updateTextSettings:(state,action)=>{

        return { ...state,...action.payload};
    }
}


})

export const {updateTextSettings}=TextSettings.actions;
export default TextSettings.reducer;