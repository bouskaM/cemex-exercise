import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { SearchOutline, InfoCircleFill } from '@ant-design/icons-angular/icons';
import { PushPipe, LetDirective } from '@ngrx/component';

import { AppRoutingModule } from './app-routing.module';
import { ordersReducer } from './store/orders.reducers';
import { OrdersEffects } from './store/orders.effects';

import { AppComponent } from './app.component';
import { OrdersFilterComponent } from './orders-filter/orders-filter.component';
import { OrdersListingComponent } from './orders-listing/orders-listing.component';


@NgModule({
  declarations: [
    AppComponent,
    OrdersFilterComponent,
    OrdersListingComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    NzCheckboxModule,
    NzSelectModule,
    NzDatePickerModule,
    NzInputModule,
    NzSpinModule,
    PushPipe,
    LetDirective,
    NzAlertModule,
    NzIconModule.forRoot([SearchOutline, InfoCircleFill]),
    StoreModule.forRoot({ orders: ordersReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      autoPause: true,
    }),
    EffectsModule.forRoot([OrdersEffects]),
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
