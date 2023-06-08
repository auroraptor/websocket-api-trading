import React from "react";
import "./index.css";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

export interface OrderData {
  id: string;
  creationTime: string;
  statusUpdateTime: string;
  status: string;
  side: string;
  price: number;
  amount: number;
  instrument: string;
}

const columns: ColumnsType<OrderData> = [
  {
    title: "ID",
    dataIndex: "id",
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
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Instrument",
    dataIndex: "instrument",
  },
];

interface OrdersTableProps {
  orders: OrderData[];
}

const OrdersTable: React.FC<OrdersTableProps> = ({ orders }) => {
  if (!orders) {
    return <div>Loading...</div>;
  }
  console.log("orders: ", orders);
  return (
    <Table
      style={{ marginTop: "20px" }}
      columns={columns}
      dataSource={orders}
      pagination={{
        pageSize: 9,
      }}
    />
  );
};

export default OrdersTable;
