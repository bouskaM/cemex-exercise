import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { OrderStatus } from '../models/orders.models';
import { Filters } from '../models/filters.models';

@Component({
  selector: 'cc-orders-filter',
  templateUrl: './orders-filter.component.html',
  styleUrl: './orders-filter.component.less' 
})

/**
 * OrdersFilterComponent is responsible for providing a user interface for filtering orders.
 * It allows users to filter orders based on status, product line, date range, and order number.
 *
 * Inputs:
 *  - productLines: Set<string> - A set of available product lines for the user to choose from.
 *  - relevantStartDate: Date | null - An optional start date to open the date picker (from) filter selector on specific date.
 *  - relevantEndDate: Date | null - An optional end date to open the date picker (to) filter selector on specific date.
 *
 * Outputs:
 *  - filterChange: EventEmitter<Filters> - Emits the selected Filter object
 *    whenever the user changes any filter option.
 */
export class OrdersFilterComponent {
  @Input() productLines: Set<string> = new Set<string>();
  @Input() relevantStartDate: Date | null = null;
  @Input() relevantEndDate: Date | null = null;
  @Output() filterChange = new EventEmitter<Filters>();

  filtersForm = new FormGroup({
    status: new FormControl(this.getStatusOptions()),
    productLine: new FormControl('all'),
    startDate: new FormControl<Date | null>(null),
    endDate: new FormControl<Date | null>(null),
    searchOrderNumber: new FormControl(null),
  });

  constructor() {
    this.filtersForm.valueChanges.subscribe(value => this.emitFilters(value));
  }

  private getStatusOptions() {
    return [
      { label: 'Pending', value: OrderStatus.Pending, checked: false },
      { label: 'In Progress', value: OrderStatus.InProgress, checked: false },
      { label: 'Completed', value: OrderStatus.Completed, checked: false }
    ];
  }

  private emitFilters(value: any) {
    const { status, productLine, startDate, endDate, searchOrderNumber } = value;
    const filters: Filters = {
      status: status?.filter((s: any) => s.checked).map((s: any) => s.value),
      productLine: productLine === 'all' ? null : productLine,
      startDate,
      endDate,
      searchOrderNumber
    };

    this.filterChange.emit(filters);
  }
}