import { Instrument } from "../Enums";
import Decimal from "decimal.js";

const MockTickerPrices: Record<string, { bid: Decimal, offer: Decimal, minAmount: Decimal, maxAmount: Decimal }> = {};

MockTickerPrices[Instrument[Instrument.eur_rub]] = {
  bid: new Decimal(1.12345),
  offer: new Decimal(1.12355),
  minAmount: new Decimal(1000),
  maxAmount: new Decimal(1000000)
};

MockTickerPrices[Instrument[Instrument.eur_usd]] = {
  bid: new Decimal(1.23456),
  offer: new Decimal(1.23466),
  minAmount: new Decimal(1100),
  maxAmount: new Decimal(1100000)
};

MockTickerPrices[Instrument[Instrument.usd_rub]] = {
  bid: new Decimal(1.122),
  offer: new Decimal(1.133),
  minAmount: new Decimal(1200),
  maxAmount: new Decimal(1200000)
};

export { MockTickerPrices };