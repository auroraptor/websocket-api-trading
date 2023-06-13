import { ClientMessage } from "./Models/ClientMessages";
import {
  ClientMessageType,
  Instrument,
  OrderSide,
  ServerMessageType,
} from "./Enums";
import Decimal from "decimal.js";
import {
  ServerEnvelope,
  OrderDataMessage,
  MarketDataUpdate,
} from "./Models/ServerMessages";
import { mockServerURL } from "./mocks/MockServer";
import { OrderData } from "./OrdersTable";

export default class WSConnector {
  connection: WebSocket | undefined;

  constructor() {
    this.connection = undefined;
  }

  connect = (
    onMessage: (data: OrderData[]) => void,
    onPriceUpdate: (marketUpdate: MarketDataUpdate) => void
  ) => {
    this.connection = new WebSocket(mockServerURL);
    this.connection.onclose = () => {
      this.connection = undefined;
    };

    this.connection.onerror = () => {};

    this.connection.onopen = () => {};

    this.connection.onmessage = (event) => {
      const message: ServerEnvelope = JSON.parse(event.data);

      switch (message.messageType) {
        case ServerMessageType.success:
          const orderMessage = message.message as OrderDataMessage;
          onMessage(orderMessage.orders);
          break;
        case ServerMessageType.error:
          break;
        case ServerMessageType.executionReport:
          break;
          case ServerMessageType.marketDataUpdate:
            const marketUpdateMessage = message.message as MarketDataUpdate;
            onPriceUpdate(marketUpdateMessage);
            break;
      }
    };
  };

  disconnect = () => {
    this.connection?.close();
  };

  send = (message: ClientMessage) => {
    this.connection?.send(JSON.stringify(message));
  };

  subscribeMarketData = (instrument: Instrument) => {
    this.send({
      messageType: ClientMessageType.subscribeMarketData,
      message: {
        instrument,
      },
    });
  };

  unsubscribeMarketData = (subscriptionId: string) => {
    this.send({
      messageType: ClientMessageType.unsubscribeMarketData,
      message: {
        subscriptionId,
      },
    });
  };

  placeOrder = (
    instrument: Instrument,
    side: OrderSide,
    amount: Decimal,
    price: Decimal
  ) => {
    this.send({
      messageType: ClientMessageType.placeOrder,
      message: {
        instrument,
        side,
        amount,
        price,
      },
    });
  };
}
