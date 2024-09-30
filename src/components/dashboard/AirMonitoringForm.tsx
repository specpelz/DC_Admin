import Select from "./select/Select";

const AirMonitoringForm = () => {
  return (
    <div className="w-full h-[492px] bg-white rounded-[4px] p-[20px]">
      <div className="flex gap-x-[27px]">
        <div className="w-[50%]">
        <Select name="country" />
        </div>
        <div className="w-[50%]">
        <Select name="country" />
        </div>

      </div>
    </div>
  );
};

export default AirMonitoringForm;
