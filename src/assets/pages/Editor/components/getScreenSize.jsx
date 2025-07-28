const getScreenSize=()=>{
const width=window.innerWidth;

if(width<768)return "small";
if(width<1024)return "medium";
return "large";


}

export default getScreenSize;