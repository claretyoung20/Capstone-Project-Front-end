import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RegisterCustomerComponent } from './register-customer/register-customer.component';
import { CustomerMenuComponent } from './customer-menu/customer-menu.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/material/material.module';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { ListOrderComponentComponent } from './customer-profile/list-order-component/list-order-component.component';
import { ListReservationComponentComponent } from './customer-profile/list-reservation-component/list-reservation-component.component';
import { EditCustomerAccountComponent } from './customer-profile/edit-customer-account/edit-customer-account.component';
import { TableMapComponent } from './table-map/table-map.component';
import { TableDisplayComponent } from './table-map/table-display/table-display.component';
import { BookTableFormComponent } from './table-map/book-table-form/book-table-form.component';
import { BookPolicyComponent } from './table-map/book-policy/book-policy.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  declarations: [
    HomeComponent,
    RegisterCustomerComponent,
    CustomerMenuComponent,
    CustomerLoginComponent,
    CustomerProfileComponent,
    ListOrderComponentComponent,
    ListReservationComponentComponent,
    EditCustomerAccountComponent,
    TableMapComponent,
    TableDisplayComponent,
    BookTableFormComponent,
    BookPolicyComponent
  ]
})
export class CustomerContainersModule { }
