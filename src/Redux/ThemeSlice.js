import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    darkMode: false
}

const ThemeSlice = createSlice({

    name: 'theme',
    initialState,

    reducers: {

        toggleTheme: state => {

            state.darkMode = !state.darkMode;
        },
        setDarkMode: (state, action) => {
            state.darkMode = action.payload;
        }
    }

});

export const { toggleTheme,setDarkMode } = ThemeSlice.actions;
export default ThemeSlice.reducer;