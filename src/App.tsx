import { useEffect, useState } from "react";
import WSConnector from "./WSClient";
import "./App.css";
import Ticker from "./Ticker";
import OrdersTable from "./OrdersTable";
import { OrderData } from "./OrdersTable";
import Decimal from "decimal.js";
import { PlaceOrder } from "./Models/ClientMessages";

function App() {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [wsConnector, setWsConnector] = useState<WSConnector | null>(null);

  useEffect(() => {
    const connector = new WSConnector();
    setWsConnector(connector);
    connector.connect((data: OrderData[]) => {
      setOrders(data);
    });
  }, []);

  const handleOrderSubmit = (order:PlaceOrder) => {
    if(wsConnector) {
      wsConnector.placeOrder(order.instrument, order.side, order.amount, order.price);
    }
  }

  return (
    <div className="App">
      <Ticker price={new Decimal(1000)} onOrderSubmit={handleOrderSubmit} />
      <OrdersTable orders={orders} />
    </div>
  );
}

export default App;
