import { createReducer, on } from "@ngrx/store";

import { FilterActions, OrderActions } from "./orders.actions";
import { Filters } from "../models/filters.models";
import { Order } from "../models/orders.models";

export interface OrdersState {
    orders: Order[];
    loading: boolean;
    error: string | null;
    filters: Filters;
}

export const initialOrdersState: OrdersState = {
    orders: [],
    loading: false,
    error: null,
    filters: {}
};

export const ordersReducer = createReducer(
    initialOrdersState,
    on(OrderActions.loadOrders, state => ({
        ...state,
        loading: true,
        error: null
    })),
    on(OrderActions.loadOrdersSuccess, (state, { orders }) => ({
        ...state,
        orders,
        loading: false
    })),
    on(OrderActions.loadOrdersError, (state, { error }) => ({
        ...state,
        error,
        loading: false
    })),
    on(FilterActions.updateFilters, (state, { filters }) => ({
        ...state,
        filters
    }))
);