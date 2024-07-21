import { OrderStatus, QuantityUnit } from "../models/orders.models";
import { OrdersState } from "./orders.reducers";
import { getError, getFilteredOrders, getFilters, getLoading, getOrdersState, getRelevantEndDate, getRelevantStartDate } from "./orders.selectors";

describe('OrdersSelectors', () => {
    const initialState: OrdersState = {
        orders: [
            { id: 1, status: OrderStatus.InProgress, orderNumber: '3301', productLine: 'Ready-Mix', product: '1-200-2-C-28-1-2-000', quantity: { value: 12, unit: QuantityUnit.m3 }, dateRequested: new Date(2022, 9, 20) },
            { id: 2, status: OrderStatus.Pending, orderNumber: '3305', productLine: 'Cement', product: 'Gris CPC 30 R Monterrey Extra 50Kg', quantity: { value: 10, unit: QuantityUnit.TN }, dateRequested: new Date(2022, 10, 10) },
            { id: 3, status: OrderStatus.Completed, orderNumber: '3290', productLine: 'Aggregates', product: 'Arena Triturada Caliza Malla 4', quantity: { value: 2, unit: QuantityUnit.TN }, dateRequested: new Date(2023, 9, 29) },
        ],
        filters: { status: [OrderStatus.Pending], productLine: 'Cement', startDate: new Date(2022, 9, 1), endDate: new Date(2022, 11, 1), searchOrderNumber: '3305' },
        loading: false,
        error: null
    }

    describe('ordersSelectors', () => {
        it('should return ordersState', () => {
            expect(getOrdersState.projector(initialState)).toEqual(initialState);
        });

        it('should get filters', () => {
            expect(getFilters.projector(initialState)).toEqual(initialState.filters);
        });

        it('should get filtered orders', () => {
            expect(getFilteredOrders.projector(initialState, initialState.filters)).toEqual([ { id: 2, status: OrderStatus.Pending, orderNumber: '3305', productLine: 'Cement', product: 'Gris CPC 30 R Monterrey Extra 50Kg', quantity: { value: 10, unit: QuantityUnit.TN }, dateRequested: new Date(2022, 10, 10) }]);
        });

        it('should get relevant start date', () => {
            expect(getRelevantStartDate.projector(initialState)).toEqual(new Date(2022, 9, 20));
        });

        it('should get relevant end date', () => {
            expect(getRelevantEndDate.projector(initialState)).toEqual(new Date(2023, 9, 29));
        });

        it('should get loading', () => {
            expect(getLoading.projector(initialState)).toEqual(false);
        });

        it('should get error', () => {
            expect(getError.projector(initialState)).toEqual(null);
        });
    });
});