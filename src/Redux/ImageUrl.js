import { createSlice } from "@reduxjs/toolkit";

const imageSlice = createSlice({

    name: "imageUrl",
    initialState: {
        uplodedUrl: null,
    },

    reducers: {
        setUplodedUrl: (state, action) => {
              
            state.uplodedUrl = action.payload;

        }
    }
})

export const { setUplodedUrl } = imageSlice.actions;
export default imageSlice.reducer;