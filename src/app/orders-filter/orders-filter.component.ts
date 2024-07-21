import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OrderStatus } from '../models/orders.models';
import { Filters } from '../models/filters.models';


@Component({
  selector: 'cc-orders-filter',
  templateUrl: './orders-filter.component.html',
  styleUrl: './orders-filter.component.less'
})
export class OrdersFilterComponent {
  @Input() productLines: Set<string> = new Set<string>();
  @Input() relevantStartDate: Date | null = null;
  @Input() relevantEndDate: Date | null = null;
  @Output() filterChange = new EventEmitter<Filters>();

  filtersForm = new FormGroup({
    status: new FormControl([
      { label: 'In Progress', value: OrderStatus.IN_PROGRESS, checked: false },
      { label: 'Pending', value: OrderStatus.PENDING, checked: false },
      { label: 'Completed', value: OrderStatus.COMPLETED, checked: false }

    ]),
    productLine: new FormControl('all'),
    startDate: new FormControl<Date | null>(null),
    endDate: new FormControl<Date | null>(null),
    searchOrderNumber: new FormControl(null),
  });

  constructor() {
    this.filtersForm.valueChanges.subscribe(value => {
      const filters = {
        status: value.status?.filter((status) => status.checked).map((status) => status.value),
        productLine: value.productLine === 'all' ? null : value.productLine,
        startDate: value.startDate ? value.startDate : null,
        endDate: value.endDate ? value.endDate : null,
        searchOrderNumber: value.searchOrderNumber
      }

      this.filterChange.emit(filters);
    });
  }
}
