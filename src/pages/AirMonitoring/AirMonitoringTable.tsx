import { BASE_URL } from "@api/index";
import UploadMessage from "@components/dashboard/UploadMessage";
import useCountries from "@hooks/useCountries";
import useLGAs from "@hooks/useLGAs";
import userToken from "@hooks/userToken";
import useStates from "@hooks/useStates";
import useAirMonitoringStore from "@store/airMonitoring";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TableColumnsType, TableProps } from "antd";
import {
  Button,
  Divider,
  Dropdown,
  Flex,
  Form,
  Input,
  Menu,
  Modal,
  Table,
  Tooltip,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Select from "../../components/dashboard/select/Select";
import { DataType } from "../../types/airMonitoringDataType";
import "./customDropdown.css";

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

interface AirMonitoringTableProps {
  searchQuery: string;
}

const AirMonitoringTable: React.FC<AirMonitoringTableProps> = ({
  searchQuery,
}) => {
  const queryClient = useQueryClient();
  const { token } = userToken();
  // const { fetchUpdatedData } = useFetchUpdatedData();

  //  const handleDeleteData=()=>{

  //     set_isDeleteModalVisible(false);
  //     setdeleteSuccessMessage(true);
  //     setTimeout(() => {
  //       setdeleteSuccessMessage(false);
  //     }, 2000);

  //  }

  // DELETE ASYNC FUNCTION>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // const handleDeleteData = async (): Promise<void> => {
  const deleteItem = async (): Promise<void> => {
    await axios.delete(`${BASE_URL}/air-monitoring/${selectedRowData?.key}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  // Assuming you have set_air_monitoring_data in your store
  const deleteMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: async () => {
      console.log("item deleted successfully");

      // Invalidate the queries
      await queryClient.invalidateQueries(["get_all_air_monitoring_data"]);

      // Update Zustand state directly to remove the deleted item
      const currentData = useAirMonitoringStore.getState().air_monitoring_data;
      const updatedData = currentData.filter(
        (item) => item.id !== selectedRowData?.key
      );
      useAirMonitoringStore.getState().set_air_monitoring_data(updatedData);

      // Close modal and show success message
      set_isDeleteModalVisible(false);
      setdeleteSuccessMessage(true);
      setTimeout(() => {
        setdeleteSuccessMessage(false);
      }, 2000);
    },
    onError: () => {
      const errorMessage = "An error occurred while deleting the item.";
      toast.error(errorMessage);
    },
  });

  const handleDeleteData = () => {
    deleteMutation.mutate();
  };

  // DELETE ASYNC FUNCTION>>>>>ENDS HERE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const [selectedRowData, setSelectedRowData] = useState<DataType | null>(null);

  const defaultValues = {
    country: selectedRowData?.country,
    state: selectedRowData?.state,
    lga: selectedRowData?.lga,
    city: selectedRowData?.city,
    latitude: selectedRowData?.latitude,
    longitude: selectedRowData?.longitude,
    deviceurl: selectedRowData?.deviceUrl,
  };

  // Edit ASYNC FUNCTION>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // /air-monitoring/{montoringId}
  // const data = {
  //   country:defaultValues?.country,
  //   state: defaultValues?.state,
  //   lga: defaultValues?.lga,
  //   city: defaultValues?.city,
  //   latitude: defaultValues?.latitude,
  //   longitude: defaultValues?.longitude,
  //   deviceUrl: defaultValues?.deviceurl
  // }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editItem = async (values: any): Promise<void> => {
    await axios.patch(
      `${BASE_URL}/air-monitoring/${selectedRowData?.key}`,
      values,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const [successCityName, setSuccessCityName] = useState<string | null>(null);

  const editMutation = useMutation({
    mutationFn: editItem,
    onSuccess: () => {
      const cityName: string | undefined = selectedRowData?.city;
      setSelectedRowData(null);
      set_isEditModalVisible(false);
      setEditSuccessMessage(true);
      
      setSuccessCityName(cityName ?? null); 
      
      queryClient.invalidateQueries(["get_all_air_monitoring_data"]);
      setTimeout(() => {
        setEditSuccessMessage(false);
        setSuccessCityName(null); // Reset city name when closing
      }, 2000);
    },
    onError: () => {
      const errorMessage = "An error occurred while updating the item.";
      toast.error(errorMessage);
    },
  });
  

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditData = (values: any) => {
    editMutation.mutate(values);
  };
  // Edit ASYNC FUNCTION>>>>>>>>>ENDS>>HERE>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const formattedDate = (value: string) => {
    const formattedDate_v1 = moment(value).format("YYYY-MM-DD");
    return formattedDate_v1;
  };

  // const filtered_data = useAirMonitoringStore((state) => state.filtered_data);

  const air_monitoring_data = useAirMonitoringStore(
    (state) => state.air_monitoring_data
  );

  const [form] = Form.useForm();

  const [isViewModalVisible, set_isViewModalVisible] = useState<boolean>(false);
  const [isEditModalVisible, set_isEditModalVisible] = useState<boolean>(false);
  const [isDeleteModalVisible, set_isDeleteModalVisible] =
    useState<boolean>(false);

  // useEffect(() => {
  //   form.setFieldsValue(defaultValues);
  // }, [form, defaultValues]);

  useEffect(() => {
    if (selectedRowData) {
      form.setFieldsValue({
        country: selectedRowData.country,
        state: selectedRowData.state,
        lga: selectedRowData.lga,
        city: selectedRowData.city,
        latitude: selectedRowData.latitude,
        longitude: selectedRowData.longitude,
        deviceUrl: selectedRowData.deviceUrl,
      });
      setSelectedCountry(selectedRowData.country);
      setSelectedState(selectedRowData.state);
    }
  }, [selectedRowData, form]);

  const handleView = (row: DataType) => {
    setSelectedRowData(row);
    set_isViewModalVisible(true);
  };

  const [editSuccessMessage, setEditSuccessMessage] = useState<boolean>(false);
  const handleEdit = (row: DataType) => {
    setSelectedRowData(row);
    set_isEditModalVisible(true);
  };
  const [deleteSuccessMessage, setdeleteSuccessMessage] =
    useState<boolean>(false);

  const handleDelete = (row: DataType) => {
    setSelectedRowData(row);
    set_isDeleteModalVisible(true);
  };

  const handleCancel = () => {
    set_isViewModalVisible(false);
    set_isEditModalVisible(false);
    set_isDeleteModalVisible(false);
  };

  const columns: TableColumnsType<DataType> = [
    { title: "Date", dataIndex: "date", ellipsis: true },
    { title: "Country", dataIndex: "country", ellipsis: true },
    { title: "State", dataIndex: "state", ellipsis: true },
    { title: "L.G.A", dataIndex: "lga", ellipsis: true },
    { title: "City", dataIndex: "city", ellipsis: true },
    { title: "Longitude", dataIndex: "longitude", ellipsis: true },
    { title: "Latitude", dataIndex: "latitude", ellipsis: true },
    {
      title: "Device URL",
      dataIndex: "deviceUrl",
      ellipsis: true,

      render: (text: string, record: DataType) => {
        const menu = (
          <Menu>
            <Menu.Item
              key="view"
              icon={
                <img
                  src="/view.svg"
                  alt="Upload Icon"
                  className="w-[14px] h-[14px]"
                />
              }
              onClick={() => handleView(record)}
            >
              View More Data
            </Menu.Item>
            <Menu.Item
              key="edit"
              icon={
                <img
                  src="/edit.svg"
                  alt="Upload Icon"
                  className="w-[14px] h-[14px]"
                />
              }
              onClick={() => handleEdit(record)}
            >
              Edit Data
            </Menu.Item>
            <Menu.Item
              key="delete"
              icon={
                <img
                  src="/delete.svg"
                  alt="Upload Icon"
                  className="w-[14px] h-[14px]"
                />
              }
              onClick={() => handleDelete(record)}
            >
              Delete Data
            </Menu.Item>
          </Menu>
        );

        return (
          <>
            <Flex
              align="center"
              justify="space-between"
              style={{ whiteSpace: "nowrap" }}
            >
              <Tooltip title={text}>
                <span
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "150px",
                    display: "inline-block",
                  }}
                >
                  {text}
                </span>
              </Tooltip>
              {/* <Tooltip title="Copy URL"> */}
              <div className="flex justify-between items-center">
                <div>
                  <Button
                    icon={
                      <img
                        src="/copy.svg"
                        alt="Upload Icon"
                        className="w-[14px] h-[14px]"
                      />
                    }
                    onClick={() => navigator.clipboard.writeText(text)}
                    type="link"
                  />
                </div>
                {/* </Tooltip> */}
                <Dropdown
                  overlay={menu}
                  trigger={["click"]}
                  overlayClassName="custom-dropdown"
                >
                  <Button
                    icon={
                      <img
                        src="/more.svg"
                        alt="icon"
                        className="w-[14px] h-[14px]"
                      />
                    }
                    type="link"
                  />
                </Dropdown>
              </div>
            </Flex>
          </>
        );
      },
    },
  ];

  const dataSource = air_monitoring_data
    ?.map((data) => ({
      key: data.id,
      date: formattedDate(data.createdAt),
      country: data.country,
      state: data.state,
      lga: data.lga,
      city: data.city,
      longitude: data.longitude,
      latitude: data.latitude,
      deviceUrl: data.deviceUrl,
    }))
    .filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const countries = useCountries(); // Fetch countries
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const states = useStates(selectedCountry); // Fetch states based on selected country
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const lgas = useLGAs(selectedState); // Fetch LGAs based on selected state

  const handleCountryChange = (value: string | number) => {
    setSelectedCountry(value as string);
    setSelectedState(null);
    form.setFieldsValue({ state: undefined, lga: undefined });
  };

  const handleStateChange = (value: string | number) => {
    setSelectedState(value.toString());
    form.setFieldsValue({ lga: undefined });
  };

  console.log("selectedRowData", selectedRowData);

  return (
    <>
      {editSuccessMessage && (
        <div className="fixed right-0 z-[999] top-[12.5%]">
          <UploadMessage
            imageName={`You have successfully uploaded data for ${successCityName}`}
            onClose={() => {
              setEditSuccessMessage(false);
              setSuccessCityName(null);
            }}
          />
        </div>
      )}
      {deleteSuccessMessage && (
        <div className="fixed right-0 z-[999] top-[12.5%]">
          <UploadMessage
            imageName={`You have successfully deleted data for ${selectedRowData?.city}`}
            onClose={() => setdeleteSuccessMessage(false)}
          />
        </div>
      )}
      <Flex gap="middle" vertical>
        <Flex align="center" gap="middle">
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
        </Flex>

        <Table<DataType>
          rowSelection={rowSelection}
          columns={columns}
          dataSource={dataSource}
          className="custom-table"
        />
      </Flex>

      <Modal
        title={`${selectedRowData?.state}-${selectedRowData?.lga}`}
        open={isViewModalVisible}
        onOk={() => set_isViewModalVisible(true)}
        onCancel={handleCancel}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        centered
      >
        <Divider className="mt-0" />

        <div className="flex w-full justify-between  mb-[20px] ">
          <div className="flex flex-col gap-y-[5px]">
            <div className="text-[#757575] text-[16px] font-[400]">Country</div>
            <div className="text-[#2C2C2C] text-[16px] font-[400]">
              {selectedRowData?.country}
            </div>
          </div>
          <div className="flex flex-col gap-y-[5px] w-[300px]">
            <div className="text-[#757575] text-[16px] font-[400]">State</div>
            <div className="text-[#2C2C2C] text-[16px] font-[400]">
              {selectedRowData?.state}
            </div>
          </div>
        </div>
        <div className="flex w-full justify-between  mb-[20px]">
          <div className="flex flex-col gap-y-[5px]">
            <div className="text-[#757575] text-[16px] font-[400]">L.G.A</div>
            <div className="text-[#2C2C2C] text-[16px] font-[400]">
              {selectedRowData?.lga}
            </div>
          </div>
          <div className="flex flex-col gap-y-[5px]  w-[300px]">
            <div className="text-[#757575] text-[16px] font-[400]">City</div>
            <div className="text-[#2C2C2C] text-[16px] font-[400]">
              {selectedRowData?.city}
            </div>
          </div>
        </div>
        <div className="flex w-full justify-between  mb-[20px] ">
          <div className="flex flex-col gap-y-[5px]">
            <div className="text-[#757575] text-[16px] font-[400]">
              Longitude
            </div>
            <div className="text-[#2C2C2C] text-[16px] font-[400]">
              {selectedRowData?.longitude}
            </div>
          </div>
          <div className="flex flex-col gap-y-[5px]  w-[300px]">
            <div className="text-[#757575] text-[16px] font-[400]">
              Latitude
            </div>
            <div className="text-[#2C2C2C] text-[16px] font-[400]">
              {selectedRowData?.latitude}
            </div>
          </div>
        </div>
        <div className="flex w-full justify-between  mb-[20px] ">
          <div className="flex flex-col gap-y-[5px]">
            <div className="text-[#757575] text-[16px] font-[400]">
              Device URL
            </div>
            <div className="text-[#2C2C2C] text-[16px] font-[400]">
              {selectedRowData?.deviceUrl}
            </div>
          </div>
          <div className="flex flex-col gap-y-[5px]  w-[300px]">
            <div className="text-[#757575] text-[16px] font-[400]">Date</div>
            <div className="text-[#2C2C2C] text-[16px] font-[400]">
              {selectedRowData?.date}
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        title="Edit Data"
        open={isEditModalVisible}
        // onOk={() => {

        // }}
        onCancel={handleCancel}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        centered
        width={1000}
      >
        <Form
          form={form}
          initialValues={defaultValues}
          onFinish={handleEditData}
        >
          <div className="w-full bg-white rounded-[4px]  lg:h-[492px] mt-[16px]">
            <div className="lg:flex lg:gap-x-[27px]">
              <div className="lg:w-[50%] h-[100px]">
                <Select
                  name="country"
                  label="Country"
                  placeholder="Enter the country"
                  required={true}
                  requiredMessage="Please enter the country!"
                  options={countries} // Ensure countries is an array of { value, label }
                  onChange={handleCountryChange}
                  showSearch={true}
                />
              </div>
              <div className="lg:w-[50%] h-[100px]">
                <Select
                  name="state"
                  label="State"
                  placeholder="Enter the state"
                  required={true}
                  requiredMessage="Please enter the state!"
                  options={states.map((state) => ({
                    value: state.value, // Use 'state.value' here
                    label: state.label, // Use 'state.label' here
                  }))}
                  onChange={handleStateChange} // This should now work
                  disabled={!selectedCountry || states.length === 0}
                  showSearch={true}
                />
              </div>
            </div>
            <div className="lg:flex lg:gap-x-[27px]">
              <div className="lg:w-[50%] h-[100px]">
                <Select
                  name="lga"
                  label="L.G.A"
                  placeholder="Enter the Local Government"
                  required={true}
                  requiredMessage="Please enter the L.G.A!"
                  options={lgas} // Use the mapped LGAs
                  disabled={!selectedState} // Disable until a state is selected
                  showSearch={true}
                />
              </div>
              <div className="lg:w-[50%] h-[100px]">
                <FormItem
                  layout="vertical"
                  name="city"
                  label={
                    <span className="text-[16px] font-[400] text-BrandBlack1 ">
                      city
                    </span>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please enter the city",
                    },
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Enter the city"
                    className="text-[14px] px-[8px] py-[10px] rounded-[8px] text-BrandBlack1 h-[48px]"
                  />
                </FormItem>
              </div>
            </div>
            <div className="lg:flex lg:gap-x-[27px]">
              <div className="lg:w-[50%] h-[100px]">
                <FormItem
                  layout="vertical"
                  name="latitude"
                  label={
                    <span className="text-[16px] font-[400] text-BrandBlack1 ">
                      Latitude
                    </span>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please enter the latitude",
                    },
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Enter the latitude"
                    className="text-[14px] px-[8px] py-[10px] rounded-[8px] text-BrandBlack1 h-[48px]"
                  />
                </FormItem>
              </div>
              <div className="lg:w-[50%] h-[100px]">
                <FormItem
                  layout="vertical"
                  name="longitude"
                  // className="bg-red-700 h-fit"
                  label={
                    <span className="text-[16px] font-[400] text-BrandBlack1 ">
                      Longitude
                    </span>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please enter the longitude",
                    },
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Enter the longitude"
                    className="text-[14px] px-[8px] py-[10px] rounded-[8px] text-BrandBlack1 h-[48px]"
                  />
                </FormItem>
              </div>
            </div>
            <div className="lg:flex lg:gap-x-[27px]">
              <div className="lg:w-[49%] h-[100px]">
                <FormItem
                  layout="vertical"
                  name="deviceUrl"
                  label={
                    <span className="text-[16px] font-[400] text-BrandBlack1 ">
                      Device URL
                    </span>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please enter the device URL",
                    },
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Enter the device URL"
                    className="text-[14px] px-[8px] py-[10px] rounded-[8px] text-BrandBlack1 h-[48px]"
                  />
                </FormItem>
              </div>
            </div>

            <div className="flex justify-end mt-[50px]">
              <FormItem>
                <Button
                  loading={editMutation.isLoading}
                  type="primary"
                  htmlType="submit"
                  className="w-[234px] h-[48px] text-[16px] font-[400]  bg-BrandPrimary"
                >
                  <div className="text-[16px] font-[400]">Update Data</div>
                </Button>
              </FormItem>
            </div>
          </div>
        </Form>
      </Modal>
      <Modal
        title={`Delete ${selectedRowData?.state}-${selectedRowData?.lga}`}
        open={isDeleteModalVisible}
        onOk={handleDeleteData}
        onCancel={handleCancel}
        okButtonProps={{
          disabled: deleteMutation.isLoading,
          style: { width: "150px", height: "40px", backgroundColor: "#F33B3B" },
        }}
        cancelButtonProps={{ style: { width: "150px", height: "40px" } }}
        centered
        okText={deleteMutation.isLoading ? "Deleting..." : "Delete"}
      >
        <Divider className="mt-0" />
        <p className="text-[#2C2C2C]">
          Are you sure you want to delete the {selectedRowData?.state} -{" "}
          {selectedRowData?.lga} on air monitoring?
        </p>
        <p className="mt-[20px] text-[#2C2C2C]">
          This action is irreversible, and all associated records will be
          permanently removed from the system. Please confirm your choice.
        </p>
      </Modal>
    </>
  );
};

export default AirMonitoringTable;
