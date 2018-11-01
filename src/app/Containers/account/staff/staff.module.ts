import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffComponent } from './staff.component';
import { ListStaffComponent } from './list-staff/list-staff.component';
import { MaterialModule } from 'app/material/material.module';
@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    StaffComponent,
    ListStaffComponent
  ]
})
export class StaffModule { }
