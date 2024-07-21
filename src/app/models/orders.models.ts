export interface Order {
    id: number;
    status: OrderStatus;
    orderNumber: string;
    productLine: string;
    product: string;
    quantity: Quantity;
    dateRequested: Date;
}

export enum OrderStatus {
    Pending = 'Pending',
    InProgress = 'In Progress',
    Completed = 'Completed'
}

interface Quantity {
    value: number;
    unit: QuantityUnit;
}

export enum QuantityUnit {
    TN = 'TN',
    m3 = 'm3'
}