import NoData from "@components/dashboard/NoData";

const Multimedia = () => {
  const handleUploadClick = () => {
    alert("working");
  };
  return (
    <div>
      <div className="text-[20px] font-[600] text-BrandBlack1">Multimedia</div>
      <NoData
        buttonFunction={handleUploadClick}
        title="No Image Uploaded"
        message="Start Uploading Images"
        buttonText="Upload Image"
      />
    </div>
  );
};

export default Multimedia;
