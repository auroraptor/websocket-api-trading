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

export const mockData:MockData[] = [
    {
      id: '1',
      creationTime: '2023-05-26T14:00:00.000Z',
      statusUpdateTime: '2023-05-26T14:05:00.000Z',
      status: 1,
      side: 1,
      price: new Decimal(10),
      amount:  new Decimal(10),
      instrument: 1,
    }
];