import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffComponent } from './staff.component';
import { MaterialModule } from 'app/material/material.module';
import { StaffEditComponent } from './staff-edit/staff-edit.component';
import { FormsModule } from '@angular/forms';
import { ErrorStaffDialogComponent } from './error-staff-dialog/error-staff-dialog.component';
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [
    StaffComponent,
    StaffEditComponent,
    ErrorStaffDialogComponent
  ],

   entryComponents: [
       ErrorStaffDialogComponent
   ]
})
export class StaffModule { }
