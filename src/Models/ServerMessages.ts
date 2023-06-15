import { Instrument, OrderStatus, OrderSide } from "../Enums";
import { Envelope, Message, Quote } from "./Base";
import Decimal from "decimal.js";

export interface ServerEnvelope extends Envelope {
  messageType: ServerMessage;
}

export interface ServerMessage extends Message {}

export interface ErrorInfo extends ServerMessage {
  reason: string;
}

export interface SuccessInfo extends ServerMessage {}

export interface ExecutionReport extends ServerMessage {
  orderId: string;
  orderStatus: OrderStatus;
}
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
export interface OrderDataMessage extends Message {
  orders: OrderData[];
}
export interface MarketDataUpdate extends ServerMessage {
  subscriptionId: string;
  instrument: Instrument;
  quotes: [Quote];
}
