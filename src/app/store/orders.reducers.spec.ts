import { ordersReducer, initialOrdersState } from './orders.reducers';
import { OrderActions, FilterActions } from './orders.actions';
import { OrderStatus, QuantityUnit } from '../models/orders.models';

describe('OrdersReducer', () => {
     const mockOrders = [
        { id: 7, status: OrderStatus.InProgress, orderNumber: '3402', productLine: 'Ready-Mix', product: '2-100-3-D-35-2-1-000', quantity: { value: 8, unit: QuantityUnit.m3 }, dateRequested: new Date(2023, 1, 15) },
        { id: 8, status: OrderStatus.Pending, orderNumber: '3410', productLine: 'Cement', product: 'Blanco CPC 40 B Monterrey 30Kg', quantity: { value: 20, unit: QuantityUnit.TN }, dateRequested: new Date(2023, 2, 20) },
        { id: 9, status: OrderStatus.Completed, orderNumber: '3425', productLine: 'Aggregates', product: 'Grava Triturada Caliza Malla 5', quantity: { value: 3, unit: QuantityUnit.TN }, dateRequested: new Date(2023, 1, 25) },
    ]

    it('should set loading to true on loadOrders', () => {
        const action = OrderActions.loadOrders();
        const state = ordersReducer(initialOrdersState, action);

        expect(state.loading).toBe(true);
        expect(state.error).toBeNull();
    });

    it('should update orders and set loading to false on loadOrdersSuccess', () => {
        const orders = mockOrders
        const action = OrderActions.loadOrdersSuccess({ orders });
        const state = ordersReducer(initialOrdersState, action);

        expect(state.orders).toEqual(orders);
        expect(state.loading).toBe(false);
    });

    it('should set error and loading to false on loadOrdersError', () => {
        const error = 'Error loading orders';
        const action = OrderActions.loadOrdersError({ error });
        const state = ordersReducer(initialOrdersState, action);

        expect(state.error).toEqual(error);
        expect(state.loading).toBe(false);
    });

    it('should update filters on updateFilters', () => {
        const filters = { status: [OrderStatus.Completed] };
        const action = FilterActions.updateFilters({ filters });
        const state = ordersReducer(initialOrdersState, action);

        expect(state.filters).toEqual(filters);
    });
});