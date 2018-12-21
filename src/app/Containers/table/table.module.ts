import { TableComponent } from './table.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditTableComponent } from './edit-table/edit-table.component';
import {NgJhipsterModule} from 'ng-jhipster';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    NgJhipsterModule
  ],
  declarations: [
    TableComponent,
    EditTableComponent
]
})
export class TableModule { }
