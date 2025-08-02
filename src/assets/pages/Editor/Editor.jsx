import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import BottomToolBox from './components/features/BottomToolBox';
import BigToolBox from './components/features/BigToolBox'
import SmallToolBox from './components/features/SmallToolBox';
import Moveable from 'react-moveable';
import { setDeleteClicked } from '../../../Redux/Delete';
import { setLayers } from '../../../Redux/layersSlice';
import { updateTextSettings } from '../../../Redux/TextSettings';
import { updateSelectedElement } from '../../../Redux/SelectedElement';
import PercentageToCssFilter from './components/features/PercentageToCssFilter';
import { updateEditSetting } from '../../../Redux/Edit';
import downlodeFullDesign from './components/features/Downlode';
import getScreenSize from './components/getScreenSize';
import ToolBoxMd from './components/features/ToolBoxMd';
const Editor = () => {
  const [dividerX, setDividerX] = useState(50);
  const [showGrid, setShowGrid] = useState(false);
  const [activePanel, setActivePanel] = useState(null);
  const [activePanel2, setActivePanel2] = useState(null);
  const [activeCanvas, setActiveCanvas] = useState([0]);
  const [selectedCanvas, setSelectedCanavs] = useState(0);
  const DesignRef = useRef({});
  const BgRef = useRef({});
  const [bgColor, setBgColor] = useState("#ffffff");
  const size = useSelector(state => state.Canvassize.size);
  const [canvasSize, setCanvasSize] = useState(() => ({ width: size.width, height: size.height }));
  const imageRef = useRef({});
  const textRef = useRef({});
  const [selectedElement, setselectedElement] = useState(null);
  const uplodedUrl = useSelector(state => state.imageUrl?.uplodedUrl);
  const isDeleteClicked = useSelector(state => state.deleteImage?.deleteClicked);
  const dispatch = useDispatch();
  const droppedImages = useSelector(state => state.layers?.layers);
  const droppedTextSettings = useSelector(state => state.TextSettings);
  const droppedText = useSelector(state => state.text);
  const [textEditing, setTextEditing] = useState(null);
  const EditSetting = useSelector(state => state.editsettings?.EditSettings);
  const pastRef = useRef([]);
  const futureRef = useRef([]);
  const editorRef = useRef();

  const lastTapRef = useRef(0);

  useEffect(() => {
    if (!selectedElement) return;
    dispatch(updateSelectedElement(selectedElement));
  }, [selectedElement]);



  useEffect(() => {
    if (!selectedElement) return;
    dispatch(setLayers(
      droppedImages.map((item) =>
        item.id === selectedElement.id
          ? {
            ...item,
            editSettings: { ...item.editSettings, ...EditSetting.edit }
          }
          : item
      )
    ))
  }, [EditSetting])

  useEffect(() => {
    if (!selectedElement) return;
    if (selectedElement.type !== "text") return;

    dispatch(setLayers(
      droppedImages.map((item) =>
        item.id === selectedElement.id
          ? { ...item, settings: { ...item.settings, ...droppedTextSettings } }
          : item
      )
    ));


  }, [droppedTextSettings]);

  useEffect(() => {
    if (!droppedText) return;
    addTextToCanvas(0, 0, droppedText.text)
  }, [droppedText])



  const moveableTarget = (() => {
    if (!selectedElement) return null;

    const refMap =
      selectedElement.type === "image" ? imageRef.current : textRef.current;

    return refMap?.[selectedElement.id] || null;
  })();




  const dispatchUpdatedArray = (updatedArray) => {
    dispatch(setLayers(updatedArray));
  }

  useEffect(() => {

    if (!uplodedUrl) return;


    addImageToCanvas(0, 0, uplodedUrl);
  }, [uplodedUrl])

  useEffect(() => {
    dispatch(setLayers(droppedImages));

  }, [droppedImages]);


  useEffect(() => {
    if (!isDeleteClicked) return;

    if (selectedElement === null) {
      dispatch(setDeleteClicked(false));
      if (activePanel === "Delete") {
        setTimeout(() => setActivePanel(null), 200);
      }
    }

    deleteImage();
    dispatch(setDeleteClicked(false));

  }, [isDeleteClicked, selectedElement])

  useEffect(() => {
    const handelKeyDown = (e) => {
      if (e.key === "Delete" && selectedElement) {
        deleteImage();
        dispatch(setDeleteClicked(false));

      }
    };

    window.addEventListener("keydown", handelKeyDown);
    return () => window.removeEventListener("keydown", handelKeyDown);
  }, [selectedElement])



const deleteImage = () => {
  if (!selectedElement) return;
  const filtered = droppedImages.filter(i => i.id !== selectedElement.id);
  dispatch(setLayers(filtered));
  setselectedElement(null);        // reset your selection
};




  useEffect(() => {

    const category = getScreenSize();
    let max = 500;

    switch (category) {
      case "small":
        max = 300;
        break;
      case "medium":
        max = 400;
        break;
      case "large":
        max = 500;

      default:
        max = 500;
        break;
    }



    const minZoom = 0.5;
    const maxZoom = 2;


    const zoomScale = minZoom + ((dividerX / 100) * (maxZoom - minZoom));

    const newWidth = size.width * zoomScale;
    const newHeight = size.height * zoomScale;

    const scale = Math.min(max / size.width, max / size.height, 1); // FIXED

    setCanvasSize({
      width: newWidth * scale,
      height: newHeight * scale,
    });
  }, [dividerX, size]);


  useEffect(() => {

    if (activePanel2 === "Insert Page") {

      setActiveCanvas(prev => [...prev, prev.length]);
      setActivePanel2(null);
      setSelectedCanavs(activeCanvas.length);
    }

    if (activePanel2 === "Layers" && activePanel !== "Layers") {

      setActivePanel("Layers");
    }
    if (activePanel2 === "Design") {


      setselectedElement(null);
    }
    if (activePanel2 === "Downlode") {
      setselectedElement(null);
      setTimeout(() => {
        downlodeFullDesign(editorRef, bgColor, setActivePanel2);
      }, 50);

    }


  }, [activePanel2])


  useEffect(() => {

    if (activePanel !== "Layers") {
      setActivePanel2(null);
    }

  }, [activePanel])

  const addImageToCanvas = (x, y, imageSrc) => {
    pastRef.current.push([...droppedImages]);
    const updatedArray = [...droppedImages, {
      id: Date.now() + Math.random() // simple unique‐enough key

      , x, y, imageSrc, type: "image",
      editSettings: {
      whiteBalance: [],
      light: [],
      color: [],
      texture: [],
      opacity: 100,
    }


    }];
  futureRef.current = [];
  dispatchUpdatedArray(updatedArray);

}
const addTextToCanvas = (x, y, text) => {
  pastRef.current.push([...droppedImages]);


  const updatedArray = [...droppedImages, {
    id: Date.now(), x, y, text, type: "text",
    settings: {
      color: droppedTextSettings.color,
      stroke: droppedTextSettings.stroke,
      size: droppedTextSettings.size,
      shadow: droppedTextSettings.shadow,
      opacity: droppedTextSettings.opacity,
      ShadowColor: droppedTextSettings.ShadowColor,
      LineHeight: droppedTextSettings.LineHeight
    }, editSettings: {
      whiteBalance: [],
      light: [],
      color: [],
      texture: [],
    }



  }];

  dispatchUpdatedArray(updatedArray);
  futureRef.current = [];
}

const handleImageDrop = (e) => {
  const imageSrc = e.dataTransfer.getData("ImageSrc");

  if (!imageSrc) return;
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  addImageToCanvas(x, y, imageSrc);


}


return (
  <div className={`p-[1rem] flex flex-col overflow-x-hidden `}>

    <ToolBoxMd setBgColor={setBgColor} activePanel2={activePanel2} setActivePanel2={setActivePanel2} DesignRef={DesignRef} />


    {/* maindiv */}
    <div className='flex items-center overflow-x-hidden' >

      {/* <bigToolbox div */}
      <BigToolBox bgColor={bgColor} pastRef={pastRef} futureRef={futureRef} activePanel={activePanel} activePanel2={activePanel2} setActivePanel={setActivePanel} setActivePanel2={setActivePanel2} />

      <div className='flex flex-col w-full ' >

        {/* smalltool box and canvas div */}
        <div className='w-full flex flex-col  max-h-[45rem] overflow-x-auto ' >

          {/* smallToolBox */}
          <SmallToolBox setBgColor={setBgColor} activePanel2={activePanel2} setActivePanel2={setActivePanel2} DesignRef={DesignRef} />

          {/* canvas */}
          <div className='h-screen  flex  justify-center  overflow-hidden '>

            {/* scrollable wrapper */}
            <div className={` flex flex-col gap-[1rem] ${activeCanvas.length <= 1 ? "justify-center" : "justify-normal"}  items-center `}>

              <div ref={editorRef} id="editorContainer" className='flex flex-col gap-[1rem] justify-center items-center CanvasHolder'>

                {activeCanvas.map((canvasIndex) => {

                  return <div key={canvasIndex}
                    onMouseDown={(e) => { if (e.target.tagName !== "IMG" && e.target.tagName !== "P") setselectedElement(null) }}
                    style={{
                      width: `${canvasSize.width}px`,
                      height: `${canvasSize.height}px`,
                    }} onClick={() => setSelectedCanavs(canvasIndex)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleImageDrop}
                    className='relative overflow-hidden '>

                    {moveableTarget && (
                      < Moveable target={moveableTarget}
                        draggable
                        resizable
                        rotatable
                        throttleDrag={0}
                        renderDirections={["nw", "ne", "sw", "se", "n", "s", "e", "w"]}

                        onDrag={({ target, left, top }) => {
                          target.style.left = `${left}px`;
                          target.style.top = `${top}px`;

                          if (selectedElement) {
                            const updated = droppedImages.map((item) =>
                              item.id === selectedElement.id
                                ? { ...item, x: left, y: top }
                                : item
                            );
                            dispatch(setLayers(updated));
                          }
                        }}

                        onResize={({ target, width, height }) => {
                          target.style.width = `${width}px`;
                          target.style.height = `${height}px`;

                        }}
                        onRotate={({ target, beforeRotate }) => {
                          target.style.transform = `rotate(${beforeRotate}deg)`
                        }}
                      />)}



                    {/* bgcanvas */}
                    {droppedImages.map((item) => {

                      const appliedFilter = PercentageToCssFilter(item.editSettings);
                      if (item.type === "image") {
                        return <div key={item.id}>

                          <img
                            onClick={() => {
                              setselectedElement(item),
                                dispatch(updateEditSetting({
                                  selectedElement: item,
                                  edit: { ...item.editSettings }
                                }));
                            }}
                            ref={(ref) => (imageRef.current[item.id] = ref)}

                            src={item.imageSrc}
                            style={{
                              position: "absolute",
                              top: `${item.y}px`,
                              left: `${item.x}px`,
                              width: '300px',
                              userSelect: "none",
                              outline: "none",
                              filter: appliedFilter,
                              opacity: item.editSettings.opacity / 100
                            }}
                            className='cursor-move z-5 '
                          >
                          </img>
                        </div>
                      }
                      if (item.type === "text") {
                        const isEditing = textEditing === item.id;
                        return <p
                          contentEditable={isEditing} suppressContentEditableWarning={isEditing}
                          onClick={() => {
                            setselectedElement(item);
                            dispatch(updateTextSettings({
                              color: item.settings.color,
                              stroke: item.settings.stroke,
                              size: item.settings.size,
                              shadow: item.settings.shadow,
                              opacity: item.settings.opacity,
                              ShadowColor: item.settings.ShadowColor,
                              LineHeight: item.settings.LineHeight,
                            }));

                          }
                          }
                          ref={(ref) => (textRef.current[item.id] = ref)} key={item.id}

                          onDoubleClick={(e) => {
                            setselectedElement(null);
                            setTextEditing(item.id);

                            setTimeout(() => {
                              e.target.focus();
                              document.execCommand("selectAll", false, null);
                            }, 0);
                          }}

                          onTouchEnd={(e) => {
                            const now = Date.now();
                            if (now - lastTapRef.current < 300) {


                              setselectedElement(null);
                              setTextEditing(item.id);

                              setTimeout(() => {
                                e.target.focus();
                                document.execCommand("selectAll", false, null);
                              }, 0);
                            }
                            lastTapRef.current = now;
                          }}
                          onBlur={() => {
                            setTextEditing(null);

                          }}

                          style={{
                            filter: appliedFilter,
                            userSelect: 'none', left: `${item.x}px`, top: `${item.y}px`, position: 'absolute',
                            color: `${item.settings.color}`, opacity: `${item.settings.opacity}%`, textShadow: `${item.settings.shadow}px ${item.settings.shadow}px ${item.settings.shadow / 2}px ${item.settings.ShadowColor}`
                            , fontSize: `${item.settings.size}px`, fontWeight: Math.min(item.settings.stroke * 10, 900)
                          }} className={`${isEditing && 'outline-[0.1rem] outline-amber-500'}  z-5 cursor-${textEditing ? "text" : "move"} `} >{item.text}</p>

                      }



                    })}




                    <canvas width={canvasSize.width}
                      height={canvasSize.height} style={{

                        backgroundImage: showGrid
                          ? `linear-gradient(to right,#ccc 1px,transparent 1px),
                          linear-gradient(to bottom,#ccc 1px, transparent 1px )`: "none",
                        backgroundSize: `20px 20px`,
                        position: "absolute", top: 0, left: 0, zIndex: 0,
                        backgroundColor: `${bgColor}`

                      }}

                      className={`bg-white cursor-pointer   `} >

                    </canvas>


                    {/* drawing canvas */}
                    <canvas width={canvasSize.width}
                      height={canvasSize.height} onClick={() => setSelectedCanavs(canvasIndex)} style={{
                        backgroundImage: showGrid
                          ? `linear-gradient(to right,#ccc 1px,transparent 1px),
                          linear-gradient(to bottom,#ccc 1px, transparent 1px )`: "none",
                        backgroundSize: `20px 20px`,
                        position: "absolute", top: 0, left: 0, zIndex: 6,
                        touchAction: "none"
                      }}
                      onPointerDown={(e) => {
                        if (activePanel2 !== "Design") return;

                        e.preventDefault();
                        const canvasEl = e.currentTarget;
                        canvasEl.setPointerCapture(e.pointerId);           // ← capture
                        DesignRef.current?.startDraw(e, canvasEl);
                      }}
                      onPointerMove={(e) => {
                        if (activePanel2 !== "Design") return;

                        e.preventDefault();
                        DesignRef.current?.draw(e, e.currentTarget);
                      }}
                      onPointerUp={(e) => {
                        if (activePanel2 !== "Design") return;
                        e.preventDefault();
                        const canvasEl = e.currentTarget;
                        DesignRef.current?.endDraw(e, canvasEl);
                        canvasEl.releasePointerCapture(e.pointerId);       // ← release
                      }}
                      onPointerCancel={(e) => {
                        if (activePanel2 !== "Design") return;
                        e.currentTarget.releasePointerCapture(e.pointerId);
                        DesignRef.current?.endDraw(e, e.currentTarget);
                      }}

                      className={`bg-transparent  ${activePanel2 === "Design" ? " cursor-pointer pointer-events-auto " : "pointer-events-none"}  `} >

                    </canvas>

                  </div>

                })}



              </div>


            </div>

          </div>



        </div>
      </div>
    </div>

    {/* bottom tools div */}
    <BottomToolBox activeCanvas={activeCanvas} dividerX={dividerX} setDividerX={setDividerX} showGrid={showGrid} setShowGrid={setShowGrid} />

  </div>
)

}
export default Editor
