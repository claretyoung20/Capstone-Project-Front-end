import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { MaterialModule } from 'app/material/material.module';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CustomerAddComponent } from './customer-add/customer-add.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    CustomerComponent,
    CustomerEditComponent,
    CustomerAddComponent
  ]
})
export class CustomerModule { }
