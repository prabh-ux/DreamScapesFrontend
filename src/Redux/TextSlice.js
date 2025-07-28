import { createSlice } from "@reduxjs/toolkit";


const textSlice = createSlice({

    name: "text",
    initialState: {
        text:"Heading",
    },
    reducers: {

        setText: (state, action) => {
            return {...state,...action.payload};
        }

    }


});

export const { setText } = textSlice.actions;
export default textSlice.reducer;