import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SalesReportComponent} from './sales-report.component';
import { ExportSalesComponent } from './export-sales/export-sales.component';
import {MaterialModule} from '../../material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {Ng5SliderModule} from 'ng5-slider';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { OrderReportComponent } from './order-report/order-report.component';

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      NgbModule,
      FontAwesomeModule,
      Ng5SliderModule,
      ReactiveFormsModule,
      MaterialModule,
      NgxMyDatePickerModule.forRoot(),
  ],
  declarations: [
      SalesReportComponent,
      ExportSalesComponent,
      OrderReportComponent
  ]
})
export class SalesReportModule { }
