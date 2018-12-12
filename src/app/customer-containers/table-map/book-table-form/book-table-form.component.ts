import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ReservationService } from 'app/entities/services/reservation/reservation.service';
import { Reservation } from './../../../entities/interfaces/reservation';
import { formatDate } from '@angular/common';
import { Table } from 'app/entities/interfaces/table';
import {
  ERROR_MESSAGE,
  LOCALSTORAGEFORCUSTOMER,
  RESERVATIONSTATUTSPENDING
} from './../../../static/constants/site.constants';
import { TableService } from './../../../entities/services/table/table.service';
import { Validators, FormControl } from '@angular/forms';
import { MyErrorStateMatcher } from './../../../Containers/login/login.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { IMyDateModel } from 'ngx-mydatepicker';
import { Component, OnInit, Input } from '@angular/core';
import { TimeService } from 'app/shared/util/time.service';
import { ConfirmReservationComponent } from '../confirm-reservation/confirm-reservation.component';
import { TableType } from 'app/entities/interfaces/tableType';
import { TableTypeService } from 'app/entities/services/tableType/table-type.service';

@Component({
  selector: 'app-book-table-form',
  templateUrl: './book-table-form.component.html',
  styleUrls: ['./book-table-form.component.css']
})
export class BookTableFormComponent implements OnInit {
  tableForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  submitForm = false;
  reservation: Reservation = {};
  errorMessage = '';

  today = new Date();
  dd = this.today.getDate() - 1;
  mm = this.today.getMonth() + 1; // January is 0!
  yyyy = this.today.getFullYear();

  dateOptions: INgxMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    disableUntil: { year: this.yyyy, month: this.mm, day: this.dd }
  };

  currentSelectDate = '';
  dateToSave: any;
  customerId: number;
  // selectedTime: any;
  // selectedTypeId: any;

  reserveTime: ReserverTime[] = [
    { value: 'm', viewValue: 'Morning' },
    { value: 'e', viewValue: 'Evening' }
  ];

  tabletypes: TableType[];

  tables: Table[] = [];
  constructor(
    private fb: FormBuilder,
    private tableServces: TableService,
    private timeService: TimeService,
    public dialog: MatDialog,
    private router: Router,
    private tableTypeService: TableTypeService
  ) {}

  ngOnInit() {
    this.buildForm();
    this.customerId = JSON.parse(
      localStorage.getItem(LOCALSTORAGEFORCUSTOMER) || '0'
    );

    this.getAllTableTypes();
  }


  getAllTableTypes(): any {
    this.tableTypeService.findAll().subscribe(
      res => {
        this.showTableTypes(res);
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  showTableTypes(res: any): any {
    this.tabletypes = res;
    console.log(this.tabletypes);
  }

  buildForm() {
    this.tableForm = this.fb.group({
      time: [null, [Validators.required]],
      revserDate: [null,  [Validators.required]],
      tableTypeId: [null, [Validators.required]]
    });
  }
  // date
  onDateChanged(event: IMyDateModel): void {
    console.log('event date', event);
  }
  onError(res) {}

  formValue(s) {
    console.log(s.value);
  }

  viewTable() {
    console.log(this.tableForm.value);
    this.submitForm = true;
    this.errorMessage = '';
    if (this.tableForm.invalid) {
      this.errorMessage = ERROR_MESSAGE.REQUIRED_FIELD;
      return;
    }

    const data = this.tableForm.value;
    if (data.revserDate.date) {
      this.currentSelectDate = data.revserDate.formatted;

      const data2 = this.prepareToSave(this.tableForm.value);
      this.dateToSave = data2.revserDate;
    }
    data.revserDate = this.currentSelectDate;
    // data.selectedTime = this.selectedTime;
    // data.selectedTypeId = this.selectedTypeId;
    console.log(data);
    this.tableServces
      .getAvialableTable(data.tableTypeId, data.time, data.revserDate)
      .subscribe(res => {
        this.tables = res;
      });
  }

  prepareToSave(data) {
    const dataProcess = data;
    dataProcess.revserDate = this.timeService
      .fromTimeDatePicker(dataProcess.revserDate)
      .setUTC()
      .toISOString();
    return dataProcess;
  }

  reserveTable(id) {
    if (this.customerId !== 0) {
      const data = this.prepareToSave(this.tableForm.value);
      this.reservation.status = RESERVATIONSTATUTSPENDING;
      this.reservation.reserverDate = this.dateToSave;
      this.reservation.period = data.time;
      this.reservation.bookTableId = id;
      this.reservation.customerId = this.customerId;

      this.openDialog(this.reservation);
      console.log(this.reservation);
    }
  }

  openDialog(data) {
    const dialogRef = this.dialog.open(ConfirmReservationComponent, {
      data: {
        dataRes: data
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.router.navigate(['/profile']);
    });
  }
}
export interface ReserverTime {
  value: string;
  viewValue: string;
}
