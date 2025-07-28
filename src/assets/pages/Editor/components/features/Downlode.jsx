import axios from 'axios';
import { toPng } from 'html-to-image';
import toast from 'react-hot-toast';
const downlodeFullDesign = async (editorRef, bgColor, setActivePanel2) => {
  const BackendUrl = import.meta.env.VITE_BACKEND_URL;

  if (!editorRef.current) return;

  const token = localStorage.getItem("token");

  try {
    const dataUrl = await toPng(editorRef.current, {
      backgroundColor: bgColor,
      cacheBust: true,
    });
    const link = document.createElement('a');
    link.download = 'my-design.png';
    link.href = dataUrl;
    link.click();

    toast.success("Download started");
    const blob = await (await fetch(dataUrl)).blob();
    const formdata = new FormData();
    formdata.append("file", blob, "My-design.png");

    const url = `${BackendUrl}/editor/SaveDownloades`;
    const res = await toast.promise(axios.post(url, formdata, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    }), {
      loading: 'Saving...',
      success: <b>Image saved in gallery!</b>,
      error: <b>Sorry,can't save image.</b>,
    });
    if (res.status === 200) {

      setActivePanel2(false);
    }

  } catch (err) {
    console.error('html-to-image error:', err);
  }
};

export default downlodeFullDesign