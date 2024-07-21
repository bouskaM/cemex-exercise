import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { OrderActions } from "./orders.actions";
import { catchError, delay, map, of, switchMap } from "rxjs";
import { OrderStatus, QuantityUnit } from "../models/orders.models";

// Replace this with actual service/api call
const getOrders = () => of([
    { id: 1, status: OrderStatus.IN_PROGRESS, orderNumber: '3301', productLine: 'Ready-Mix', product: '1-200-2-C-28-1-2-000', quantity: { value: 12, unit: QuantityUnit.m3 }, dateRequested: new Date(2022, 9, 20) },
    { id: 2, status: OrderStatus.PENDING, orderNumber: '3305', productLine: 'Cement', product: 'Gris CPC 30 R Monterrey Extra 50Kg', quantity: { value: 10, unit: QuantityUnit.TN }, dateRequested: new Date(2022, 10, 10) },
    { id: 3, status: OrderStatus.PENDING, orderNumber: '3290', productLine: 'Aggregates', product: 'Arena Triturada Caliza Malla 4', quantity: { value: 2, unit: QuantityUnit.TN }, dateRequested: new Date(2022, 9, 29) },
    { id: 4, status: OrderStatus.COMPLETED, orderNumber: '3184', productLine: 'Aggregates', product: 'Arena Triturada Caliza Malla 4', quantity: { value: 5, unit: QuantityUnit.TN }, dateRequested: new Date(2022, 5, 14) },
    { id: 5, status: OrderStatus.COMPLETED, orderNumber: '3295', productLine: 'Cement', product: 'Gris CPC30R Tolteca Extra 50Kg', quantity: { value: 12, unit: QuantityUnit.TN }, dateRequested: new Date(2022, 4, 5) },
    { id: 6, status: OrderStatus.COMPLETED, orderNumber: '2994', productLine: 'Ready-Mix', product: '1-200-2-C-28-14-1-3-000', quantity: { value: 15.5, unit: QuantityUnit.m3 }, dateRequested: new Date(2022, 3, 10) },
]);

@Injectable()
export class OrdersEffects {
    constructor(private actions$: Actions, private store: Store) {}

    getOrders$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OrderActions.loadOrders),
            delay(500), // Simulating API call delay
            switchMap(() => {
                return getOrders().pipe(
                    switchMap(() => getOrders().pipe(
                        map(orders => 
                            OrderActions.loadOrdersSuccess({ orders })),
                        catchError(error => of(OrderActions.loadOrdersError({ error })))
                    ))
                )
            })
        )
    )
}