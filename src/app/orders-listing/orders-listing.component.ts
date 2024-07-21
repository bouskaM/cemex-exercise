import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';

import { getError, getFilteredOrders, getLoading, getProductLines, getRelevantEndDate, getRelevantStartDate } from '../store/orders.selectors';
import { FilterActions, OrderActions } from '../store/orders.actions';
import { Order, OrderStatus } from '../models/orders.models';
import { Filters } from '../models/filters.models';

@Component({
  selector: 'cc-orders-listing',
  templateUrl: './orders-listing.component.html',
  styleUrls: ['./orders-listing.component.less']
})

/**
 * OrdersListingComponent displays order history and provides a user interface for filtering orders.
 */
export class OrdersListingComponent implements OnInit {
  orderStatus = OrderStatus;

  data$ = combineLatest({
    orders: this.store.pipe(select(getFilteredOrders)),
    productLines: this.store.pipe(select(getProductLines)),
    relevantStartDate: this.store.pipe(select(getRelevantStartDate)),
    relevantEndDate: this.store.pipe(select(getRelevantEndDate)),
    loading: this.store.pipe(select(getLoading)),
    error: this.store.pipe(select(getError))
  });

  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.store.dispatch(OrderActions.loadOrders());
  }

  filterChange(filters: Filters) {
    this.store.dispatch(FilterActions.updateFilters({ filters }));
  }

  trackByOrderId(index: number, order: Order): number {
    return order.id;
  }

  getStatusClass(status: OrderStatus): string {
    switch (status) {
      case OrderStatus.Completed:
        return 'status-completed';
      case OrderStatus.Pending:
        return 'status-pending';
      case OrderStatus.InProgress:
        return 'status-in-progress';
      default:
        return '';
    }
  }
}