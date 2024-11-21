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

export interface ContentDetail {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface UploadedContentProps {
  setIsUploading: (isUploading: boolean) => void;
  setUploadedData: (uploadedData: boolean) => void;
  setEditData: (updatedData: boolean) => void;
  setIsEditing: (isEditing: boolean) => void;
  ContentDetails: ContentDetail[];
  LoadingContentDetails: boolean;
  handleEditContent: (content: ContentDetail) => void;
  selectedContentId: string | null;
  setSelectedContentId: (id: string | null) => void;
  fetchContentDetails: () => void;
}
