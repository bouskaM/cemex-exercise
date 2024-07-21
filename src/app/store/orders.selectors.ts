import { createFeatureSelector, createSelector } from "@ngrx/store";

import { Filters } from "../models/filters.models";
import { OrdersState } from "./orders.reducers";

export const ordersStoreName = 'orders';
export const getOrdersState = createFeatureSelector<OrdersState>(ordersStoreName);

export const getFilters = createSelector(
    getOrdersState,
    state => state.filters
);

/** Returns the orders after applying the filters */
export const getFilteredOrders = createSelector(
    getOrdersState, getFilters,
    (state, filters: Filters) => state.orders.filter(order => !(
        (filters.status && filters.status.length && !filters.status.includes(order.status)) ||
        (filters.productLine && order.productLine !== filters.productLine) ||
        (filters.startDate && new Date(order.dateRequested) < filters.startDate) ||
        (filters.endDate && new Date(order.dateRequested) > filters.endDate) ||
        (filters.searchOrderNumber && !order.orderNumber.includes(filters.searchOrderNumber))
    ))
);

/** Returns the unique product lines in the orders 
 * used to populate the product line filter dropdown
*/
export const getProductLines = createSelector(
    getOrdersState,
    state => new Set(state.orders.map(order => order.productLine))
);

/** To get the relevant date range to show in the date pickers 
 *   returning minimum and maximum date from the orders list
*/
export const getRelevantStartDate = createSelector(
    getOrdersState,
    state => {
        if (state.orders.length === 0) return null;
        const dates = state.orders.map(order => new Date(order.dateRequested));
        const minDate = dates.reduce(function (a, b) { return a < b ? a : b; });
        return minDate
    }
);

export const getRelevantEndDate = createSelector(
    getOrdersState,
    state => {
        if (state.orders.length === 0) return null;
        const dates = state.orders.map(order => new Date(order.dateRequested));
        const maxDate = dates.reduce(function (a, b) { return a > b ? a : b; });
        return maxDate
    }
);

export const getLoading = createSelector(
    getOrdersState,
    state => state.loading
);

export const getError = createSelector(
    getOrdersState,
    state => state.error
);