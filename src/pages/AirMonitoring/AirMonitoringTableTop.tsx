import React  from "react"
import { Button, DatePicker, Divider, Input, Modal, Space } from "antd";
import AirMonitoringTable from "./AirMonitoringTable";
import { useEffect, useState } from "react";
import Select from "../../components/dashboard/select/Select";
import useAirMonitoringStore from "@store/airMonitoring";
import Select_v2 from "@components/dashboard/select/Select_v2";
import type { Dayjs } from 'dayjs';
import { CSVLink} from "react-csv";
import { usePDF } from 'react-to-pdf';
import toast from "react-hot-toast";
// import moment, { Moment } from "moment";



interface FilterValues {
  date: Dayjs | null;
  country: string | null;
  state: string | null;
  lga: string | null;
  city: string | null;
}

interface SelectOption {
  value: string;
  label: string;
  key: string;
}

// interface ref_type {
//   ref?: React.ForwardedRef<HTMLDivElement>;
// }


// interface DateRange {
//   fromDate: Moment | null;
//   toDate: Moment | null;
// }

const AirMonitoringTableTop = () => {



  
  // DATE RANGE FILTER FUNCTION FOR DOWNLOADING CSV FILE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // const [dateRange, setDateRange] = useState<DateRange>({
  //   fromDate: null,
  //   toDate: null
  // });


  // const getFilteredDataByDateRange = () => {
  //   if (!dateRange.fromDate || !dateRange.toDate) {
  //     return air_monitoring_data;
  //   }

  //   const fromDate = moment(dateRange.fromDate).startOf('day');
  //   const toDate = moment(dateRange.toDate).endOf('day');

  //   return air_monitoring_data.filter(item => {
  //     const itemDate = moment(item.createdAt);
  //     return itemDate.isBetween(fromDate, toDate, 'day', '[]');
  //   });
  // };





    // Handle date range changes
    // const handleDateRangeChange = (date: Moment | null, type: 'fromDate' | 'toDate') => {
    //   setDateRange(prev => ({
    //     ...prev,
    //     [type]: date
    //   }));
    // };




  // Validate date range
  // const isDateRangeValid = () => {
  //   if (!dateRange.fromDate || !dateRange.toDate) {
  //     return false;
  //   }
  //   return moment(dateRange.fromDate).isSameOrBefore(dateRange.toDate);
  // };



  // Handle download click
  const handleDownload = () => {
    if (fileType === "csv") {
      // if (!isDateRangeValid()) {
      //   toast.error("Please select a valid date range");
      //   return;
      // }
      // const message = "The file is downloading";
      // toast.success(message);
    } else if (fileType === "pdf") {
      toPDF();
    }
    setIsModalVisible(false);
  };





  // DATE RANGE FILTER FUNCTION FOR DOWNLOADING CSV FILE >>>>>>>>>>>>>>ENDS HERE>>>>>>>>>>>>>>>>>>>>>

 



  const [isFilterActive, setIsFilterActive] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };




  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [filterValues, setFilterValues] = useState<FilterValues>({
    date: null,
    country: null,
    state: null,
    lga: null,
    city: null
  });

   const air_monitoring_data = useAirMonitoringStore((state) => state.air_monitoring_data);
  const setFilteredData = useAirMonitoringStore((state) => state.setFilteredData);



  const [countryOptions, setCountryOptions] = useState<SelectOption[]>([]);
  const [stateOptions, setStateOptions] = useState<SelectOption[]>([]);
  const [lgaOptions, setLgaOptions] = useState<SelectOption[]>([]);
  const [cityOptions, setCityOptions] = useState<SelectOption[]>([]);





  const generateFilterOptions = () => {
    const uniqueOptions = (field: keyof typeof air_monitoring_data[0]) => {
      return Array.from(new Set(air_monitoring_data.map(item => item[field])))
        .map((value, key) => ({
          value: value,
          label: value,
          key: key.toString(),
        }));
    };

    setCountryOptions(uniqueOptions('country'));
    setStateOptions(uniqueOptions('state'));
    setLgaOptions(uniqueOptions('lga'));
    setCityOptions(uniqueOptions('city'));
  };



  useEffect(() => {
    if (showFilter) {
      generateFilterOptions();
    }
  }, [showFilter, air_monitoring_data]);



  const handleFilterChange = (value: any, field: keyof FilterValues) => {
    setFilterValues(prev => ({
      ...prev,
      [field]: value
    }));
  };





  const applyFilter = () => {
    const filteredData = air_monitoring_data.filter(item => {
      const dateMatch = !filterValues.date || 
        new Date(item.createdAt).toDateString() === filterValues.date.toDate().toDateString();
      const countryMatch = !filterValues.country || item.country === filterValues.country;
      const stateMatch = !filterValues.state || item.state === filterValues.state;
      const lgaMatch = !filterValues.lga || item.lga === filterValues.lga;
      const cityMatch = !filterValues.city || item.city === filterValues.city;

      return dateMatch && countryMatch && stateMatch && lgaMatch && cityMatch;
    });

    setFilteredData(filteredData);
    setShowFilter(false);
    setIsFilterActive(true); 
  };



  const clearFilter = () => {
    setFilterValues({
      date: null,
      country: null,
      state: null,
      lga: null,
      city: null
    });
    setFilteredData(air_monitoring_data);
    setShowFilter(false);
    setIsFilterActive(false); 
  };








  const set_component = useAirMonitoringStore(
    (state) => state.set_component
  );

 const clickFunction =()=>{
  set_component({value:"upload"})
 }




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

  // useEffect(() => {
  //   if (filterValues.country) {
  //     const filteredStates = air_monitoring_data
  //       .filter(item => item.country === filterValues.country)
  //       .map(item => item.state);
      
  //     const stateOptions = Array.from(new Set(filteredStates))
  //       .map((value, key) => ({
  //         value,
  //         label: value,
  //         key: key.toString(),
  //       }));
      
  //     setStateOptions(stateOptions);
  //   } else {
  //     generateFilterOptions(); // Reset to all options
  //   }
  // }, [filterValues.country]);



  const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});
  
const [fileType,setFileType]=useState<string | number>("pdf")
  return (
    <div className="h-screen ">
      {/* SEARCH. FILTER, SHARE,DOWNLOAD COMPONENTS------------------------------------------------- */}
      <div className="w-full flex items-center gap-x-[30px] mt-[32px]">
        <div className="w-[30%]">
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
        </div>
        <div className="flex w-[70%]">
          <div className="w-[70%]">
            <div className="flex items-center w-[100%] gap-x-[10px] border-r-[0.5px] pr-[10px] border-gray-300">
              <Button
                className={`h-[46px] w-[18%  ${showFilter === true || isFilterActive === true ?"bg-[white] border-w-[05px] border-blue-500":"bg-transparent"}`}                
                onClick={() => {
                  setShowFilter(!showFilter);
                 
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
              onClick={()=>toPDF()}
                className="h-[46px] w-[18% bg-transparent"
                icon={
                  <img
                    src="/print.svg"
                    alt="image"
                    className="w-[17.5px] h-[17.5px]"
                  />
                }
              >
                Print
              </Button>
              <Button
                className="h-[46px] flex-grow bg-transparent"
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
              <Button
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
              </Button>
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
            className="w-[30%] h-[48px] text-[16px] font-[400]  bg-BrandPrimary"
          >
            <div className="text-[16px] font-[400]">Upload data</div>
          </Button>
        </div>
      </div>
      {/* SEARCH. FILTER, SHARE,DOWNLOAD COMPONENTS ENDS HERE------------------------------------------------- */}

      <div className="mt-[16px] relative">
        {showFilter === true ? (
          <div className="absolute  w-full h-[209px] z-[999] px-[25px] bg-white">
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
                    onChange={(date) => handleFilterChange(date, 'date')}
                    value={filterValues.date}
                  />
                </Space>
              </div>
              <div className="lg:w-[20%] ">
                <Select_v2
                  name="country"
                  label="Country"
                  placeholder="Select country"
                  required={false}
                  options={countryOptions}
                  value={filterValues.country || undefined}
                  onChange={(value) => handleFilterChange(value, 'country')}
           
                />
              </div>
              <div className="lg:w-[20%] ">
                <Select_v2
                  name="state"
                  label="State"
                  placeholder="Select state"
                  required={false}
                  options={stateOptions}
                  value={filterValues.state || undefined}
                  onChange={(value) => handleFilterChange(value, 'state')}

                />
              </div>
              <div className="lg:w-[20%] ">
                <Select_v2
                  name="lga"
                  label="L.G.A"
                  placeholder="Select L.G.A"
                  required={false}
                  options={lgaOptions}
                  value={filterValues.lga || undefined}
                  onChange={(value) => handleFilterChange(value, 'lga')}
                />
              </div>
              <div className="lg:w-[20%] ">
                <Select_v2
                  name="city"
                  label="City"
                  placeholder="Select city"
                  options={cityOptions}
                  value={filterValues.city || undefined}
                  onChange={(value) => handleFilterChange(value, 'city')}
                />
              </div>
            </div>

            <Divider className="mt-[15px] mb-[10px]" />
            <div className="flex justify-end gap-x-[16px]">
              <Button className="w-[234px] h-[48px] text-[16px] font-[400] bg-transparent text-[#9B9B9B]"
            onClick={clearFilter}
              >
                Clear Filter
              </Button>
              <Button
              disabled={isFilterActive}
                type="primary"
                onClick={applyFilter}
                className="w-[234px] h-[48px] text-[16px] font-[400]  bg-BrandPrimary"
              >
                <div className="text-[16px] font-[400]">Apply Filter</div>
              </Button>
            </div>
          </div>
        ) : (
          ""
        )}


<div ref={targetRef}>
<AirMonitoringTable searchQuery={searchQuery} />
</div>

       



      </div>

      <Modal
        title="Download File"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Download"
        okButtonProps={{
          style: { display:"none"}
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
            defaultValue="pdf"
            options = {[
              { value: "pdf", label: "PDF" },
              { value: "csv", label: "CSV" },
            ]}
            onChange={(value)=>setFileType(value)}
          />
        </div>
        <div className="flex w-full gap-x-[30px]  mb-[28px]">
          <div className="w-[50%]">
            <Space direction="vertical" className=" w-full">
              <label
                htmlFor="date-picker"
                className="text-[16px] font-[400] text-BrandBlack1 "
              >
                From
              </label>
              <DatePicker
                className="h-[48px] w-full"
                placeholder="Select date"
                // value={dateRange.fromDate ? moment(dateRange.fromDate) : null}
                // onChange={(date) => handleDateRangeChange(date ? moment(date) : null, 'fromDate')}
              />
            </Space>
          </div>
          <div className="w-[50%]">
            <Space direction="vertical" className=" w-full">
              <label
                htmlFor="date-picker"
                className="text-[16px] font-[400] text-BrandBlack1 "
              >
                To
              </label>
              <DatePicker
                className="h-[48px] w-full"
                placeholder="Select date"
                // value={dateRange.toDate ? moment(dateRange.toDate) : null}
                // onChange={(date) => handleDateRangeChange(date ? moment(date) : null, 'toDate')}
              />
            </Space>
          </div>
        </div>
        <div className="flex justify-end">
        <Button
              // disabled={isFilterActive}
                type="primary"
                onClick={handleDownload}
                className="w-[150px] h-[40px] text-[16px] font-[400]  bg-BrandPrimary"
              >
                {
                  fileType === "csv" ? (    <CSVLink
                    filename={"Air_monitoring_data.csv"}
                    data={air_monitoring_data}
                    // data={getFilteredDataByDateRange()}
                    className="btn btn-primary"
                    onClick={()=>{
                      const message ="The file is downloading"
                      toast.success(message)
                    }}
                  >
                   <div className="text-[16px] font-[400]">Download</div>
                  </CSVLink>):  (<div className="text-[16px] font-[400]">Download</div>)
                  
                }

                
         
        


              </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AirMonitoringTableTop;
