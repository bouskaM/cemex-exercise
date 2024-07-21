import { OrderStatus } from "./orders.models";
export interface Filters {
    status?: OrderStatus[];
    productLine?: string | null;
    startDate?: Date | null;
    endDate?: Date | null;
    searchOrderNumber?: string | null;
}