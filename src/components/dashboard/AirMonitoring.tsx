import NoData from "./NoData";

const AirMonitoring = () => {
  const handleUploadClick = () => {
    alert("working");
  };
  return (
    <div>
      <div className="text-[20px] font-[600] text-BrandBlack1">
        Air Monitoring
      </div>
      <NoData
        buttonFunction={handleUploadClick}
        title="No Data Uploaded"
        message="Start Uploading Data"
        buttonText="Upload Data"
      />
    </div>
  );
};

export default AirMonitoring;
