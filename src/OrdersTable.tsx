import React from "react";
import "./index.css";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import Decimal from "decimal.js";
import { Instrument, OrderSide, OrderStatus } from "./Enums";

export interface OrderData {
  id: string;
  creationTime: string;
  statusUpdateTime: string;
  status: OrderStatus;
  side: OrderSide;
  price: Decimal;
  amount: Decimal;
  instrument: Instrument;
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
    // sorter: (a: OrderData, b: OrderData) => a.status.localeCompare(b.status),
  },
  {
    title: "Side",
    dataIndex: "side",
  },
  {
    title: "Price",
    dataIndex: "price",
    // sorter: (a: OrderData, b: OrderData) => a.price - b.price,
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
