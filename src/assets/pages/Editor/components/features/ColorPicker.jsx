import { SketchPicker } from 'react-color';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const ColorPicker = ({ onChange ,className='' }) => {
    const [color, setColor] = useState("#ffffff");
        const darkMode = useSelector(state => state.theme?.darkMode)

    const handlechange = (color) => {

        setColor(color.hex);
        onChange && onChange(color.hex);
    }
    return (
        <div className={` p-[1rem]  rounded-2xl ${darkMode?"bg-[#3d2840]":"bg-[#9f6ca8]"} ${!className?'scale-[0.85]  origin-top-left':className}  flex flex-col justify-center items-center absolute  top-[3.2rem] `}>
            <SketchPicker
                color={color}
                onChange={handlechange}
                styles={{
                    default: {
                        picker: {
                            background: darkMode?"#3d2840":"#9f6ca8",
                            borderRadius: '8px',
                            boxShadow: 'none',
                            padding: "1rem",
                            width: "100%",
                            
                        

                        },
                        head:{
                          
                        }
                    }
                }}
            />

        </div>
    );
};

export default ColorPicker;
