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
import { usePDF } from "react-to-pdf";
import toast from "react-hot-toast";
import moment from "moment";
import { data_type } from "../../types/airMonitoringDataType";
const { RangePicker } = DatePicker;

interface FilterValues {
  dateRange: [Dayjs | null, Dayjs | null];
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
    } else if (fileType === "pdf") {
    

      toast.success("Downloading PDF!", {
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
      toPDF();
    }
    setIsModalVisible(false);
  };

  const [isFilterActive, setIsFilterActive] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const [csvItems, setCsvItems] = useState<data_type[]>([]);
  const [filteredItems, setFilteredItems] = useState<data_type[]>([]);
  const [filter_input_values, set_filter_input_values] =
    useState<boolean>(false);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [showFilter_v2, setShowFilter_v2] = useState<boolean>(true);
  const [filterValues, setFilterValues] = useState<FilterValues>({
    dateRange: [null, null],
    date: null,
    country: null,
    state: null,
    lga: null,
    city: null,
  });

  const air_monitoring_data = useAirMonitoringStore(
    (state) => state.air_monitoring_data
  );






  const getLocation = async (
    latitude: string, 
    longitude: string, 
    type: 'country' | 'state' | 'city' | 'lga'
  ): Promise<string> => {
    const lat = latitude;
    const long = longitude;
    const apiKey = "AIzaSyDzofLb9GTpwTJDg2U-l0Ez-Ya4iw5dVss";

    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const addressComponents = data.results[3]?.address_components || [];
        
        const componentMap: Record<string, string> = {};
        addressComponents.forEach((component: any) => {
          if (component.types.includes("country")) {
            componentMap['country'] = component.long_name;
          } else if (component.types.includes("administrative_area_level_1")) {
            componentMap['state'] = component.long_name;
          } else if (component.types.includes("administrative_area_level_2")) {
            componentMap['city'] = component.long_name;
          } else if (component.types.includes("administrative_area_level_3")) {
            componentMap['lga'] = component.long_name;
          }
        });

        return componentMap[type] || componentMap["state"];
      } else {
        console.log("No results found.");
        return data.results[3]?.address_components[0].componentMap["state"]
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
      return 'Unknown';
    }
  };









useEffect(() => {
  const fetchLocations = async () => {
    const newCSVData = await Promise.all(
      filteredItems.map(async (item) => ({
        id: item.id,
        device_uid: item.device_uid,
        country: await getLocation(item.lat, item.lon, "country"),
        state: await getLocation(item.lat, item.lon, "state"),
        city: await getLocation(item.lat, item.lon, "city"),
        lga: await getLocation(item.lat, item.lon, "country"),
        lat: item.lat,
        lon: item.lon,
        createdAt: moment(item.createdAt).format("YYYY-MM-DD"),
        updatedAt: moment(item.updatedAt).format("YYYY-MM-DD"),
      }))
    );

    setCsvItems(newCSVData);
  };

  fetchLocations();
}, [filteredItems]);









  // Initial data setup
  useEffect(() => {
    // set_air_monitoring_data(AQI_datas);
    setFilteredItems(air_monitoring_data);
  }, [air_monitoring_data]);

  const [countryOptions, setCountryOptions] = useState<SelectOption[]>([]);
  const [stateOptions, setStateOptions] = useState<SelectOption[]>([]);
  const [lgaOptions, setLgaOptions] = useState<SelectOption[]>([]);
  const [cityOptions, setCityOptions] = useState<SelectOption[]>([]);






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







 


  const generateFilterOptions = async () => {
    const processedData = await Promise.all(
      filteredItems.map(async (data) => ({
        ...data,
        country: await getLocation(data.lat, data.lon, "country"),
        state: await getLocation(data.lat, data.lon, "state"),
        city: await getLocation(data.lat, data.lon, "city"),
        lga: await getLocation(data.lat, data.lon, "lga"),
      }))
    );
  
    const uniqueOptions = (field: keyof typeof processedData[0]) => {
      return Array.from(new Set(processedData.map((item) => item[field]))).map(
        (value, key) => ({
          value: value,
          label: value,
          key: key.toString(),
        })
      );
    };
  
    setCountryOptions(uniqueOptions("country"));
    setStateOptions(uniqueOptions("state"));
    setLgaOptions(uniqueOptions("lga"));
    setCityOptions(uniqueOptions("city"));
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
    const filteredData = await Promise.all(
      air_monitoring_data.map(async (item) => {
        const itemDate = moment(item.createdAt);
        
        const country = await getLocation(item.lat, item.lon, "country");
        const state = await getLocation(item.lat, item.lon, "state");
        const city = await getLocation(item.lat, item.lon, "city");
        const lga = await getLocation(item.lat, item.lon, "lga");
  
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
  
        const countryMatch = !filterValues.country || country === filterValues.country;
        const stateMatch = !filterValues.state || state === filterValues.state;
        const lgaMatch = !filterValues.lga || lga === filterValues.lga;
        const cityMatch = !filterValues.city || city === filterValues.city;
  
        return (
          dateRangeMatch &&
          singleDateMatch &&
          countryMatch &&
          stateMatch &&
          lgaMatch &&
          cityMatch
            ? { ...item, country, state, city, lga }
            : null
        );
      })
    );
  
    const finalFilteredData = filteredData.filter(Boolean) as data_type[];
  
    setFilteredItems(finalFilteredData);
    setShowFilter(false);
    setIsFilterActive(true);
  };









  const clearFilter = () => {
    setFilterValues({
      dateRange: [null, null],
      date: null,
      country: null,
      state: null,
      lga: null,
      city: null,
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

  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  const [fileType, setFileType] = useState<string | number>("pdf");

  const filterData = async () => {
    let result: data_type[] = air_monitoring_data;
  
    if (searchQuery) {
      const filteredResults: data_type[] = [];
  
      for (const item of result) {
        const country = await getLocation(item.lat, item.lon, "country");
        const state = await getLocation(item.lat, item.lon, "state");
        const city = await getLocation(item.lat, item.lon, "city");
        const lga = await getLocation(item.lat, item.lon, "lga");
        const matchesSearch = 
          country.toLowerCase().includes(searchQuery.toLowerCase()) ||
          state.toLowerCase().includes(searchQuery.toLowerCase()) ||
          city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lga.toLowerCase().includes(searchQuery.toLowerCase());
  
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
          <Input
            placeholder="Search for data... "
            prefix={
              <img
                src="/search.svg"
                alt="image"
                className="w-[17.5px] h-[17.5px]"
              />
            }
            className="h-[46px] w-[90%] bg-transparent"
            value={searchQuery}
            onChange={handleSearchChange}
          />
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
                onClick={() => {
               
                  toast.success("Preparing file for print!", {
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
                  toPDF();
                }}
                className="h-[46px]  w-[30%] xl:w-[18%] bg-transparent"
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
                  name="country"
                  label="Country"
                  placeholder="Select country"
                  required={false}
                  options={countryOptions}
                  value={filterValues.country || undefined}
                  onChange={(value) => handleFilterChange(value, "country")}
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
                  onChange={(value) => handleFilterChange(value, "state")}
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
                  onChange={(value) => handleFilterChange(value, "lga")}
                />
              </div>
              <div className="lg:w-[20%] ">
                <Select_v2
                  name="city"
                  label="City"
                  required={false}
                  placeholder="Select city"
                  options={cityOptions}
                  value={filterValues.city || undefined}
                  onChange={(value) => handleFilterChange(value, "city")}
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
          <div ref={targetRef}>
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
            defaultValue="pdf"
            options={[
              { value: "pdf", label: "PDF" },
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
            {fileType === "csv" ? (
              <CSVLink
                filename={"Air_monitoring_data.csv"}
                data={csvItems}
                // data={filteredItems}
                // data={the_FilteredData}
                className="btn btn-primary"
              >
                <div className="text-[16px] font-[400]">Download</div>
              </CSVLink>
            ) : (
              <div className="text-[16px] font-[400]">Download</div>
            )}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AirMonitoringTableTop;
