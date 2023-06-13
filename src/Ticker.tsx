import React, { useState, useEffect } from "react";
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
  tickerPrices: Record<
    string,
    { bid: Decimal; offer: Decimal; minAmount: Decimal; maxAmount: Decimal }
  >;
  onOrderSubmit: (order: PlaceOrder) => void;
};

const Ticker: React.FC<TickerProps> = ({ tickerPrices, onOrderSubmit }) => {
  const [currentInstrument, setСurrentInstrument] = useState<string>();
  let selectedInstrument = currentInstrument
    ? tickerPrices[currentInstrument]
    : undefined;
  let sellPrice = selectedInstrument
    ? new Decimal(selectedInstrument.bid).toNumber()
    : 0;
  let buyPrice = selectedInstrument
    ? new Decimal(selectedInstrument.offer).toNumber()
    : 0;
  let defaultVolume = selectedInstrument
    ? new Decimal(selectedInstrument.minAmount).toNumber()
    : 0;
  let minAmount = selectedInstrument
    ? new Decimal(selectedInstrument.minAmount).toNumber()
    : 0;
  let maxAmount = selectedInstrument
    ? new Decimal(selectedInstrument.maxAmount).toNumber()
    : 1000000;

  const [volume, setVolume] = useState<number>(defaultVolume);
  const instruments = Object.keys(Instrument)
    .filter((key) => isNaN(Number(key)))
    .map((instrument) => ({
      value: instrument,
      label: instrument.toUpperCase().replace("_", "/"),
    }));

  useEffect(() => {
    if (!currentInstrument && instruments && instruments.length > 0) {
      setСurrentInstrument(instruments[0].value);
    }
  }, [currentInstrument, instruments]);

  useEffect(() => {
    if (selectedInstrument) {
      setVolume(new Decimal(selectedInstrument.minAmount).toNumber());
    }
  }, [selectedInstrument]);

  const handleOrderSubmit = (side: OrderSide) => {
    if (currentInstrument) {
      onOrderSubmit({
        instrument: Instrument[currentInstrument as keyof typeof Instrument],
        side: side,
        amount: new Decimal(volume),
        price:
          side === OrderSide.sell
            ? new Decimal(sellPrice)
            : new Decimal(buyPrice),
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
          style={{ width: "80%", background: "#cf1322" }}
          onClick={() => handleOrderSubmit(OrderSide.sell)}
        >
          Sell
        </Button>,
        <Button
          type="primary"
          block
          size="large"
          style={{ width: "80%", background: "#389e0d" }}
          onClick={() => handleOrderSubmit(OrderSide.buy)}
        >
          Buy
        </Button>,
      ]}
    >
      <Select
        style={{ width: "100%", margin: "10px 0" }}
        value={currentInstrument}
        size="large"
        dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
        options={instruments}
        onChange={(newValue: string) => setСurrentInstrument(newValue)}
      />
      <InputNumber
        style={{ width: "100%", margin: "10px 0", textAlign: "center" }}
        min={minAmount}
        max={maxAmount}
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
