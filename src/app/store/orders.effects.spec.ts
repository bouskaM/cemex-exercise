import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { OrdersEffects } from './orders.effects';
import { OrderActions } from './orders.actions';
import { OrderStatus, QuantityUnit } from '../models/orders.models';

const mockOrders = [
    { id: 1, status: OrderStatus.InProgress, orderNumber: '3301', productLine: 'Ready-Mix', product: '1-200-2-C-28-1-2-000', quantity: { value: 12, unit: QuantityUnit.m3 }, dateRequested: new Date(2022, 9, 20) },
    { id: 2, status: OrderStatus.Pending, orderNumber: '3305', productLine: 'Cement', product: 'Gris CPC 30 R Monterrey Extra 50Kg', quantity: { value: 10, unit: QuantityUnit.TN }, dateRequested: new Date(2022, 10, 10) },
    { id: 3, status: OrderStatus.Pending, orderNumber: '3290', productLine: 'Aggregates', product: 'Arena Triturada Caliza Malla 4', quantity: { value: 2, unit: QuantityUnit.TN }, dateRequested: new Date(2022, 9, 29) },
    { id: 4, status: OrderStatus.Completed, orderNumber: '3184', productLine: 'Aggregates', product: 'Arena Triturada Caliza Malla 4', quantity: { value: 5, unit: QuantityUnit.TN }, dateRequested: new Date(2022, 5, 14) },
    { id: 5, status: OrderStatus.Completed, orderNumber: '3295', productLine: 'Cement', product: 'Gris CPC30R Tolteca Extra 50Kg', quantity: { value: 12, unit: QuantityUnit.TN }, dateRequested: new Date(2022, 4, 5) },
    { id: 6, status: OrderStatus.Completed, orderNumber: '2994', productLine: 'Ready-Mix', product: '1-200-2-C-28-14-1-3-000', quantity: { value: 15.5, unit: QuantityUnit.m3 }, dateRequested: new Date(2022, 3, 10) },
];

describe('OrdersEffects', () => {
    let effects: OrdersEffects;
    let actions$: Observable<any>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                OrdersEffects,
                provideMockActions(() => actions$)
            ],
        });

        effects = TestBed.inject(OrdersEffects);
    });

    it('should return a loadOrdersSuccess action, with the orders, on success', (done) => {
        actions$ = of(OrderActions.loadOrders());

        effects.getOrders$.subscribe((result) => {
            expect(result).toEqual(OrderActions.loadOrdersSuccess({ orders: mockOrders }));
            done();
        });
    });

});