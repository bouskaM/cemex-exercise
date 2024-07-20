import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FilterActions, OrderActions } from '../store/orders.actions';
import { Store } from '@ngrx/store';
import { OrderStatus } from '../models/orders.models';


@Component({
  selector: 'cc-orders-filter',
  templateUrl: './orders-filter.component.html',
  styleUrl: './orders-filter.component.less'
})
export class OrdersFilterComponent {
  filtersForm = new FormGroup({
    status: new FormControl([
      { label: 'In Progress', value: OrderStatus.IN_PROGRESS, checked: false },
      { label: 'Pending', value: OrderStatus.PENDING, checked: false },
      { label: 'Completed', value: OrderStatus.COMPLETED, checked: false }
    ]),
  });

  constructor(private store: Store) {
    this.filtersForm.valueChanges.subscribe(value => {

      const filters = {
        status: value.status?.filter((status) => status.checked).map((status) => status.value)
      }

      this.store.dispatch(FilterActions.updateFilters({ filters }));
    });
  }

}
