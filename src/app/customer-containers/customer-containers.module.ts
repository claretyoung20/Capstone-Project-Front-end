import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RegisterCustomerComponent } from './register-customer/register-customer.component';
import { CustomerMenuComponent } from './customer-menu/customer-menu.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/material/material.module';


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
    CustomerLoginComponent
  ]
})
export class CustomerContainersModule { }
