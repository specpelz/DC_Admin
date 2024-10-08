export interface UploadedImagesProps {
  isUploading: boolean;
  setIsUploading: (isUploading: boolean) => void;
  setUploadedData: (uploadedData: boolean) => void;
  images: Array<{
    id: string;
    media: string;
    mediaKey: string;
    createdAt: string;
    updatedAt: string;
  }>;
  loadingImages: boolean;
  setImages: (
    images: Array<{
      id: string;
      media: string;
      mediaKey: string;
      createdAt: string;
      updatedAt: string;
    }>
  ) => void; 
}

export interface UploadedContentProps {
  setIsUploading: (isUploading: boolean) => void;
  setUploadedData: (uploadedData: boolean) => void;
  setIsEditing: (uploadedData: boolean) => void;
}
