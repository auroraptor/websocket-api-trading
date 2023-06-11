import React, { useState, useEffect, useMemo } from "react";
import { PlaceOrder } from "./Models/ClientMessages";
import { OrderSide, Instrument } from "./Enums";
import Decimal from "decimal.js";

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

type TickerProps = {
  price: Decimal;
  onOrderSubmit: (order: PlaceOrder) => void;
};

const Ticker: React.FC<TickerProps> = ({ price, onOrderSubmit }) => {
  const defaultVolume = 1000;
  const [volume, setVolume] = useState<number>(defaultVolume);
  const [value, setValue] = useState<string>();
  let sellPrice = price.times(0.95).toNumber(); // уменьшаем цену на 5% для продажи
  let buyPrice = price.times(1.05).toNumber(); // увеличиваем цену на 5% для покупки

  const instruments = Object.keys(Instrument)
    .filter((key) => isNaN(Number(key)))
    .map((instrument) => ({
      value: instrument,
      label: instrument.toUpperCase().replace("_", "/"),
    }));

  const options = useMemo(() => instruments, []);

  useEffect(() => {
    if (!value && options.length > 0) {
      setValue(options[0].value);
    }
  }, [value, options]);

  const handleOrderSubmit = (side: OrderSide) => {
    if (value) {
      onOrderSubmit({
        instrument: Instrument[value as keyof typeof Instrument],
        side: side,
        amount: new Decimal(volume),
        price: price,
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
          onClick={() => handleOrderSubmit(OrderSide.sell)}
        >
          Sell
        </Button>,
        <Button
          type="primary"
          block
          size="large"
          style={{ width: "80%", background: "#3CB371" }}
          onClick={() => handleOrderSubmit(OrderSide.buy)}
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
          {sellPrice && (
            <>
              {sellPrice.toFixed(3).split(".")[0] + "."}
              <Text
                style={{ margin: 0, fontSize: "2rem", alignSelf: "center" }}
              >
                {sellPrice.toFixed(3).split(".")[1]?.substring(0, 2)}
              </Text>
              {sellPrice.toFixed(3).split(".")[1]?.substring(2)}
            </>
          )}
        </Text>
        <Text style={{ margin: 0, fontSize: "1rem", alignSelf: "center" }}>
          {buyPrice && (
            <>
              {buyPrice.toFixed(3).split(".")[0] + "."}
              <Text
                style={{ margin: 0, fontSize: "2rem", alignSelf: "center" }}
              >
                {buyPrice.toFixed(3).split(".")[1]?.substring(0, 2)}
              </Text>
              {buyPrice.toFixed(3).split(".")[1]?.substring(2)}
            </>
          )}
        </Text>
      </Space>
    </Card>
  );
};

export default Ticker;
