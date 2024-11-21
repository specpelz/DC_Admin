import { IoMdClose } from "react-icons/io";
import { FileUploader } from "react-drag-drop-files";
import { MdOutlineCloudUpload } from "react-icons/md";
// import GalleryImage from "./GalleryImage";
import {
  uploadFile,
  // fetchImagesFromFolder,
  // deleteImage,
  fetchImagesFromFolder,
  // readAllImages,
} from "../../../actions/file";
import { useEffect, useState } from "react";
import GalleryImage from "./GalleryImage";

interface Props {
  visible: boolean;
  onClose(state: boolean): void;
}

// const fileTypes = ["JPG", "PNG", "GIF"];

const ImageGallery = ({ visible, onClose }: Props) => {
  // const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // const [images, setImages] = useState<any[]>([]);
  // const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const FOLDER_NAME = "dcadmin-rich-editor-images";

  // console.log(file, "works like magic");

  useEffect(() => {
    if (visible) {
      fetchImages();
    }
  }, [visible]);

  // const fetchImages = async () => {
  //   try {
  //     const fetchedImages = await fetchImagesFromFolder(FOLDER_NAME);
  //     setImages(fetchedImages);
  //     console.log(fetchedImages)
  //   } catch (error) {
  //     console.error('Failed to fetch images:', error);
  //   }
  // };
  const fetchImages = async () => {
    try {
      const fetchedImages = await fetchImagesFromFolder(FOLDER_NAME);
      // setImages(fetchedImages);
      console.log("Be like say e dey work");
      console.log(fetchedImages);
    } catch (error) {
      console.error("Failed to fetch images:", error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // const handleImageSelect = (publicId: string) => {
  //   setSelectedImages((prev) =>
  //     prev.includes(publicId)
  //       ? prev.filter((id) => id !== publicId)
  //       : [...prev, publicId]
  //   );
  // };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // const handleDeleteSelected = async () => {
  //   for (const publicId of selectedImages) {
  //     try {
  //       await deleteImage(publicId);
  //     } catch (error) {
  //       console.error(`Failed to delete image ${publicId}:`, error);
  //     }
  //   }
  //   fetchImages(); // Refresh the image list
  //   setSelectedImages([]); // Clear selection
  // };

  const handleChange = async (file: File) => {
    setIsUploading(true);
    // setFile(file);
    if (file instanceof File && file.type.startsWith("image")) {
      try {
        const result = await uploadFile(file, FOLDER_NAME);
        console.log("Upload successful:", result);
        fetchImages();
      } catch (error) {
        console.error("Upload failed:", error);
      } finally {
        setIsUploading(false);
      }
    }
    console.log("===>>>>>>>>>>>>>>>>>");
  };

  const handleClose = () => {
    onClose(!visible);
  };

  if (!visible) return null;

  return (
    <div
      tabIndex={-1}
      onKeyDown={({ key }) => {
        if (key === "Escape") handleClose();
      }}
      className="fixed inset-0 bg-opacity-40 bg-black z-[999] backdrop-blur-sm flex items-center justify-center"
    >
      <div className="relative md:w-[760px] w-[80%] h-[80%] bg-white rounded-md p-4 overflow-y-auto ">
        <div className="absolute right-4 top-4 p-2 z-[999]">
          <button onClick={handleClose}>
            <IoMdClose size={24} />
          </button>
        </div>
        <FileUploader
          handleChange={handleChange}
          name="file"
          types={["png", "jpg", "jpeg", "webp"]}
        >
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-[#E6E6E6]  hover:bg-gray-100 ">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <MdOutlineCloudUpload size={40} color="#9B9B9B" />
                <p className="mb-2  text-gray-500 dark:text-gray-400 text-[16px]">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className=" text-gray-500 dark:text-gray-400 text-[16px]">
                  Image File
                </p>
              </div>
            </label>
          </div>
        </FileUploader>

        <p className="p-4 text-center text-2xl font-semibold opacity-45">
          No images to show...
        </p>
        <div className="gap-4 grid md:grid-cols-4 grid-cols-2 mt-4">
          <GalleryImage src="https://images.unsplash.com/photo-1719937206590-6cb10b099e0f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          <GalleryImage src="https://images.unsplash.com/photo-1719937051230-8798ae2ebe86?q=80&w=1772&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />

          {isUploading && (
            <div className="w-full aspect-square rounded animate-pulse bg-gray-200"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
