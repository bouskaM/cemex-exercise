import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { FilterActions, OrderActions } from '../store/orders.actions';
import { getFilteredOrders, getProductLines } from '../store/orders.selectors';
import { Filters } from '../models/filters.models';
import { concatLatestFrom } from '@ngrx/effects';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'cc-orders-listing',
  templateUrl: './orders-listing.component.html',
  styleUrl: './orders-listing.component.less'
})
export class OrdersListingComponent {
  data$ = combineLatest({
    orders: this.store.pipe(select(getFilteredOrders)),
    productLines: this.store.pipe(select(getProductLines))
  });
  
  constructor(private store: Store) {
    this.store.dispatch(OrderActions.loadOrders());
  }

  filterChange(filters: Filters) {
    this.store.dispatch(FilterActions.updateFilters({ filters }));
  }
}
