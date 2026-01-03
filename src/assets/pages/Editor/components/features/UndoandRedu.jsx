import { useDispatch, useSelector } from "react-redux";
import { setLayers } from "../../../../../Redux/layersSlice";
import {store} from '../../../../../Redux/store';

const UndoandRedu = (text, pastRef, futureRef) => {
  if (!text) return;
const state=store.getState();
const droppedImages=state.layers?.layers;

  if (text === "Undo") {

    if (pastRef.current.length === 0) return;
    const prev = pastRef.current.pop();
    futureRef.current.push([...droppedImages]);
    store.dispatch(setLayers(prev));

  }

  if (text === "Redo") {
    if (futureRef.current.length === 0) return;
    const next = futureRef.current.pop();
    pastRef.current.push([...droppedImages]);
    store.dispatch(setLayers(next));
  }



}

export default UndoandRedu
