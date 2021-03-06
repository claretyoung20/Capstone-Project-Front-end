import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { StaffModule } from './staff/staff.module';
import { CustomerModule } from './customer/customer.module';
import { MaterialModule } from 'app/material/material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    StaffModule,
    CustomerModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [
    AccountComponent
  ]
})
export class AccountModule { }
