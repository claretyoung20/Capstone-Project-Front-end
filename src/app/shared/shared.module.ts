import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntitiesModule } from './../entities/entities.module'
import { PaginationService } from './pagination/pagination.service';
@NgModule({
  imports: [
    CommonModule,
    EntitiesModule
  ],
  declarations: [],

  exports: [
    EntitiesModule
  ],

  providers: [PaginationService]
})
export class SharedModule { }
