import { Action, ActionReducerMap, createReducer, on, State } from "@ngrx/store";
import { Order } from "../models/orders.models";
import { FilterActions, OrderActions } from "./orders.actions";
import { Filters } from "../models/filters.models";

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


export const orders = createReducer(
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

export function ordersReducer(state: OrdersState | undefined, action: Action) {
    return orders(state, action);
}