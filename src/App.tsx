import { useEffect, useState } from "react";
import WSConnector from "./WSClient";
import "./App.css";
import Ticker from "./Ticker";
import OrdersTable from "./OrdersTable";
import { OrderData } from "./OrdersTable";
import Decimal from "decimal.js";

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

  return (
    <div className="App">
      <Ticker price={new Decimal(1000)} onOrderSubmit={(order) => console.log(order)} />
      <OrdersTable orders={orders} />
    </div>
  );
}

export default App;
