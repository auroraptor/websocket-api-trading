import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import { MockTickerPrices } from "../../Mocks/MockTickerPrices";
import { OrderSide, Instrument } from "../../Enums";
import Decimal from "decimal.js";
import Ticker from "./Ticker";

describe("Ticker", () => {
  it("renders without error", () => {
    render(<Ticker tickerPrices={MockTickerPrices} onOrderSubmit={() => {}} />);
  });

  it("renders with disabled buttons when loading", () => {
    const mockLoadingTickerPrices = {
      ...MockTickerPrices,
      eur_usd: {
        ...MockTickerPrices.eur_usd,
        bid: new Decimal(0),
        offer: new Decimal(0),
      },
    };
    render(
      <Ticker tickerPrices={mockLoadingTickerPrices} onOrderSubmit={() => {}} />
    );
    expect(screen.getByRole("button", { name: /Sell/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /Buy/i })).toBeDisabled();
  });

  describe("instrumentSelect", () => {
    it("selects the first instrument when provided", () => {
      render(
        <Ticker tickerPrices={MockTickerPrices} onOrderSubmit={() => {}} />
      );
      expect(screen.getByText("EUR/USD")).toBeInTheDocument();
    });
  });

  describe("amountInput", () => {
    it("changes amount when the value input is changed", () => {
      render(
        <Ticker tickerPrices={MockTickerPrices} onOrderSubmit={() => {}} />
      );

      const input = screen.getByRole("spinbutton");

      fireEvent.change(input, { target: { value: "2000" } });
      expect(input).toHaveDisplayValue("2000");
    });
  });

  describe("buyButton", () => {
    const mockOnOrderSubmit = jest.fn();

    it("calls onOrderSubmit when Buy is clicked", () => {
      render(
        <Ticker
          tickerPrices={MockTickerPrices}
          onOrderSubmit={mockOnOrderSubmit}
        />
      );

      const buyButton = screen.getByText("Buy");
      fireEvent.click(buyButton);

      expect(mockOnOrderSubmit).toHaveBeenCalled();
    });

    it("passes the correct order when Buy is clicked", () => {
      render(
        <Ticker
          tickerPrices={MockTickerPrices}
          onOrderSubmit={mockOnOrderSubmit}
        />
      );

      const buyButton = screen.getByText("Buy");
      fireEvent.click(buyButton);

      expect(mockOnOrderSubmit).toHaveBeenCalledWith({
        instrument: Instrument.eur_usd,
        side: OrderSide.buy,
        amount: new Decimal(
          MockTickerPrices[Instrument[Instrument.eur_usd]].minAmount
        ),
        price: new Decimal(
          MockTickerPrices[Instrument[Instrument.eur_usd]].offer
        ),
      });
    });
  });

  describe("sellButton", () => {
    const mockOnOrderSubmit = jest.fn();

    it("calls onOrderSubmit when Sell is clicked", () => {
      const mockOnOrderSubmit = jest.fn();
      render(
        <Ticker
          tickerPrices={MockTickerPrices}
          onOrderSubmit={mockOnOrderSubmit}
        />
      );

      const sellButton = screen.getByText("Sell");
      fireEvent.click(sellButton);

      expect(mockOnOrderSubmit).toHaveBeenCalled();
    });

    it("passes the correct order when Sell is clicked", () => {
      render(
        <Ticker
          tickerPrices={MockTickerPrices}
          onOrderSubmit={mockOnOrderSubmit}
        />
      );

      const sellButton = screen.getByText("Sell");

      fireEvent.click(sellButton);

      expect(mockOnOrderSubmit).toHaveBeenCalledWith({
        instrument: Instrument.eur_usd,
        side: OrderSide.sell,
        amount: new Decimal(
          MockTickerPrices[Instrument[Instrument.eur_usd]].minAmount
        ),
        price: new Decimal(
          MockTickerPrices[Instrument[Instrument.eur_usd]].bid
        ),
      });
    });
  });
});
