import { BASE_URL } from "@api/index";
import UploadMessage from "@components/dashboard/UploadMessage";


import userToken from "@hooks/userToken";

import useAirMonitoringStore from "@store/airMonitoring";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TableColumnsType, TableProps } from "antd";
import {
  Button,
  Divider,
  Dropdown,
  Flex,
  Menu,
  Modal,
  Table,
  Tooltip,
} from "antd";

import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { data_type, DataType } from "../../types/airMonitoringDataType";
import "./customDropdown.css";
// import { CSVLink } from "react-csv";

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

interface AirMonitoringTableProps {
  // searchQuery: string;
  filtered: data_type[];
}

const AirMonitoringTable: React.FC<AirMonitoringTableProps> = ({
  filtered,
}) => {
  const queryClient = useQueryClient();
  const { token } = userToken();











  const [dataSource, setDataSource] = useState<DataType[]>([]);

  useEffect(() => {
    const fetchLocationData = async () => {
   
      const processedData = filtered.map((data) => ({
        key: data.id,
        date: moment(data.createdAt).format("YYYY-MM-DD"),
        serial_number: data.serial_number,
        location: data.location,
        longitude: data.lon,
        latitude: data.lat,
        // deviceUrl: data.id,
        deviceUrl: data.device_uid,
      }))

      setDataSource(processedData);
    };

    fetchLocationData();
  }, [filtered]);





  // DELETE ASYNC FUNCTION>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // const handleDeleteData = async (): Promise<void> => {
  const deleteItem = async (): Promise<void> => {
console.log(selectedRowData?.key)
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

  // Edit ASYNC FUNCTION>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  

  const [successCityName, setSuccessCityName] = useState<string | null>(null);


  const [isViewModalVisible, set_isViewModalVisible] = useState<boolean>(false);

  const [isDeleteModalVisible, set_isDeleteModalVisible] =
    useState<boolean>(false);



 

  const handleView = (row: DataType) => {
    setSelectedRowData(row);
    set_isViewModalVisible(true);
  };

  const [editSuccessMessage, setEditSuccessMessage] = useState<boolean>(false);
  
  const [deleteSuccessMessage, setdeleteSuccessMessage] =
    useState<boolean>(false);

  const handleDelete = (row: DataType) => {
    setSelectedRowData(row);
    set_isDeleteModalVisible(true);
  };

  const handleCancel = () => {
    set_isViewModalVisible(false);

    set_isDeleteModalVisible(false);
  };

  const columns: TableColumnsType<DataType> = [
    { title: "Date", dataIndex: "date", ellipsis: true },
    { title: "Location", dataIndex: "location", ellipsis: true },
    { title: "Community", dataIndex: "serial_number", ellipsis: true },

    { title: "Longitude", dataIndex: "longitude", ellipsis: true },
    { title: "Latitude", dataIndex: "latitude", ellipsis: true },
    {
      title: "Device Uid",
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
                    onClick={() =>{ 
                      navigator.clipboard.writeText(text)
                      toast.success("Copied!", {
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

                    }}
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


 

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;




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
            imageName={`You have successfully deleted data for ${selectedRowData?.location}`}
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
        title={`${selectedRowData?.location}`}
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
            <div className="text-[#757575] text-[16px] font-[400]">Cummunity</div>
            <div className="text-[#2C2C2C] text-[16px] font-[400]">
              {selectedRowData?.serial_number}
            </div>
          </div>
          <div className="flex flex-col gap-y-[5px] w-[300px]">
            <div className="text-[#757575] text-[16px] font-[400]">Location</div>
            <div className="text-[#2C2C2C] text-[16px] font-[400]">
              {selectedRowData?.location}
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
              Device Uid
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
        title={`Delete ${selectedRowData?.serial_number}`}
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
          Are you sure you want to delete data for {selectedRowData?.serial_number}  on air monitoring?
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
