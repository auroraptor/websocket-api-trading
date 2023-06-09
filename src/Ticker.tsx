import React, { useState, useEffect, useMemo } from "react";
import { OrderData } from "./OrdersTable";

import {
  Card,
  Select,
  InputNumber,
  Space,
  Divider,
  Typography,
  Button,
} from "antd";

const { Text } = Typography;

interface Order extends OrderData{
  volume: number;
}

interface OrdersTickerProps {
  orders: OrderData[];
  onOrderSubmit: (order: Order) => void;
}

const Ticker: React.FC<OrdersTickerProps> = ({ orders, onOrderSubmit }) => {
  const defaultVolume = 1000;
  const [sellOrder, setSellOrder] = useState<OrderData | null>(null);
  const [buyOrder, setBuyOrder] = useState<OrderData | null>(null);
  const [sellPrice, setSellPrice] = useState<number | null>(null);
  const [buyPrice, setBuyPrice] = useState<number | null>(null);
  const [volume, setVolume] = useState<number>(defaultVolume);
  const [value, setValue] = useState<string>();

  const options = useMemo(() => {
    const instruments = orders.reduce(
      (set, order) =>
        order.status === "Active" ? set.add(order.instrument) : set,
      new Set<string>()
    );

    return [...instruments].map((instrument) => ({
      value: instrument,
      label: instrument,
    }));
  }, [orders]);

  useEffect(() => {
    if (value === undefined && options.length > 0) {
      setValue(options[0].value);
    }

    const sellOrders = orders
      .filter(
        (order) =>
          order.side === "Sell" &&
          order.instrument === value &&
          order.status === "Active"
      )
      .sort((a, b) => a.price - b.price);
    const buyOrders = orders
      .filter(
        (order) =>
          order.side === "Buy" &&
          order.instrument === value &&
          order.status === "Active"
      )
      .sort((a, b) => b.price - a.price);

    setSellOrder(sellOrders.length ? sellOrders[0] : null);
    setBuyOrder(buyOrders.length ? buyOrders[0] : null);
    setSellPrice(sellOrders.length ? sellOrders[0].price : null);
    setBuyPrice(buyOrders.length ? buyOrders[0].price : null);
  }, [value, orders, options]);

  const handleOrderSubmit = (side: "Sell" | "Buy") => {
    const order = side === "Sell" ? sellOrder : buyOrder;

    if (!order) {
      console.error(`No ${side} orders available for ${value}`);
      return;
    }

    if (value && order.price) {
      onOrderSubmit({
        ...order,
        volume,
      });
    }
  };

  return (
    <Card
      style={{ width: 300 }}
      actions={[
        <Button
          type="primary"
          block
          size="large"
          style={{ width: "80%", background: "#E74C3C" }}
          onClick={() => handleOrderSubmit("Sell")}
        >
          Sell
        </Button>,
        <Button
          type="primary"
          block
          size="large"
          style={{ width: "80%", background: "#3CB371" }}
          onClick={() => handleOrderSubmit("Buy")}
        >
          Buy
        </Button>,
      ]}
    >
      <Select
        style={{ width: "100%", margin: "10px 0" }}
        value={value}
        size="large"
        dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
        options={options}
        onChange={(newValue: string) => setValue(newValue)}
      />
      <InputNumber
        style={{ width: "100%", margin: "10px 0", textAlign: "center" }}
        min={1000}
        max={1000000}
        step={1000}
        size="large"
        value={volume}
        onChange={(value: number | null) => value !== null && setVolume(value)}
      />
      <Space align="center" size="large" split={<Divider type="vertical" />}>
        <Text style={{ margin: 0, fontSize: "1rem", alignSelf: "center" }}>
          {sellPrice?.toFixed(3).split(".")[0] + "."}
          <Text style={{ margin: 0, fontSize: "2rem", alignSelf: "center" }}>
            {sellPrice?.toFixed(3).split(".")[1]?.substring(0, 2)}
          </Text>
          {sellPrice?.toFixed(3).split(".")[1]?.substring(2)}
        </Text>
        <Text style={{ margin: 0, fontSize: "1rem", alignSelf: "center" }}>
          {buyPrice?.toFixed(3).split(".")[0] + "."}
          <Text style={{ margin: 0, fontSize: "2rem", alignSelf: "center" }}>
            {buyPrice?.toFixed(3).split(".")[1]?.substring(0, 2)}
          </Text>
          {buyPrice?.toFixed(3).split(".")[1]?.substring(2)}
        </Text>
      </Space>
    </Card>
  );
};

export default Ticker;
