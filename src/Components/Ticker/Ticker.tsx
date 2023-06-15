import React, { useState, useEffect } from "react";
import { PlaceOrder } from "../../Models/ClientMessages";
import { OrderSide, Instrument } from "../../Enums";
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
  const [loading, setLoading] = useState(true);
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
  let defaultAmount = selectedInstrument
    ? new Decimal(selectedInstrument.minAmount).toNumber()
    : 0;
  let minAmount = selectedInstrument
    ? new Decimal(selectedInstrument.minAmount).toNumber()
    : 0;
  let maxAmount = selectedInstrument
    ? new Decimal(selectedInstrument.maxAmount).toNumber()
    : 1000000;

  const [amount, setAmount] = useState<number>(defaultAmount);
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
    if (sellPrice && buyPrice) setLoading(false);
  }, [sellPrice, buyPrice])

  useEffect(() => {
    if (selectedInstrument) {
      setAmount(new Decimal(selectedInstrument.minAmount).toNumber());
    }
  }, [selectedInstrument]);

  const handleOrderSubmit = (side: OrderSide) => {
    if (currentInstrument) {
      onOrderSubmit({
        instrument: Instrument[currentInstrument as keyof typeof Instrument],
        side: side,
        amount: new Decimal(amount),
        price:
          side === OrderSide.sell
            ? new Decimal(sellPrice)
            : new Decimal(buyPrice),
      });
    }
  };

  return (
    <Card
      loading={loading}
      style={{ width: 300, margin: 30 }}
      actions={[
        <Button
          type="primary"
          block
          size="large"
          disabled={loading}
          style={{ width: "80%", background: "#cf1322" }}
          onClick={() => handleOrderSubmit(OrderSide.sell)}
        >
          Sell
        </Button>,
        <Button
          type="primary"
          block
          size="large"
          disabled={loading}
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
        value={amount}
        onChange={(value: number | null) => value !== null && setAmount(value)}
      />
      <Space align="center" size="large" split={<Divider type="vertical" />}>
        <Text style={{ margin: 0, fontSize: "2rem", alignSelf: "center" }}>
         {sellPrice.toFixed(3)}
        </Text>
        <Text style={{ margin: 0, fontSize: "2rem", alignSelf: "center" }}>
          {buyPrice.toFixed(3)}
        </Text>
      </Space>
    </Card>
  );
};

export default Ticker;
