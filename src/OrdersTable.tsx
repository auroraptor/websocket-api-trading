import React from "react";
import "./index.css";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

interface OrderData {
  key: React.Key;
  id: string;
  creationTime: string;
  statusUpdateTime: string;
  status: string;
  side: string;
  price: number;
  volume: number;
  instrument: string;
}

const columns: ColumnsType<OrderData> = [
  {
    title: "ID",
    dataIndex: "id",
    sorter: (a: OrderData, b: OrderData) => a.id.localeCompare(b.id),
  },
  {
    title: "Creation Time",
    dataIndex: "creationTime",
  },
  {
    title: "Status Update Time",
    dataIndex: "statusUpdateTime",
  },
  {
    title: "Status",
    dataIndex: "status",
    sorter: (a: OrderData, b: OrderData) => a.status.localeCompare(b.status),
  },

  {
    title: "Side",
    dataIndex: "side",
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a: OrderData, b: OrderData) => a.price - b.price,
  },
  {
    title: "Volume",
    dataIndex: "volume",
  },
  {
    title: "Instrument",
    dataIndex: "instrument",
  },
];

const data: OrderData[] = [
  {
    key: "1",
    id: "1",
    creationTime: "2023-05-26 12:00:00",
    statusUpdateTime: "2023-05-26 12:01:00",
    status: "Active",
    side: "Buy",
    price: 100,
    volume: 1000,
    instrument: "Instrument 1",
  },
  // ...дополнительные заявки...
];

const OrdersTable: React.FC = () => (
  <Table
    style={{ marginTop: "20px" }}
    columns={columns}
    dataSource={data}
    pagination={{
      pageSize: 10,
    }}
  />
);

export default OrdersTable;
