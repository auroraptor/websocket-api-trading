import { render } from "@testing-library/react";
import WSConnector from "../../WSClient";
import App from "./App";
import { mockDeep, mockReset, MockProxy } from "jest-mock-extended";
import { WebSocket } from "mock-socket";
import { MockData } from "../../Mocks/MockData";
import { MockTickerPrices } from "../../Mocks/MockTickerPrices";
import { Instrument, OrderSide } from "../../Enums";
import { PlaceOrder } from "../../Models/ClientMessages";
import Decimal from "decimal.js";

jest.mock("../../WSClient");

describe("App", () => {
  let mockWS: MockProxy<WebSocket> & WebSocket;
  let mockWSConnector: MockProxy<WSConnector> & WSConnector;

  beforeEach(() => {
    mockWS = mockDeep<WebSocket>();
    mockWSConnector = mockDeep<WSConnector>();
    (WSConnector as jest.MockedClass<typeof WSConnector>).mockReturnValue(
      mockWSConnector
    );

    jest.spyOn(window, "WebSocket").mockImplementation(() => mockWS);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    mockReset(mockWSConnector);
    mockReset(mockWS);
  });

  it("initializes WSConnector and calls connect on component mount", () => {
    render(<App />);

    expect(mockWSConnector.connect).toHaveBeenCalled();
  });

  it("updates orders and ticker prices state", async () => {
    mockWSConnector.connect.mockImplementation((onMessage, onPriceUpdate) => {
      onMessage(MockData);

      const mockTickerUpdates = Object.keys(MockTickerPrices).map(
        (instrument) => ({
          subscriptionId: "mockId",
          instrument: Instrument[instrument as keyof typeof Instrument],
        })
      );

      expect(mockWSConnector.connect).toHaveBeenCalledWith(
        expect.any(Function),
        expect.any(Function)
      );
      mockTickerUpdates.forEach((update) => {
        expect(onPriceUpdate).toHaveBeenCalledWith(update);
      });
    });
  });

  it("calls wsConnector.placeOrder with correct parameters on order submit", () => {
    const mockOrder: PlaceOrder = {
      instrument: Instrument.eur_usd,
      side: OrderSide.buy,
      amount: new Decimal(1000),
      price: new Decimal(1.12345),
    };
  
    const wsConnector = {
      placeOrder: jest.fn(),
    };
  
    const handleOrderSubmit = (order:PlaceOrder) => {
      if(wsConnector) {
        wsConnector.placeOrder(order.instrument, order.side, order.amount, order.price);
      }
    }
  
    handleOrderSubmit(mockOrder);
  
    expect(wsConnector.placeOrder).toHaveBeenCalledWith(
      mockOrder.instrument,
      mockOrder.side,
      mockOrder.amount,
      mockOrder.price
    );
  });  
});
