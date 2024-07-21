import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { FilterActions, OrderActions } from '../store/orders.actions';
import { getFilteredOrders, getLoading, getProductLines, getRelevantEndDate, getRelevantStartDate } from '../store/orders.selectors';
import { Filters } from '../models/filters.models';
import { combineLatest } from 'rxjs';
import { OrderStatus } from '../models/orders.models';



@Component({
  selector: 'cc-orders-listing',
  templateUrl: './orders-listing.component.html',
  styleUrl: './orders-listing.component.less'
})

export class OrdersListingComponent {
  orderStatus = OrderStatus;

  data$ = combineLatest({
    orders: this.store.pipe(select(getFilteredOrders)),
    productLines: this.store.pipe(select(getProductLines)),
    relevantStartDate: this.store.pipe(select(getRelevantStartDate)),
    relevantEndDate: this.store.pipe(select(getRelevantEndDate)),
    loading: this.store.pipe(select(getLoading)),
  });

  constructor(private store: Store) {
    this.store.dispatch(OrderActions.loadOrders());
  }

  filterChange(filters: Filters) {
    this.store.dispatch(FilterActions.updateFilters({ filters }));
  }
}
