import { createActionGroup, emptyProps, props } from "@ngrx/store";

import { Order } from "../models/orders.models";
import { Filters } from "../models/filters.models";

export const OrderActions = createActionGroup({
    source: "Orders - Actions",
    events: {
        loadOrders: emptyProps(),
        loadOrdersSuccess: props<{ orders: Order[] }>(),
        loadOrdersError: props<{ error: string }>(),
    }
});

export const FilterActions = createActionGroup({
    source: "Filters - Actions",
    events: {
        updateFilters: props<{ filters: Filters }>()
    }
});