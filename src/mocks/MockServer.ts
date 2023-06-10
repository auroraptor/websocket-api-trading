import { Server } from 'mock-socket';
import { ServerMessageType } from '../Enums';

export const mockServerURL = 'ws://localhost:8080';

const mockServer = new Server(mockServerURL);

const mockData = [
    {
      id: '1',
      creationTime: '2023-05-26T14:00:00.000Z',
      statusUpdateTime: '2023-05-26T14:05:00.000Z',
      status: 'Active',
      side: 'Buy',
      price: 10,
      amount: 2,
      instrument: 'Bitcoin',
    },
    {
      id: '2',
      creationTime: '2023-05-26T14:10:00.000Z',
      statusUpdateTime: '2023-05-26T14:15:00.000Z',
      status: 'Active',
      side: 'Sell',
      price: 20,
      amount: 1.5,
      instrument: 'CNH/RUB',
    },
    {
      id: '3',
      creationTime: '2023-05-26T14:20:00.000Z',
      statusUpdateTime: '2023-05-26T14:25:00.000Z',
      status: 'Active',
      side: 'Sell',
      price: 30,
      amount: 1.8,
      instrument: 'Bitcoin',
    },
    {
      id: '4',
      creationTime: '2023-05-26T14:30:00.000Z',
      statusUpdateTime: '2023-05-26T14:35:00.000Z',
      status: 'Filled',
      side: 'Sell',
      price: 40,
      amount: 1.2,
      instrument: 'CNH/RUB',
    },
    {
      id: '5',
      creationTime: '2023-05-26T14:40:00.000Z',
      statusUpdateTime: '2023-05-26T14:45:00.000Z',
      status: 'Cancelled',
      side: 'Buy',
      price: 50,
      amount: 1.6,
      instrument: 'Bitcoin',
    },
    {
      id: '6',
      creationTime: '2023-05-26T14:50:00.000Z',
      statusUpdateTime: '2023-05-26T14:55:00.000Z',
      status: 'Filled',
      side: 'Sell',
      price: 60,
      amount: 1.7,
      instrument: 'EUR/USD',
    },
    {
      id: '7',
      creationTime: '2023-05-26T15:00:00.000Z',
      statusUpdateTime: '2023-05-26T15:05:00.000Z',
      status: 'Rejected',
      side: 'Buy',
      price: 70,
      amount: 1.9,
      instrument: 'Bitcoin',
    },
    {
      id: '8',
      creationTime: '2023-05-26T15:10:00.000Z',
      statusUpdateTime: '2023-05-26T15:15:00.000Z',
      status: 'Active',
      side: 'Buy',
      price: 80,
      amount: 2.1,
      instrument: 'CNH/RUB',
    },
    {
      id: '9',
      creationTime: '2023-05-26T15:20:00.000Z',
      statusUpdateTime: '2023-05-26T15:25:00.000Z',
      status: 'Cancelled',
      side: 'Sell',
      price: 90,
      amount: 2.3,
      instrument: 'EUR/USD',
    },
    {
      id: '10',
      creationTime: '2023-05-26T15:30:00.000Z',
      statusUpdateTime: '2023-05-26T15:35:00.000Z',
      status: 'Rejected',
      side: 'Buy',
      price: 100,
      amount: 2.5,
      instrument: 'EUR/USD',
    },
  ];
  
  mockServer.on('connection', socket => {
    const message = {
      messageType: ServerMessageType.success,
      message: {
        orders: mockData,
      },
    };
    socket.send(JSON.stringify(message));
  });
  