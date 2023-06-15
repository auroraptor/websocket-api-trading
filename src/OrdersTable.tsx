import React from "react";
import "./index.css";
import { Table, Tag, Badge } from "antd";
import type { ColumnsType } from "antd/es/table";
import Decimal from "decimal.js";
import { Instrument, OrderSide, OrderStatus } from "./Enums";
import { OrderData } from "./Models/ServerMessages";

const columns: ColumnsType<OrderData> = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "Creation Time",
    dataIndex: "creationTime",
    render: (time: string) => {
      const date = new Date(time);
      return date.toLocaleString();
    },
    sorter: (a: OrderData, b: OrderData) =>
      a.creationTime.localeCompare(b.creationTime),
  },
  {
    title: "Status Update Time",
    dataIndex: "statusUpdateTime",
    render: (time: string) => {
      const date = new Date(time);
      return date.toLocaleString();
    },
  },

  {
    title: "Status",
    dataIndex: "status",
    render: (status: OrderStatus) => {
      let state: "success" | "processing" | "error" | "default";
      let text;
      switch (status) {
        case OrderStatus.active:
          state = "processing";
          text = "Active";
          break;
        case OrderStatus.filled:
          state = "success";
          text = "Filled";
          break;
        case OrderStatus.rejected:
          state = "error";
          text = "Rejected";
          break;
        case OrderStatus.cancelled:
          state = "default";
          text = "Cancelled";
          break;
      }

      return <Badge status={state} text={text}></Badge>;
    },
  },
  {
    title: "Side",
    dataIndex: "side",
    render: (side: OrderSide) => {
      let color;
      let tag;

      switch (side) {
        case OrderSide.buy:
          color = "green";
          tag = "Buy";
          break;
        case OrderSide.sell:
          color = "red";
          tag = "Sell";
          break;
      }

      return <Tag color={color}>{tag}</Tag>;
    },
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a: OrderData, b: OrderData) =>
      new Decimal(a.price).cmp(new Decimal(b.price)),
    render: (price: Decimal, record: OrderData) => (
      <div style={{ color: record.side === OrderSide.sell ? "#cf1322" : "#389e0d" }}>
        {price.toString()}
      </div>
    ),
  },
  {
    title: "Amount",
    dataIndex: "amount",
    sorter: (a: OrderData, b: OrderData) =>
      new Decimal(a.amount).cmp(new Decimal(b.amount)),
    render: (amount: Decimal, record: OrderData) => (
      <div style={{ color: record.side === OrderSide.sell ? "#cf1322" : "#389e0d" }}>
        {amount.toString()}
      </div>
    ),
  },

  {
    title: "Instrument",
    dataIndex: "instrument",
    render: (instrument: Instrument) => {
      return Instrument[instrument].toUpperCase().replace("_", "/");
    },
  },
];

interface OrdersTableProps {
  orders?: OrderData[];
}

const OrdersTable: React.FC<OrdersTableProps> = ({ orders }) => {
  if (!orders) {
    return <div>Loading...</div>;
  }

  return (
    <Table
      style={{ marginTop: "20px" }}
      rowKey={record => record.id}
      columns={columns}
      dataSource={orders.sort((a, b) => b.creationTime.localeCompare(a.creationTime))}
      pagination={{
        pageSize: 9,
      }}
    />
  );
};

export default OrdersTable;
