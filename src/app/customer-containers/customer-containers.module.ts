import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RegisterCustomerComponent } from './register-customer/register-customer.component';
import { CustomerMenuComponent } from './customer-menu/customer-menu.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HomeComponent,
    RegisterCustomerComponent,
    CustomerMenuComponent
  ]
})
export class CustomerContainersModule { }
