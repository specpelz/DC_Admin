import { BASE_URL } from "@api/index";
import NoData from "@components/dashboard/NoData";
import UploadMessage from "@components/dashboard/UploadMessage";
import { Button } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlineCloudUpload } from "react-icons/md";
import UploadedImages from "./UploadedImages";
import { ImageType } from "../../types/ImageType";

const Multimedia = () => {
  const token = localStorage.getItem("DC_Token") || "";
  const [imageDetails, setImageDetails] = useState<{
    name: string;
    size: string;
    file: File;
  } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadedData, setUploadedData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingImages, setLoadingImages] = useState(true);
  const [images, setImages] = useState<ImageType[]>([]);

  const handleUploadClick = () => {
    setIsUploading(true);
    setImageDetails(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageDetails({
        name: file.name,
        size: `${(file.size / 1024).toFixed(2)} KB`,
        file, // Add the file object here
      });
    }
  };

  const handleRemoveImage = () => {
    setImageDetails(null);
    setIsUploading(false);
  };

  const HandleRemoveUploadMessage = () => {
    setUploadSuccess(false);
  };

  const handleUploadImage = async () => {
    if (!imageDetails?.file) return;

    // Create a new FormData object
    const formData = new FormData();
    // Append the image file to the form data
    formData.append("file", imageDetails.file);

    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/multimedia`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle successful upload
      console.log("Image uploaded successfully", response);
      if (response.data.status === "success") {
        setUploadSuccess(true);
        setTimeout(() => {
          setUploadSuccess(false);
          setUploadedData(true);
          setImageDetails(null);
        }, 2000);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.response?.data.message || "Error uploading image");
      setUploadSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      setLoadingImages(true);
      try {
        const response = await axios.get(`${BASE_URL}/multimedia`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("fetchImages", response);

        if (response.data.status === "success") {
          setImages(response.data.data);
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast.error(error?.response?.data.message || "Error fetching image");
      } finally {
        setLoadingImages(false);
      }
    };

    fetchImages();
  }, [token, uploadedData]);

  return (
    <div>
      <div className=" pb-[16px]">
        {isUploading && !uploadedData ? (
          <div className="flex w-full justify-between items-center">
            <h2 className="text-[20px] font-[600] text-BrandBlack1">
              Upload Image{" "}
            </h2>
            {uploadSuccess && (
              <UploadMessage
                imageName={imageDetails && imageDetails.name}
                onClose={HandleRemoveUploadMessage}
              />
            )}
          </div>
        ) : (
          <h2 className="text-[20px] font-[600] text-BrandBlack1">
            Multimedia
          </h2>
        )}
      </div>

      {isUploading && !uploadedData ? (
        <div>
          <div className="bg-[#fff] py-[40px] px-[20px] h-[435px] rounded-[4px]">
            <div className="flex flex-col justify-center items-center h-full ">
              <div
                onChange={handleFileChange}
                className="relative flex flex-col justify-center items-center mt-[20px] w-full h-full cursor-pointer border-[1.5px] border-BrandBorderGray border-dashed rounded-[10px]"
              >
                <MdOutlineCloudUpload size={40} color="#9B9B9B" />
                <h4 className="text-Fourteen md:text-Sixteen font-[400] text-BrandBlack1 mt-[10px]">
                  Drop your image file here{" "}
                  <span className="text-BrandPrimary text-Fourteen md:text-Sixteen font-[500]">
                    browse here
                  </span>
                </h4>
                <p className="text-Fourteen text-BrandLighterGray font-[400]">
                  Maximum upload files less than 30mb
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-ful opacity-0 cursor-pointer"
                />
              </div>

              <div className="flex justify-between items-center w-full mt-2">
                {imageDetails && (
                  <div className="text-[14px] flex items-center gap-2 font-[600] text-BrandBlack1">
                    <IoDocumentTextOutline size={40} color="#9B9B9B" />
                    <div>
                      <p className="text-[14px] text-BrandBlack1">
                        {imageDetails ? imageDetails.name : "No Image Uploaded"}
                      </p>
                      <div className="text-[14px] text-BrandTextColor mt-[4px]">
                        {imageDetails ? imageDetails.size : ""}
                      </div>
                    </div>
                  </div>
                )}

                {imageDetails && (
                  <button
                    onClick={handleRemoveImage}
                    className="p-2 bg-white rounded-full border border-gray-300 hover:bg-gray-100"
                  >
                    <AiOutlineClose size={24} color="#FF0000" />
                  </button>
                )}
              </div>
              <div className="w-full flex justify-end items-end mt-[32px]">
                <Button
                  onClick={handleUploadImage}
                  type="primary"
                  className="w-[234px] h-[48px] text-[16px] font-[400]  bg-BrandPrimary"
                  disabled={!imageDetails}
                  loading={loading}
                >
                  <div className="text-[16px] font-[400]">Upload Image</div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {images && images.length > 0 ? (
            <UploadedImages
              setUploadedData={setUploadedData}
              isUploading={isUploading}
              setIsUploading={setIsUploading}
              images={images}
              loadingImages={loadingImages}
              setImages={setImages}
            />
          ) : images && images.length === 0 ? (
            <NoData
              buttonFunction={handleUploadClick}
              title="No Image Uploaded"
              message="Start Uploading Images"
              buttonText={`${
                loadingImages ? "Uploading Images..." : "Upload Image"
              }`}
              loading={loadingImages}
            />
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
};

export default Multimedia;
