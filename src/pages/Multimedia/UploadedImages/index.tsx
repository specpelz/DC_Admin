import React, { useState } from "react";
import { UploadedImagesProps } from "../../../types/UploadedImages";
import { Button, Pagination } from "antd";
import { IoSearch } from "react-icons/io5";
import { MdOutlineDeleteOutline } from "react-icons/md";

const UploadedImages: React.FC<UploadedImagesProps> = ({
  isUploading,
  setIsUploading,
  setUploadedData,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 5; 

  const handleUploadClick = () => {
    setUploadedData(false);
    setIsUploading(true);
  };

  const imageData = [

    {
      src: "https://images.pexels.com/photos/27680935/pexels-photo-27680935/free-photo-of-a-woman-standing-outside-of-a-building-with-a-yellow-door.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "woman-standing-outside-of-a-building",
      description: "You are standing outside of a building",
    },
    {
      src: "https://images.pexels.com/photos/26836559/pexels-photo-26836559/free-photo-of-foamy-wave-crashing-onto-shore.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "woman-standing-outside-of-a-building",
      description: "Old man standing outside of a building",
    },
    {
      src: "https://images.pexels.com/photos/27680935/pexels-photo-27680935/free-photo-of-a-woman-standing-outside-of-a-building-with-a-yellow-door.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "woman-standing-outside-of-a-building",
      description: "Hen standing outside of a building",
    },
    {
      src: "https://images.pexels.com/photos/28297570/pexels-photo-28297570/free-photo-of-a-wooden-door-with-vines-growing-on-it.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "woman-standing-outside-of-a-building",
      description: "Cat standing outside of a building",
    },
    {
      src: "https://images.pexels.com/photos/27680935/pexels-photo-27680935/free-photo-of-a-woman-standing-outside-of-a-building-with-a-yellow-door.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "woman-standing-outside-of-a-building",
      description: "Boy standing outside of a building",
    },
    {
      src: "https://images.pexels.com/photos/17829466/pexels-photo-17829466/free-photo-of-view-of-birds-flying-over-a-beach-with-sea-stacks.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "woman-standing-outside-of-a-building",
      description: "Girl standing outside of a building",
    },
    {
      src: "https://images.pexels.com/photos/27680935/pexels-photo-27680935/free-photo-of-a-woman-standing-outside-of-a-building-with-a-yellow-door.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "woman-standing-outside-of-a-building",
      description: "Man standing outside of a building",
    },
    {
      src: "https://images.pexels.com/photos/8887894/pexels-photo-8887894.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "woman-standing-outside-of-a-building",
      description: "Woman standing outside of a building",
    },
    // Add more items as necessary
  ];

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = imageData.slice(indexOfFirstImage, indexOfLastImage);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      {isUploading && (
        <div className="flex flex-col lg:flex-row w-full gap-4 lg:gap-0 justify-between lg:items-center">
          <div
            className={`flex space-x-3 items-center px-[1.9rem] py-[1.3rem] w-full border border-BrandTextColor rounded-[8px] lg:w-[30%]`}
          >
            <IoSearch size={24} />
            <input
              type="text"
              className="text-[#000] bg-BrandLightPrimary border-BrandTextColor text-Sixteen outline-none w-[100%]"
              placeholder={"Search..."}
            />
          </div>

          <Button
            type="primary"
            onClick={handleUploadClick}
            className="lg:w-[234px] h-[48px] text-[16px] font-[400] bg-BrandPrimary"
          >
            <div className="flex gap-x-[16px] items-center">
              <img
                src="/cross.svg"
                alt="Upload Icon"
                className="w-[14px] h-[14px]"
              />
              <div className="text-[16px] font-[400]">Upload Image</div>
            </div>
          </Button>
        </div>
      )}

      <div className="bg-[#fff] my-[16px] py-[30px] px-[20px] rounded-[4px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 justify-center">
          {currentImages.map((item, index) => (
            <div
              key={index}
              className="w-[248px] h-[180px] flex flex-col gap-2 relative"
            >
              <div className="absolute top-4 right-4 bg-[#fff] w-[26px] h-[26px] rounded-full flex justify-center items-center cursor-pointer">
                <MdOutlineDeleteOutline size={16} color="#9B9B9B" />
              </div>
              <img src={item.src} alt={item.alt} className="rounded-[14px]" />
              <p className="text-[14px] font-[500]">{item.description}</p>
            </div>
          ))}
        </div>

       
      </div>

       {/* Ant Design Pagination */}
       <div className="mt-6 flex justify-end">
          <Pagination
            current={currentPage}
            pageSize={imagesPerPage}
            total={imageData.length}
            onChange={onPageChange}
          />
        </div>
    </>
  );
};

export default UploadedImages;
