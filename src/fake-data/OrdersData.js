import OrderStatuses from "../components/OrderStatuses";

const OrdersData = [
    {
        key: 1,
        customer: 'Sonia',
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
        customer: 'John',
        status: OrderStatuses.ACCEPTED,
        items: [
            {
                key: 1,
                name: 'Americano',
                amount: 1,
                price: 2.80,
                specifications: ['Almond Milk'],
            },
        ]
    },
    {
        key: 3,
        customer: 'Paula',
        status: OrderStatuses.ACCEPTED,
        items: [
            {
                key: 1,
                name: 'Mocha',
                amount: 1,
                price: 2.80,
                specifications: ['Oat Milk'],
            },
        ]
    },
    {
        key: 4,
        customer: 'Sebastian',
        status: OrderStatuses.INCOMING,
        items: [
            {
                key: 1,
                name: 'White Americano',
                amount: 1,
                price: 2.20,
                specifications: ['Almond Milk'],
            },
        ]
    }
]

export default OrdersData;