import { Server } from "mock-socket";
import { ServerMessageType, OrderStatus } from "../Enums";
import { mockData } from "./MockData";

export const mockServerURL = "ws://localhost:8080";

const mockServer = new Server(mockServerURL);

let orders = [...mockData];

mockServer.on("connection", (socket) => {
  const message = {
    messageType: ServerMessageType.success,
    message: {
      orders: orders,
    },
  };
  socket.send(JSON.stringify(message));

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
