import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffComponent } from './staff.component';
import { MaterialModule } from 'app/material/material.module';
import { StaffEditComponent } from './staff-edit/staff-edit.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [
    StaffComponent,
    StaffEditComponent
  ]
})
export class StaffModule { }
