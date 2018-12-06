import { UtilsModule } from './util/utils.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntitiesModule } from './../entities/entities.module'
import { PaginationService } from './pagination/pagination.service';
@NgModule({
  imports: [
    CommonModule,
    EntitiesModule,
    UtilsModule
  ],
  declarations: [],

  exports: [
    EntitiesModule,
    UtilsModule
  ],

  providers: [PaginationService]
})
export class SharedModule { }
