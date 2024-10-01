import { useEffect, useState } from "react";
import { Button, Divider, Dropdown, Flex, Form, Input, Menu, Modal, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import "./customDropdown.css";
import Select from "../select/Select";
import FormItem from "antd/es/form/FormItem";
type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

interface DataType {
  key: React.Key;
  date: string;
  country: string;
  state: string;
  lga: string;
  city: string;
  longitude: string;
  latitude: string;
  deviceURL: string;
}

const AirMonitoringTable = () => {


  const [form] = Form.useForm()


  const [isViewModalVisible, set_isViewModalVisible] = useState<boolean>(false);
  const [isEditModalVisible, set_isEditModalVisible] = useState<boolean>(false);
  const [isDeleteModalVisible, set_isDeleteModalVisible] =
    useState<boolean>(false);

  const [selectedRowData, setSelectedRowData] = useState<DataType | null>(null);

  const defaultValues = {
    country:selectedRowData?.country,
    state:selectedRowData?.state,
    lga:selectedRowData?.lga,
    city:selectedRowData?.city,
    latitude:selectedRowData?.latitude,
    longitude:selectedRowData?.longitude,
    deviceurl:selectedRowData?.deviceURL,
  }



  useEffect(() => {
    form.setFieldsValue(defaultValues)
   }, [form, defaultValues])


  const handleView = (row: DataType) => {
    setSelectedRowData(row);
    set_isViewModalVisible(true);
  };

  const handleEdit = (row: DataType) => {
    setSelectedRowData(row);
    set_isEditModalVisible(true);
  };

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
    { title: "Date", dataIndex: "date" },
    { title: "Country", dataIndex: "country" },
    { title: "State", dataIndex: "state" },
    { title: "L.G.A", dataIndex: "lga" },
    { title: "City", dataIndex: "city" },
    { title: "Longitude", dataIndex: "longitude" },
    { title: "Latitude", dataIndex: "latitude" },
    {
      title: "Device URL",
      dataIndex: "deviceURL",
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
          
          <Flex align="center" justify="space-between" gap="small">
            <span>{text}</span>
            {/* <Tooltip title="Copy URL"> */}
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
          </Flex>
          




          </>

        );
      },
    },
  ];

  const dataSource = Array.from<DataType>({ length: 46 }).map<DataType>(
    (_, i) => ({
      key: i,
      date: `Oct - 10 -2023 ${i}`,
      country: "Nigeria",
      state: `Rivers ${i}`,
      lga: `Eleme ${i}`,
      city: `Eleme Agbon ${i}`,
      longitude: `7.0498° E ${i}`,
      latitude: `7.0498° E ${i}`,
      deviceURL: `https://api.airqualitymonitor....${i}`,
    })
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

  return (
    <>
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
              {selectedRowData?.lga}
            </div>
          </div>
        </div>
        <div className="flex w-full justify-between  mb-[20px] ">
          <div className="flex flex-col gap-y-[5px]">
            <div className="text-[#757575] text-[16px] font-[400]">Longitude</div>
            <div className="text-[#2C2C2C] text-[16px] font-[400]">
              {selectedRowData?.longitude}
            </div>
          </div>
          <div className="flex flex-col gap-y-[5px]  w-[300px]">
            <div className="text-[#757575] text-[16px] font-[400]">Latitude</div>
            <div className="text-[#2C2C2C] text-[16px] font-[400]">
              {selectedRowData?.latitude}
            </div>
          </div>
        </div>
        <div className="w-full justify-between  mb-[20px] ">
          <div className="flex flex-col gap-y-[5px]">
            <div className="text-[#757575] text-[16px] font-[400]">Device URL</div>
            <div className="text-[#2C2C2C] text-[16px] font-[400]">
              {selectedRowData?.deviceURL}
            </div>
          </div>

        </div>
     
      </Modal>
      <Modal
        title="Edit Data"
        open={isEditModalVisible}
        onOk={() => set_isEditModalVisible(true)}
        onCancel={handleCancel}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        centered
      >
    <Form
    form={form}
    initialValues={defaultValues}
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
            />
          </div>
          <div className="lg:w-[50%] h-[100px]">
            <Select
              name="state"
              label="State"
              placeholder="Enter the state"
              required={true}
              requiredMessage="Please enter the state!"
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
              name="deviceurl"
              label={
                <span className="text-[16px] font-[400] text-BrandBlack1 ">
                  Device URL
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
                placeholder="Enter the device URL"
                className="text-[14px] px-[8px] py-[10px] rounded-[8px] text-BrandBlack1 h-[48px]"
              />
            </FormItem>
          </div>
        </div>

        <div className="flex justify-end mt-[50px]">
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="w-[234px] h-[48px] text-[16px] font-[400]  bg-BrandPrimary"
            >
              <div className="text-[16px] font-[400]">Upload Data</div>
            </Button>
          </FormItem>
        </div>
      </div>
    </Form>
      </Modal>
      <Modal
         title={`Delete ${selectedRowData?.state}-${selectedRowData?.lga}`}
        open={isDeleteModalVisible}
        onOk={() => set_isDeleteModalVisible(true)}
        onCancel={handleCancel}
        okButtonProps={{ style: { width:"150px", height:"40px", backgroundColor:"#F33B3B"} }}
        cancelButtonProps={{ style:  { width:"150px",  height:"40px", }  }}
        centered

      

      >
           <Divider className="mt-0" />
  <p className="text-[#2C2C2C]">
  Are you sure you want to delete the {selectedRowData?.state} - {selectedRowData?.lga} on air monitoring?
 
  </p>
  <p className="mt-[20px] text-[#2C2C2C]">
  This action is irreversible, and all associated records will be permanently removed from the system. Please confirm your choice.
  </p>
    
      </Modal>
    </>
  );
};

export default AirMonitoringTable;
