import React from "react";
import {
  Button,
  DatePicker,
  Divider,
  Input,
  Modal,
  Skeleton,
  Space,

} from "antd";
import AirMonitoringTable from "./AirMonitoringTable";
import { useEffect, useState } from "react";
import Select from "../../components/dashboard/select/Select";
import useAirMonitoringStore from "@store/airMonitoring";
import Select_v2 from "@components/dashboard/select/Select_v2";
import type { Dayjs } from "dayjs";
import { CSVLink } from "react-csv";
// import { usePDF } from "react-to-pdf";
import toast from "react-hot-toast";
import moment from "moment";
import { data_type, FlattenedDataType } from "../../types/airMonitoringDataType";
import { MdClear } from "react-icons/md";
const { RangePicker } = DatePicker;

interface FilterValues {
  dateRange: [Dayjs | null, Dayjs | null];
  date: Dayjs | null;
  serial_number: string | null;
  location: string | null;
}

interface SelectOption {
  value: string;
  label: string;
  key: string;
}

// interface ref_type {
//   ref?: React.ForwardedRef<HTMLDivElement>;
// }

// Define the props interface
interface AirMonitoringTableTopProps {
  isLoading: boolean; // Define isLoading as a boolean
}

const AirMonitoringTableTop: React.FC<AirMonitoringTableTopProps> = ({
  isLoading,
}) => {
  // const airMonitoringData = useAirMonitoringStore((state) => state.air_monitoring_data);
  // Handle download click
  const handleDownload = () => {
    if (fileType === "csv") {
    
      toast.success("Downloading CSV!", {
        duration: 2000,
        position: 'bottom-center',
        style: {
          background: '#4CAF50',
          color: 'white',
          fontWeight: 'bold',
          padding: '12px 20px',
          borderRadius: '8px'
        },
        // icon: '✅',
      });
    } else if (fileType === "excel") {
    

      toast.success("Downloading Excel!", {
        duration: 2000,
        position: 'bottom-center',
        style: {
          background: '#4CAF50',
          color: 'white',
          fontWeight: 'bold',
          padding: '12px 20px',
          borderRadius: '8px'
        },
        // icon: '✅',
      });
      // toPDF();
    }
    setIsModalVisible(false);
  };

  const [isFilterActive, setIsFilterActive] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const [csvItems, setCsvItems] = useState<FlattenedDataType[]>([]);
  const [filteredItems, setFilteredItems] = useState<data_type[]>([]);
  const [filter_input_values, set_filter_input_values] =
    useState<boolean>(false);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [showFilter_v2, setShowFilter_v2] = useState<boolean>(true);
  const [filterValues, setFilterValues] = useState<FilterValues>({
    dateRange: [null, null],
    date: null,
    serial_number:  null,
    location:  null,
  });

  const air_monitoring_data = useAirMonitoringStore(
    (state) => state.air_monitoring_data
  );











  useEffect(() => {
    const flattenedData = filteredItems.flatMap((item) => {
      // Flatten airReading
      const airReadingsFlattened = item.airReading.map((air) => ({
        deviceId: item.id,
        deviceUid: item.device_uid,
        serialNumber: item.serial_number,
        location: item.location,
        latitude: item.lat,
        longitude: item.lon,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        readingType: "Air Reading",
        readingId: air.id,
        aqi: Number(air.aqi), // Ensure number type
        humidity: Number(air.humidity), // Ensure number type
        pm01_0: Number(air.pm01_0), // Ensure number type
        pm02_5: Number(air.pm02_5), // Ensure number type
        pm10_0: Number(air.pm10_0), // Ensure number type
        pressure: Number(air.pressure), // Ensure number type
        temperature: Number(air.temperature), // Ensure number type
        voltage: Number(air.voltage), // Ensure number type
        captured: Number(air.captured), // Ensure number type
        readingCreatedAt: air.createdAt,
      }));
  
      // Flatten histories
      const historiesFlattened = item.histories.map((history) => ({
        deviceId: item.id,
        deviceUid: item.device_uid,
        serialNumber: item.serial_number,
        location: item.location,
        latitude: item.lat,
        longitude: item.lon,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        readingType: "History",
        readingId: history.id,
        aqi: Number(history.aqi), // Ensure number type
        humidity: null, // Histories don't have humidity
        pm01_0: Number(history.pm1_0), // Ensure number type
        pm02_5: Number(history.pm2_5), // Ensure number type
        pm10_0: Number(history.pm10_0), // Ensure number type
        pressure: null, // Histories don't have pressure
        temperature: null, // Histories don't have temperature
        voltage: null, // Histories don't have voltage
        captured: null, // Histories don't have captured
        readingCreatedAt: history.date,
      }));
  
      // Combine airReadings and histories
      return [...airReadingsFlattened, ...historiesFlattened];
    });
    setCsvItems(flattenedData);
  }, [filteredItems]);






  // Define headers for CSV
  const headers = [
    { label: "Device ID", key: "deviceId" },
    { label: "Device UID", key: "deviceUid" },
    { label: "Serial Number", key: "serialNumber" },
    { label: "Location", key: "location" },
    { label: "Latitude", key: "latitude" },
    { label: "Longitude", key: "longitude" },
    { label: "Device Created At", key: "createdAt" },
    { label: "Device Updated At", key: "updatedAt" },
    { label: "Reading Type", key: "readingType" },
    { label: "Reading ID", key: "readingId" },
    { label: "AQI", key: "aqi" },
    { label: "Humidity", key: "humidity" },
    { label: "PM01.0", key: "pm01_0" },
    { label: "PM02.5", key: "pm02_5" },
    { label: "PM10.0", key: "pm10_0" },
    { label: "Pressure", key: "pressure" },
    { label: "Temperature", key: "temperature" },
    { label: "Voltage", key: "voltage" },
    { label: "Captured", key: "captured" },
    { label: "Reading Created At", key: "readingCreatedAt" },
  ];











  // useEffect(() => {
  //   const flattenData = filteredItems.flatMap((item) =>
  //     (item.airReading).map((air) => ({
  //       ...item,
  //       airReadingId: air.id,
  //       aqi: air.aqi,
  //       humidity: air.humidity,
  //       pm01_0: air.pm01_0,
  //       pm02_5: air.pm02_5,
  //       pm10_0: air.pm10_0,
  //       pressure: air.pressure,
  //       temperature: air.temperature,
  //       voltage: air.voltage,
  //       captured: air.captured,
  //       airReadingCreatedAt: air.createdAt,
  //     }))
  //   );
  
  //   setCsvItems(flattenData);
  // }, [filteredItems]);


 










  // Initial data setup
  useEffect(() => {
    // set_air_monitoring_data(AQI_datas);
    setFilteredItems(air_monitoring_data);
  }, [air_monitoring_data]);

  const [communityOptions, setCommunityOptions] = useState<SelectOption[]>([]);
  const [locationOption, setLocationOption] = useState<SelectOption[]>([]);







  // const generateFilterOptions = () => {
  //   const uniqueOptions = (field: keyof (typeof filteredItems)[0]) => {
  //     return Array.from(new Set(filteredItems.map((item) => item[field]))).map(
  //       (value, key) => ({
  //         value: value,
  //         label: value,
  //         key: key.toString(),
  //       })
  //     );
  //   };

  //   setCountryOptions(uniqueOptions("country"));
  //   setStateOptions(uniqueOptions("state"));
  //   setLgaOptions(uniqueOptions("lga"));
  //   setCityOptions(uniqueOptions("city"));
  // };







 


  const generateFilterOptions = () => {
    // const processedData = filteredItems.map((data) => ({
    const processedData = air_monitoring_data.map((data) => ({
        ...data,
        serial_number: data.serial_number,
        location: data.location,
      }))
    
  
    const uniqueOptions = (field: keyof typeof processedData[0]) => {
      return Array.from(new Set(processedData.map((item) => item[field]  as string))).map(
        (value, key) => ({
          value: value,
          label: value,
          key: key.toString(),
        })
      );
    };
  
    setCommunityOptions(uniqueOptions("serial_number"));
    setLocationOption(uniqueOptions("location"));

  };












  useEffect(() => {
    if (showFilter) {
      generateFilterOptions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showFilter, filteredItems]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFilterChange = (value: any, field: keyof FilterValues) => {
    set_filter_input_values(true);
    setFilterValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };







  const applyFilter = async () => {
    const filteredData =  air_monitoring_data.map((item) => {
        const itemDate = moment(item.createdAt);
        
        const serial_number = item.serial_number
        const location = item.location
    
  
        const singleDateMatch =
          !filterValues.date ||
          new Date(item.createdAt).toDateString() ===
            filterValues.date.toDate().toDateString();
  
        const [startDate, endDate] = filterValues.dateRange;
        const dateRangeMatch =
          !startDate ||
          !endDate ||
          (itemDate.isSameOrAfter(startDate.toDate()) &&
            itemDate.isSameOrBefore(endDate.toDate()));
  
        const locationMatch = !filterValues.location || location === filterValues.location;
        const serialNumberMatch = !filterValues.serial_number || serial_number === filterValues.serial_number;
       
  
        return (
          dateRangeMatch &&
          singleDateMatch &&
          locationMatch &&
          serialNumberMatch 
      
            ? { ...item, serial_number, location }
            : null
        );
      })
  
  
    const finalFilteredData = filteredData.filter(Boolean) as data_type[];
  
    setFilteredItems(finalFilteredData);
    setShowFilter(false);
    setIsFilterActive(true);
  };









  const clearFilter = () => {
    setFilterValues({
      dateRange: [null, null],
      date: null,
      serial_number: null,
      location: null,

    });
    setFilteredItems(air_monitoring_data);
    setShowFilter_v2(false);

    setShowFilter(false);
    set_filter_input_values(false);
    setIsFilterActive(false);
  };

  useEffect(() => {
    clearFilter();
  }, []);
  const set_component = useAirMonitoringStore((state) => state.set_component);

  const clickFunction = () => {
    set_component({ value: "upload" });
  };

  // { value: "pdf", label: "PDF" },

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    console.log("Modal closed without confirmation");
  };

  // const {
    //  toPDF, 
    // targetRef } = usePDF({ filename: "page.pdf" });

  const [fileType, setFileType] = useState<string | number>("excel");

  const filterData = async () => {
    let result: data_type[] = air_monitoring_data;
  
    if (searchQuery) {
      const filteredResults: data_type[] = [];
  
      for (const item of result) {
        const serial_number = item.serial_number
        const location = item.location
        const matchesSearch = 
        serial_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.toLowerCase().includes(searchQuery.toLowerCase()) 
      
  
        if (matchesSearch) {
          filteredResults.push(item);
        }
      }
  
      result = filteredResults;
    }
  
    setFilteredItems(result);
  };
  
  useEffect(() => {
    filterData();
  }, [searchQuery, air_monitoring_data]);

  return (
    <div className="h-screen ">
      {/* SEARCH. FILTER, SHARE,DOWNLOAD COMPONENTS------------------------------------------------- */}
      <div className="w-full lg:flex items-center gap-x-[30px] mt-[16px]">
        <div className="flex gap-x-[16px] lg:w-[30%]">
           <div className="relative">
           <Input
            placeholder="Search for data... "
            prefix={
              <img
                src="/search.svg"
                alt="image"
                className="w-[17.5px] h-[17.5px]"
              />
            }
            className="h-[46px] w-[100%] bg-transparent"
            value={searchQuery}
            onChange={handleSearchChange}
          />
             {searchQuery.length > 0 ? (
                  <div
                    className="absolute right-[5px] top-[20%] z-[500] cursor-pointer"
                    onClick={() => {
                      setSearchQuery("");
                    }}
                  >
                    <MdClear color="red" size={30} />
                  </div>
                ) : (
                  ""
                )}
           </div>
       
          <Button
            type="primary"
            onClick={clickFunction}
            icon={
              <img
                src="/cross.svg"
                alt="Upload Icon"
                className="w-[14px] h-[14px]"
              />
            }
            style={{ width: 70 }}
            className="h-[46px]  lg:hidden bg-BrandPrimary"
          ></Button>
        </div>
        <div className="flex w-full mt-[20px] lg:w-[70%] lg:mt-[unset]">
          <div className="w-full lg:w-[70%]">
            <div className="flex items-center w-[100%] gap-x-[10px] lg:border-r-[0.5px] pr-[10px] lg:border-gray-300">
              <Button
                className={`h-[46px] w-[30%]   xl:w-[18%] ${
                  showFilter === true || isFilterActive === true
                    ? "bg-[white] border-w-[05px] border-blue-500"
                    : "bg-transparent"
                }`}
                onClick={() => {
                  setShowFilter(!showFilter);
                  setShowFilter_v2(true);
                }}
                icon={
                  <img
                    src="/funel.svg"
                    alt="image"
                    className="w-[17.5px] h-[17.5px]"
                  />
                }
              >
                Filter
              </Button>
         
              <Button
                className="h-[46px] w-[30%] xl:flex-grow bg-transparent"
                onClick={showModal}
                icon={
                  <img
                    src="/download.svg"
                    alt="image"
                    className="w-[17.5px] h-[17.5px]"
                  />
                }
              >
                Download
              </Button>
              {/* <Button
                className="h-[46px] w-[18%] bg-transparent"
                icon={
                  <img
                    src="/share.svg"
                    alt="image"
                    className="w-[17.5px] h-[17.5px]"
                  />
                }
              >
                Share
              </Button> */}
            </div>
          </div>
          <Button
            type="primary"
            onClick={clickFunction}
            icon={
              <img
                src="/cross.svg"
                alt="Upload Icon"
                className="w-[14px] h-[14px]"
              />
            }
            className="hidden lg:flex gap-x-[16px] w-[30%] h-[48px] text-[16px]  font-[400] bg-BrandPrimary"
          >
            Upload data
          </Button>
        </div>
      </div>
      {/* SEARCH. FILTER, SHARE,DOWNLOAD COMPONENTS ENDS HERE------------------------------------------------- */}

      <div className="mt-[16px] relative">
        {showFilter_v2 && (
          <div
            className={`absolute  w-full h-fit z-[999] px-[25px] bg-white ${
              showFilter === true ? "block" : "hidden"
            }`}
          >
            <div className="flex gap-x-[20px]  mt-[20px]">
              <div className="lg:w-[20%] ">
                <Space direction="vertical" className=" w-full">
                  <label
                    htmlFor="date-picker"
                    className="text-[16px] font-[400] text-BrandBlack1 "
                  >
                    Date
                  </label>
                  <DatePicker
                    className="h-[48px] w-full"
                    placeholder="Select date"
                    onChange={(date) => handleFilterChange(date, "date")}
                    value={filterValues.date}
                  />
                </Space>
              </div>
              <div className="lg:w-[20%] ">
                <Select_v2
                  name="community"
                  label="Community"
                  placeholder="Select community"
                  required={false}
                  options={communityOptions}
                  value={filterValues.serial_number || undefined}
                  onChange={(value) => handleFilterChange(value, "serial_number")}
                />
              </div>
              <div className="lg:w-[20%] ">
                <Select_v2
                  name="location"
                  label="Location"
                  placeholder="Select location"
                  required={false}
                  options={locationOption}
                  value={filterValues.location || undefined}
                  onChange={(value) => handleFilterChange(value, "location")}
                />
              </div>
      
         
            </div>
            <div className="lg:w-[40%]">
              <Space direction="vertical" className="w-full">
                <label
                  htmlFor="date-range-picker"
                  className="text-[16px] font-[400] text-BrandBlack1"
                >
                  Date Range
                </label>
                <RangePicker
                  className="h-[48px] w-full"
                  onChange={(dates) => handleFilterChange(dates, "dateRange")}
                  value={filterValues.dateRange}
                />
              </Space>
            </div>
            <Divider className="mt-[15px] mb-[10px]" />
            <div className="flex justify-end gap-x-[16px] mb-[20px]">
              <Button
                className="w-[234px] h-[48px] text-[16px] font-[400] bg-transparent text-[#9B9B9B]"
                onClick={clearFilter}
              >
                Cancel
              </Button>

                <Button
                  disabled={filter_input_values ? false : true}
                  // disabled={
                  //   isFilterActive ? true : filter_input_values ? false : true
                  // }
                  type="primary"
                  onClick={applyFilter}
                  className="w-[234px] h-[48px] text-[16px] font-[400]  bg-BrandPrimary"
                >
                  <div className="text-[16px] font-[400]">Apply Filter</div>
                </Button>
            
            </div>
          </div>
        )}

        {isLoading ? (
          <Skeleton
            active
            className="custom-table-skeleton"
            paragraph={{ rows: 5 }}
          />
        ) : (
          <div 
          // ref={targetRef}
          >
            <AirMonitoringTable
              // searchQuery={searchQuery}
              filtered={filteredItems}
            />
          </div>
        )}
      </div>

      <Modal
        title="Download File"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Download"
        okButtonProps={{
          style: { display: "none" },
          // style: { width: "150px" , height:"40px"}
        }}
        cancelButtonProps={{ style: { display: "none" } }}
        centered
      >
        <Divider className="mt-0" />
        <div className="w-full">
          <Select
            name="fileType"
            label="File Type"
            placeholder="Select file type"
            required={false}
            defaultValue="excel"
            options={[
              { value: "excel", label: "Excel" },
              { value: "csv", label: "CSV" },
            ]}
            onChange={(value) => setFileType(value)}
          />
        </div>

        <div className="flex justify-end">
          <Button
            // disabled={isFilterActive}
            type="primary"
            onClick={handleDownload}
            className="w-[150px] h-[40px] text-[16px] font-[400]  bg-BrandPrimary"
          >
         
              <CSVLink
                filename={"Air_monitoring_data.csv"}
           
                data={csvItems}
                headers={headers}
        
                className="btn btn-primary"
              >
                <div className="text-[16px] font-[400]">Download</div>
              </CSVLink>
          
            {/* {fileType === "csv" ? (
              <CSVLink
                filename={"Air_monitoring_data.csv"}
           
                data={csvItems}
                headers={headers}
        
                className="btn btn-primary"
              >
                <div className="text-[16px] font-[400]">Download</div>
              </CSVLink>
            ) : (
              <div className="text-[16px] font-[400]">Download</div>
            )} */}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AirMonitoringTableTop;
