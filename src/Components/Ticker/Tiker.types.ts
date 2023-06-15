import { PlaceOrder } from "../../Models/ClientMessages";
import Decimal from "decimal.js";

export type TickerProps = {
  tickerPrices: Record<
    string,
    { bid: Decimal; offer: Decimal; minAmount: Decimal; maxAmount: Decimal }
  >;
  onOrderSubmit: (order: PlaceOrder) => void;
};
