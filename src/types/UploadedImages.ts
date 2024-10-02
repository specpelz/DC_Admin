export interface UploadedImagesProps {
  isUploading: boolean;
  setIsUploading: (isUploading: boolean) => void;
  setUploadedData: (uploadedData: boolean) => void;
}

export interface UploadedContentProps {
  setIsUploading: (isUploading: boolean) => void;
  setUploadedData: (uploadedData: boolean) => void;
  setIsEditing: (uploadedData: boolean) => void;
}
