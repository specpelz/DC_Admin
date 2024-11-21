import { Dispatch, SetStateAction } from "react";

export interface ImageType {
  id: string;
  title: string;
  media: string;
  mediaKey: string;
  createdAt: string;
  updatedAt: string;
}

export interface UploadedImagesProps {
  setUploadedData: Dispatch<SetStateAction<boolean>>;
  isUploading: boolean; // Add this line
  setIsUploading: Dispatch<SetStateAction<boolean>>;
  images: ImageType[];
  loadingImages: boolean;
  setImages: Dispatch<SetStateAction<ImageType[]>>;
}