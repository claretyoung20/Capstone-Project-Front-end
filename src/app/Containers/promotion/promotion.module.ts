import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './../../material/material.module';
import { PromotionEditComponent } from './promotion-edit/promotion-edit.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionComponent } from './promotion.component';
import { PromotionHistoryComponent } from './promotion-history/promotion-history.component';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    NgbModule,
    FontAwesomeModule,
    NgxMyDatePickerModule.forRoot(),
  ],
  declarations: [
    PromotionComponent,
    PromotionEditComponent,
    PromotionHistoryComponent
  ]
})
export class PromotionModule { }
