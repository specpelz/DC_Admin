import { useState } from "react";
import { Flex, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';

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

const columns: TableColumnsType<DataType> = [
  { title: 'Date', dataIndex: 'date' },
  { title: 'Country', dataIndex: 'country' },
  { title: 'State', dataIndex: 'state' },
  { title: 'L.G.A', dataIndex: 'lga' },
  { title: 'Longitude', dataIndex: 'longitude' },
  { title: 'Latitude', dataIndex: 'latitude' },
  { title: 'Device URL', dataIndex: 'deviceURL' },
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
    <Table<DataType> rowSelection={rowSelection} columns={columns} dataSource={dataSource} />
  </Flex>
  )
}

export default AirMonitoringTable