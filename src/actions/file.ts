
import {Cloudinary} from "@cloudinary/url-gen";
// import {CloudinaryImage} from '@cloudinary/url-gen';

// const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
// const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;
// const API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY;
// const API_SECRET = import.meta.env.VITE_CLOUDINARY_API_SECRET;

const cloudName = import.meta.env.VITE_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;
const apiKey = import.meta.env.VITE_CLOUD_NAME;
const apiSecret = import.meta.env.VITE_UPLOAD_PRESET;


export const cld = new Cloudinary({
  cloud: {
    cloudName
  }
});





export const uploadFile = async (file: File, folder: string) => {
  if (!file) return null;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  formData.append('folder', folder);
  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
};





export const fetchImagesFromFolder = async (folder: string) => {
  const params = new URLSearchParams({
    type: 'upload',
    prefix: folder,
    max_results: '500'
  });

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image?${params}`;
  
  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${btoa(`${apiKey}:${apiSecret}`)}`,
      // Authorization: `Basic ${btoa(`${import.meta.env.VITE_CLOUDINARY_API_KEY}:${import.meta.env.VITE_CLOUDINARY_API_SECRET}`)}`
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.resources;
};





// export const readAllImages = async (folder: string)=>{
//   try {
//   const {resources} = await cloud.api.resources({
//     prefix:folder,
//     resource_type:"image",
//     type:"upload"
//   }) as {resources: UploadApiResponse[]}
//   const the_images = resources.map(({secure_url})=> secure_url)
//   console.log(the_images)
//   return the_images
//   }
//   catch(error){
// console.log(error)
//   }
// return []
// }




export const deleteImage = async (publicId: string) => {
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

  const formData = new FormData();
  formData.append('public_id', publicId);

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Basic ${btoa(`${apiKey}:${apiSecret}`)}`
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};