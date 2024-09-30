import { useState } from "react";
import { Button, Dropdown, Flex, Menu, Table} from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import './customDropdown.css'; 
type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface DataType {
  key: React.Key;
  date: string;
  country: string;
  state: string;
  lga: string;
  longitude: string;
  latitude: string;
  deviceURL: string;
}



// Handler functions for each dropdown action
const handleView = (url: string) => {
    console.log('View clicked for:', url);
  };
  
  const handleEdit = (url: string) => {
    console.log('Edit clicked for:', url);
  };
  
  const handleDelete = (url: string) => {
    console.log('Delete clicked for:', url);
  };







const columns: TableColumnsType<DataType> = [
  { title: 'Date', dataIndex: 'date' },
  { title: 'Country', dataIndex: 'country' },
  { title: 'State', dataIndex: 'state' },
  { title: 'L.G.A', dataIndex: 'lga' },
  { title: 'Longitude', dataIndex: 'longitude' },
  { title: 'Latitude', dataIndex: 'latitude' },
  { 
    title: 'Device URL', 
    dataIndex: 'deviceURL', 
    render: (text: string) => {
        
        const menu = (
            <Menu >
              <Menu.Item key="view" icon={<img
                src="/view.svg"
                alt="Upload Icon"
                className="w-[14px] h-[14px]"
              />} onClick={() => handleView(text)}>
                View More Data
              </Menu.Item>
              <Menu.Item key="edit" icon={<img
                src="/edit.svg"
                alt="Upload Icon"
                className="w-[14px] h-[14px]"
              />} onClick={() => handleEdit(text)}>
                Edit Data
              </Menu.Item>
              <Menu.Item key="delete" icon={<img
                src="/delete.svg"
                alt="Upload Icon"
                className="w-[14px] h-[14px]"
              />} onClick={() => handleDelete(text)}>
                Delete Data
              </Menu.Item>
            </Menu>
          );
        
        return(
      <Flex align="center" justify="space-between" gap="small">
        <span>{text}</span>
        {/* <Tooltip title="Copy URL"> */}
          <Button 
            icon={<img
                src="/copy.svg"
                alt="Upload Icon"
                className="w-[14px] h-[14px]"
              />} 
            onClick={() => navigator.clipboard.writeText(text)} 
            type="link" 
          />
        {/* </Tooltip> */}
        <Dropdown overlay={menu} trigger={['click']} overlayClassName="custom-dropdown">
            <Button icon={<img
                src="/more.svg"
                alt="Upload Icon"
                className="w-[14px] h-[14px]"
              />} type="link" />
          </Dropdown>
      </Flex>
    )},
  },
];

const dataSource = Array.from<DataType>({ length: 46 }).map<DataType>((_, i) => ({
  key: i,
  date: `Oct - 10 -2023 ${i}`,
  country: "Nigeria",
  state: `Rivers ${i}`,
  lga: `Eleme ${i}`,
  longitude: `7.0498° E ${i}`,
  latitude: `7.0498° E ${i}`,
  deviceURL: `https://api.airqualitymonitor....${i}`,
}));






const AirMonitoringTable = () => {


    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  
  
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
      console.log('selectedRowKeys changed: ', newSelectedRowKeys);
      setSelectedRowKeys(newSelectedRowKeys);
    };
  
    const rowSelection: TableRowSelection<DataType> = {
      selectedRowKeys,
      onChange: onSelectChange,
    };
  
    const hasSelected = selectedRowKeys.length > 0;










  return (
    <Flex gap="middle" vertical>
    <Flex align="center" gap="middle">

      {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
    </Flex>
    <Table<DataType> rowSelection={rowSelection} columns={columns} dataSource={dataSource} className="custom-table"/>
  </Flex>
  )
}

export default AirMonitoringTable