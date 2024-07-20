import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { OrderActions } from '../store/orders.actions';
import { getFilteredOrders } from '../store/orders.selectors';

@Component({
  selector: 'cc-orders-listing',
  templateUrl: './orders-listing.component.html',
  styleUrl: './orders-listing.component.less'
})
export class OrdersListingComponent {
  data$ = this.store.pipe(select(getFilteredOrders))
  constructor(private store: Store){
    this.store.dispatch(OrderActions.loadOrders());
  }
}
