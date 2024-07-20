import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FilterActions } from '../store/orders.actions';
import { Store } from '@ngrx/store';
import { Order, OrderStatus } from '../models/orders.models';
import { Filters } from '../models/filters.models';


@Component({
  selector: 'cc-orders-filter',
  templateUrl: './orders-filter.component.html',
  styleUrl: './orders-filter.component.less'
})
export class OrdersFilterComponent {
  @Input() productLines: Set<string> = new Set<string>();
  @Input() relevantDateRange: Date[] | null = [];
  @Output() filterChange = new EventEmitter<Filters>();

  filtersForm = new FormGroup({
    status: new FormControl([
      { label: 'In Progress', value: OrderStatus.IN_PROGRESS, checked: false },
      { label: 'Pending', value: OrderStatus.PENDING, checked: false },
      { label: 'Completed', value: OrderStatus.COMPLETED, checked: false }

    ]),
    productLine: new FormControl('all'),
    dateRange: new FormControl<Date[] | null>(null),
  });

  constructor(private store: Store) {
    this.filtersForm.valueChanges.subscribe(value => {
      console.log(value)
      const filters = {
        status: value.status?.filter((status) => status.checked).map((status) => status.value),
        productLine: value.productLine === 'all' ? null : value.productLine,
        dateRange: {
          startDate: value.dateRange ? value.dateRange[0] : null,
          endDate: value.dateRange ? value.dateRange[1] : null
        }
      }

      this.filterChange.emit(filters);
    });
  }

}
