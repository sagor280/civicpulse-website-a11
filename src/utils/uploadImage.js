import axios from "axios";

export const uploadImageToImgbb = async (imageFile) => {
  try {
    const image_API_URL = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_host
    }`;

    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await axios.post(image_API_URL, formData);

    return res.data.data.url; // Image URL
  } catch (error) {
    console.error("Image upload failed:", error);
    throw new Error("Image upload failed");
  }
};