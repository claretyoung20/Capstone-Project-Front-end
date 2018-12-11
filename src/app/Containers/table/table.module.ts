import { TableComponent } from './table.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditTableComponent } from './edit-table/edit-table.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [
    TableComponent,
    EditTableComponent
]
})
export class TableModule { }
