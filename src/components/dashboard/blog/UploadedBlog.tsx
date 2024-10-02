import {

  useState,
} from "react";

import { Button, Pagination, Modal } from "antd";
import { IoSearch } from "react-icons/io5";
import {
  MdOutlineDeleteOutline,
  MdOutlineModeEditOutline,
} from "react-icons/md";


import useBlogStore from "@store/blog";



interface imageData_type{
    src:string;
    title:string;
    content:string;
}




const UploadedBlog = (
  {
    // isUploading,
    //   setIsUploading,
    //   setUploadedData,
  }
) => {

    let imageData:imageData_type[]=[]
    
    // useEffect(()=>{

  for(let i = 0; i < 40; i++){
    imageData.push( {
        src: "/blogImage.png",
    
        title: "Africa Internet Governance Forum Abuja 202"+i,
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bureau except for the care and nutrition. Now put some chili orange couch. How sad players of bananas weekend. No bananas airline blockage. Unfortunately, from the Pakistan, and that it is not the mass of dui fringilla consectetur. Gluten. However, the scent like a pool or sit nor was warm. But the skirt, but graduated. Homework is important members of the football. Peanut homework now, real estate and at dui, the valley is always laughter. The undergraduate basketball land mass receives the vehicles football",
      })
  }

    // },[])


  const set_component = useBlogStore((state) => state.set_component);

  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    title: string;
  } | null>(null);

  const imagesPerPage = 5;

  const handleUploadClick = () => {
    set_component({ value: "upload" });
    // setUploadedData(false);
    // setIsUploading(true);
  };

  const showDeleteModal = (image: { title: string }) => {
    setSelectedImage(image);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedImage(null);
  };

  const handleDelete = () => {
    // Add delete logic here
    console.log("Deleted:", selectedImage?.title);
    setIsModalVisible(false);
    setSelectedImage(null);
  };

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = imageData.slice(indexOfFirstImage, indexOfLastImage);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      {/* {isUploading && ( */}
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
      {/* // )} */}

      <div className="bg-[#fff] my-[16px] py-[30px] px-[20px] rounded-[4px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 justify-center">
          {currentImages.map((item, index) => (
            <div
              key={index}
              className="w-[248px] h-[220px] flex flex-col gap-2 relative"
            >
              <div
                className="absolute top-4 right-[45px] bg-[#fff] w-[26px] h-[26px] rounded-full flex justify-center items-center cursor-pointer"
                onClick={() => showDeleteModal(item)}
              >
                <MdOutlineDeleteOutline size={16} color="#9B9B9B" />
              </div>
              <div
                className="absolute top-4 right-4 bg-[#fff] w-[26px] h-[26px] rounded-full flex justify-center items-center cursor-pointer"
                onClick={() => showDeleteModal(item)}
              >
                <MdOutlineModeEditOutline size={16} color="#9B9B9B" />
              </div>
              <img src={item.src} alt="image" className="rounded-[14px]" />
              <p className="text-[14px] font-[500]">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Pagination
          current={currentPage}
          pageSize={imagesPerPage}
          total={imageData.length}
          onChange={onPageChange}
        />
      </div>

      <Modal
        title={
          <h2 className="text-Twenty font-[500]">
            Delete "{selectedImage?.title}"?
          </h2>
        }
        open={isModalVisible}
        centered
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel} className="w-[30%]">
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            danger
            onClick={handleDelete}
            className="w-[30%]"
          >
            Delete
          </Button>,
        ]}
      >
        <p className="text-Sixteen font-[400]">
          Are you sure you want to delete the{" "}
          <span className="font-Sixteen font-[600]">
            "{selectedImage?.title}"
          </span>
          ?
          <br />
          This action is irreversible, and all associated records will be
          permanently removed from the system. Please confirm your choice.
        </p>
      </Modal>
    </>
  );
};

export default UploadedBlog;
