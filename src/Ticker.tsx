import React, { useState } from "react";
import {
  Card,
  TreeSelect,
  InputNumber,
  Space,
  Divider,
  Typography,
  Button,
} from "antd";

const { Text } = Typography;
const treeData = [
  {
    value: "parent 1",
    title: "parent 1",
  },
  {
    value: "parent 2",
    title: "parent 2",
  },
];

const sellPrice = 8;
const buyPrice = 9;

const Ticker: React.FC = () => {
  const [value, setValue] = useState<string>();

  const onChange = (newValue: string) => {
    setValue(newValue);
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
        >
          Sell
        </Button>,
        <Button
          type="primary"
          block
          size="large"
          style={{ width: "80%", background: "#3CB371" }}
        >
          Buy
        </Button>,
      ]}
    >
      <TreeSelect
        showSearch
        style={{ width: "100%", margin: "10px 0" }}
        value={value}
        size="large"
        dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
        placeholder="Please select"
        allowClear
        treeDefaultExpandAll
        onChange={onChange}
        treeData={treeData}
      />
      <InputNumber
        style={{ width: "100%", margin: "10px 0", textAlign: "center" }}
        min={1000}
        max={1000000}
        step={1000}
        size="large"
        defaultValue={100000}
      />
      <Space align="center" size="large" split={<Divider type="vertical" />}>
        <Text style={{ margin: 0, fontSize: "1.5rem", alignSelf: "center" }}>
          {sellPrice}.
          <Text style={{ margin: 0, fontSize: "3rem", alignSelf: "center" }}>
            22
          </Text>
          1
        </Text>
        <Text style={{ margin: 0, fontSize: "1.5rem", alignSelf: "center" }}>
          {buyPrice}.
          <Text style={{ margin: 0, fontSize: "3rem", alignSelf: "center" }}>
            22
          </Text>
          0
        </Text>
      </Space>
    </Card>
  );
};

export default Ticker;
