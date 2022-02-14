import OrderStatuses from '../components/OrderStatuses';

const OrdersData = [
  {
    key: 1,
    status: OrderStatuses.INCOMING,
    total: 15.1,
    items: [
      {
        key: 1,
        name: 'Latte',
        amount: 1,
        price: 2.4,
        specifications: ['Oat Milk'],
      },
      {
        key: 2,
        name: 'Cappuccino',
        amount: 2,
        price: 2.3,
        specifications: ['Dairy', 'Caramel Syrup'],
      },
      {
        key: 3,
        name: 'Flat white',
        amount: 3,
        price: 2.7,
        specifications: ['Dairy'],
      },
    ],
  },

  {
    key: 2,
    status: OrderStatuses.INCOMING,
    total: 2.8,
    items: [
      {
        key: 1,
        name: 'Americano',
        amount: 1,
        price: 2.8,
        specifications: ['Almond Milk'],
      },
    ],
  },
];

export default OrdersData;
