import { useEffect, useState } from "react";
import WSConnector from "../../WSClient";
import Ticker from "../Ticker/Ticker";
import OrdersTable from "../OrdersTable/OrdersTable";
import { OrderData } from "../../Models/ServerMessages";
import { PlaceOrder } from "../../Models/ClientMessages";
import Decimal from "decimal.js";

const App: React.FC = () => {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [wsConnector, setWsConnector] = useState<WSConnector | null>(null);
  const [tickerPrices, setTickerPrices] = useState<Record<string, { bid: Decimal, offer: Decimal, minAmount: Decimal, maxAmount: Decimal }>>({});

  useEffect(() => {
    const connector = new WSConnector();
    setWsConnector(connector);
    connector.connect(
      (data: OrderData[]) => {
        setOrders(data);
      },
      (marketUpdate: any) => { 
        for (let instrument in marketUpdate) {
          if (marketUpdate.hasOwnProperty(instrument)) {
            let quote = marketUpdate[instrument];
            if (quote && quote.bid && quote.offer) {
              setTickerPrices(prevState => ({
                ...prevState,
                [instrument]: quote
              }));
            }
          }
        }
      }
    );
  }, []);  

  const handleOrderSubmit = (order:PlaceOrder) => {
    if(wsConnector) {
      wsConnector.placeOrder(order.instrument, order.side, order.amount, order.price);
    }
  }

  return (
    <div>
      <Ticker tickerPrices={tickerPrices} onOrderSubmit={handleOrderSubmit} />
      <OrdersTable orders={orders} />
    </div>
  );
}

export default App;
