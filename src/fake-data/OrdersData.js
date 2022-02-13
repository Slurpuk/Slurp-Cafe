import OrderStatuses from "../components/OrderStatuses";

const OrdersData = [
    {
        key: 1,
        status: OrderStatuses.READY,
        items: [
                {
                    key: 1,
                    name: 'Latte',
                    amount: 1,
                    price: 2.40,
                    specifications: ['Oat Milk'],
                },
                {
                    key: 2,
                    name: 'Cappuccino',
                    amount: 2,
                    price: 2.30,
                    specifications: ['Dairy', 'Caramel Syrup'],
                },
                {
                    key: 3,
                    name: 'Flat white',
                    amount: 3,
                    price: 2.70,
                    specifications: ['Dairy'],
                },
            ],
    },
    {
        key: 2,
        status: OrderStatuses.INCOMING,
        items: [
            {
                key: 1,
                name: 'Americano',
                amount: 1,
                price: 2.80,
                specifications: ['Almond Milk'],
            },
        ]
    }
]

export default OrdersData;