import { OrderStatus } from "./orders.models";
export interface Filters {
    status?: OrderStatus[];
    productLine?: string | null;
    dateRange?: {
        startDate: Date | null;
        endDate: Date | null;
    }
    searchOrderNumber?: string | null;
}