export interface Order {
    id: number;
    status: OrderStatus;
    orderNumber: number;
    productLine: string;
    product: string;
    quantity: Quantity;
    dateRequested: Date;
}

export enum OrderStatus {
    IN_PROGRESS = 'In Progress',
    PENDING = 'Pending',
    COMPLETED = 'Completed'
}

interface Quantity {
    value: number;
    unit: QuantityUnit;
}

export enum QuantityUnit {
    TN = 'TN',
    m3 = 'm3'
}