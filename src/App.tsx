import React from 'react';
import './App.css';
import Ticker from './Ticker';
import OrdersTable from './OrdersTable';

function App() {
  return (
    <div className="App">
      <Ticker/>
      <OrdersTable />
    </div>
  );
}

export default App;
