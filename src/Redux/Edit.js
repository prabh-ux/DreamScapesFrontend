import { createSlice } from "@reduxjs/toolkit";
import reducer from "./ImageUrl";



const editSettings = createSlice({
    name: "editsettings",
    initialState: {
        EditSettings: {
            
        }
    },
    reducers: {

        updateEditSetting: (state, action) => {
            state.EditSettings = action.payload;
        }

    }

})

export const {updateEditSetting}=editSettings.actions;
export default editSettings.reducer;