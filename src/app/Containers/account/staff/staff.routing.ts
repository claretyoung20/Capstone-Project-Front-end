import { Routes, RouterModule } from '@angular/router';
import { StaffComponent } from './staff.component';
import { ListStaffComponent } from './list-staff/list-staff.component';
import { NgModule } from '@angular/core';

const routes: Routes = [];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class   StaffRoutingModule { }
