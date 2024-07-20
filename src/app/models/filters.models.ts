import { OrderStatus } from "./orders.models";

// export interface StatusFilter {
//     status: OrderStatus[];
// }

// export interface ProductFilter {
//     product: 
// }   

// export interface DateRangeFilter {
//     startDate: Date | null;
//     endDate: Date | null;
// }

// export interface SearchOrderNumberFilter {
//     searchOrderNumber: number | null;
// }

export interface Filters {
    status?: OrderStatus[];
    product?: string | null;
    dateRange?: {
        startDate: Date | null;
        endDate: Date | null;
    }
    searchOrderNumber?: number | null;
}