import Decimal from "decimal.js";
import {ClientMessage} from "./ClientMessages";
import {ServerMessage} from "./ServerMessages";
import { OrderData } from "../OrdersTable";

export interface Envelope {
    messageType: ClientMessage | ServerMessage
    message: { orders: OrderData[] }
}

export interface Message {

}

export interface Quote {
    bid: Decimal
    offer: Decimal
    minAmount: Decimal
    maxAmount: Decimal
}
