import { createFeatureSelector, createSelector } from "@ngrx/store";
import { OrdersState } from "./orders.reducers";
import { Filters } from "../models/filters.models";

export const ordersStoreName = 'orders';
export const getOrdersState = createFeatureSelector<OrdersState>(ordersStoreName);

export const getFilters = createSelector(
    getOrdersState,
    state => state.filters
);

export const getFilteredOrders = createSelector(
    getOrdersState, getFilters,
    (state, filters: Filters) => state.orders.filter(order => !(
        (filters.status && filters.status.length && !filters.status.includes(order.status)) ||
        (filters.productLine && order.productLine !== filters.productLine) ||
        (filters.dateRange && filters.dateRange.startDate && order.dateRequested < filters.dateRange.startDate) ||
        (filters.dateRange && filters.dateRange.endDate && order.dateRequested > filters.dateRange.endDate) ||
        (filters.searchOrderNumber && order.orderNumber !== filters.searchOrderNumber)
    ))
);

export const getProductLines = createSelector(
    getOrdersState,
    state => new Set(state.orders.map(order => order.productLine))
);