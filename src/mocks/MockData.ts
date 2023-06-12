import { OrderSide, OrderStatus, Instrument } from "../Enums";
import Decimal from "decimal.js";

interface MockData {
  id: string;
  creationTime: string;
  statusUpdateTime: string;
  status: OrderStatus;
  instrument: Instrument;
  side: OrderSide;
  amount: Decimal;
  price: Decimal;
}

export const mockData: MockData[] = [
  {
    id: "1686566931600",
    creationTime: "2023-05-26T14:00:00.000Z",
    statusUpdateTime: "2023-05-26T14:05:00.000Z",
    status: OrderStatus.filled,
    side: OrderSide.buy,
    price: new Decimal(1000),
    amount: new Decimal(1000),
    instrument: Instrument.eur_rub,
  },
  {
    id: "1686336931611",
    creationTime: "2023-05-26T15:01:00.000Z",
    statusUpdateTime: "2023-05-26T14:05:00.000Z",
    status: OrderStatus.active,
    side: OrderSide.buy,
    price: new Decimal(5000),
    amount: new Decimal(400),
    instrument: Instrument.eur_usd,
  },
  {
    id: "1686566932251",
    creationTime: "2023-05-27T14:00:00.000Z",
    statusUpdateTime: "2023-05-26T14:08:00.000Z",
    status: OrderStatus.rejected,
    side: OrderSide.sell,
    price: new Decimal(5000),
    amount: new Decimal(400),
    instrument: Instrument.usd_rub,
  },
  {
    id: "1686523931614",
    creationTime: "2023-05-26T14:00:00.000Z",
    statusUpdateTime: "2023-05-28T14:05:00.000Z",
    status: OrderStatus.cancelled,
    side: OrderSide.buy,
    price: new Decimal(5000),
    amount: new Decimal(400),
    instrument: Instrument.usd_rub,
  },
];
