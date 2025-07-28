

const PercentageToCssFilter = (edit) => {
if(!edit)return;

const getValue=(group,name,def=50)=>{
if(!group)return def;

const found=group.find((item)=>item.name===name);
if(!found) return def;

return found.value;

}

// Extract values from the edit object
  const brightness = getValue(edit.light, "Brightness") / 50;
  const contrast = getValue(edit.light, "Contrast") / 50;
  const opacity = getValue(edit.light, "Opacity", 100) / 100;

  const saturation = getValue(edit.color, "Saturation") / 50;
  const grayscale = getValue(edit.color, "Grayscale", 0) / 100;
  const sepia = getValue(edit.color, "Sepia", 0) / 100;
  const invert = getValue(edit.color, "Invert", 0) / 100;

  const temperature = getValue(edit.whiteBalance, "Temperature");
  const tint = getValue(edit.whiteBalance, "Tint");
  const hueRotate = ((temperature + tint) / 100) * 360;

  const blur = getValue(edit.texture, "Blur", 0) / 10;


 // Build the CSS filter string
  const filterString = `
    brightness(${brightness})
    contrast(${contrast})
    opacity(${opacity})
    saturate(${saturation})
    grayscale(${grayscale})
    sepia(${sepia})
    invert(${invert})
    hue-rotate(${hueRotate}deg)
    blur(${blur}px)
  `.trim();

  return filterString;

}

export default PercentageToCssFilter;
