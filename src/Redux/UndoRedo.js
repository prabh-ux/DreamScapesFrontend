import { createSlice } from "@reduxjs/toolkit";



const undoRedoSlice=createSlice({

name:"undoRedo",
initialState:{
    ref:{pastRef:[],futureRef:[]}
}


})