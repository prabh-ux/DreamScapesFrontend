import { configureStore } from "@reduxjs/toolkit";
import themeReducer from './ThemeSlice';
import CanvasSizeReducer from './CanvasSize';
import imageUrlReducer from './ImageUrl';
import setDelete from './Delete';
import layersReducer from './layersSlice';
import TextSettings from './TextSettings';
import textReducer from './TextSlice';
import editSettings from './Edit';
import SelectedElement from './SelectedElement';

export const store = configureStore({

    reducer: {
        theme: themeReducer,
        Canvassize: CanvasSizeReducer,
        imageUrl:imageUrlReducer,
        deleteImage:setDelete,
        layers:layersReducer,
        TextSettings:TextSettings,
        text:textReducer,
        editsettings:editSettings,
        selectedElement:SelectedElement
    },
});