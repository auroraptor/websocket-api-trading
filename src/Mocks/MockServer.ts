import { Server } from "mock-socket";
import { ServerMessageType, OrderStatus } from "../Enums";
import { MockData } from "./MockData";
import { MockTickerPrices } from "./MockTickerPrices";
import Decimal from "decimal.js";

export const mockServerURL = "ws://localhost:8080";

const mockServer = new Server(mockServerURL);

let orders = [...MockData];

mockServer.on("connection", (socket) => {
  const message = {
    messageType: ServerMessageType.success,
    message: {
      orders: orders,
    },
  };
  socket.send(JSON.stringify(message));

  function randomizePrices() {
    for (let key in MockTickerPrices) {
      const quote = MockTickerPrices[key];
      quote.bid = quote.bid.plus(new Decimal(Math.random() * 0.01 - 0.005).toDP(5));
      quote.offer = quote.offer.plus(new Decimal(Math.random() * 0.01 - 0.005).toDP(5));
    }
    
    const tickerUpdate = {
      messageType: ServerMessageType.marketDataUpdate,
      message: MockTickerPrices,
    };
    
    socket.send(JSON.stringify(tickerUpdate));
  }

  const intervalId = setInterval(randomizePrices, 5000);

  socket.on("close", () => {
    clearInterval(intervalId);
  });

  socket.on("message", (data: any) => {
    try {
      let incomingOrder;

      if (typeof data === "string") {
        incomingOrder = JSON.parse(data);
      } else if (data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => {
          incomingOrder = JSON.parse(reader.result as string);
        };
        reader.readAsText(data);
      } else if (data instanceof ArrayBuffer || ArrayBuffer.isView(data)) {
        const decoder = new TextDecoder();
        incomingOrder = JSON.parse(decoder.decode(data));
      } else {
        console.error("Unexpected data type:", typeof data);
      }

      const newOrder = {
        ...incomingOrder.message,
        id: Date.now().toString(),
        status: OrderStatus.active,
        creationTime: new Date().toISOString(),
        statusUpdateTime: new Date().toISOString(),
      };
      orders.push(newOrder);

      const outgoingMessage = {
        messageType: ServerMessageType.success,
        message: {
          orders: orders,
        },
      };
      socket.send(JSON.stringify(outgoingMessage));
    } catch (error) {
      const errorMessage = {
        messageType: ServerMessageType.error,
        message: {
          error: "Ошибка при обработке сообщения",
          details: console.error("Ошибка при обработке сообщения:", error),
        },
      };
      socket.send(JSON.stringify(errorMessage));
    }
  });
});
