import { createSlice } from "@reduxjs/toolkit";

const deleteImage = createSlice({

    name: "deleteImage",
    initialState: {
        deleteClicked: false
    },
    reducers:{
        setDeleteClicked:(state,action)=>{
            
            state.deleteClicked=action.payload;
        }
    }
});

export const {setDeleteClicked}=deleteImage.actions;
export default deleteImage.reducer;