import { useEffect, useState } from 'react';
import WSConnector from './WSClient';
import './App.css';
import Ticker from './Ticker';
import OrdersTable from './OrdersTable';
import { OrderData } from './OrdersTable';

function App() {
  const [orders, setOrders] = useState<OrderData[]>([]);

  useEffect(() => {
    const wsConnector = new WSConnector();
    wsConnector.connect((data: OrderData[]) => {
      setOrders(data);
    });
  }, []);

  return (
    <div className="App">
      <Ticker orders={orders} onOrderSubmit={(a) => console.log('App get: ', a)}/>
      <OrdersTable orders={orders} />
    </div>
  );
}

export default App;
