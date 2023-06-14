import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import OrdersTable from './OrdersTable';
import { OrderStatus, OrderSide, Instrument } from './Enums';
import { OrderData } from './OrdersTable';
import Decimal from 'decimal.js';

test('renders loading state when orders prop is not provided', () => {
  render(<OrdersTable orders={undefined}/>);
  const loadingElement = screen.getByText(/Loading.../i);
  expect(loadingElement).toBeInTheDocument();
});

test('renders empty state when orders prop is an empty array', () => {
  render(<OrdersTable orders={[]} />);
  const placeholder = screen.getByText(/No data/i);
  expect(placeholder).toBeInTheDocument();
});

test('renders data when orders prop is provided', () => {
  const orders: OrderData[] = [
    {
      id: '1',
      creationTime: '2021-12-01T00:00:00Z',
      statusUpdateTime: '2021-12-01T00:01:00Z',
      status: OrderStatus.filled,
      side: OrderSide.buy,
      price: new Decimal(10),
      amount: new Decimal(1),
      instrument: Instrument.eur_rub,
    },
  ];
  
  render(<OrdersTable orders={orders} />);
  const tableElement = screen.getByRole('table');
  const statusElement = screen.getByText('Filled');
  const sideElement = screen.getByText('Buy');
  expect(tableElement).toBeInTheDocument();
  expect(statusElement).toBeInTheDocument();
  expect(sideElement).toBeInTheDocument();
});
