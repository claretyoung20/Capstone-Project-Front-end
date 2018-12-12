import { LOCALSTORAGEFORCUSTOMER } from 'app/static/constants/site.constants';
import { Customer } from 'app/entities/interfaces/customer';
import { Component, OnInit } from '@angular/core';
import { PaginationService } from 'app/shared/pagination/pagination.service';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { Reservation } from 'app/entities/interfaces/reservation';
import { ReservationService } from 'app/entities/services/reservation/reservation.service';
import { CancelResevatioDialogComponent } from '../cancel-resevatio-dialog/cancel-resevatio-dialog.component';

@Component({
  selector: 'app-list-reservation-component',
  templateUrl: './list-reservation-component.component.html',
  styleUrls: ['./list-reservation-component.component.css']
})
export class ListReservationComponentComponent implements OnInit {
  reservation: Reservation[] = [];
  customer: Customer;
  customerId: number;
  displayedColumns: string[] = [
    'id',
    'dateCreated',
    'dateUpdated',
    'time',
    'comment',
    'status',
    'action'
  ];
  dataSource;


  /* paganation */
  pageSize = 10;
  currentPage = 0;
  pager: any = {};
  totalItems: any = 0;
  constructor(
    public dialog: MatDialog,
    private pagination: PaginationService,
    private resevationService: ReservationService
  ) { }

  ngOnInit() {
    this.customerId = JSON.parse(
      localStorage.getItem(LOCALSTORAGEFORCUSTOMER) || '0'
    );

    this.getAllReservation();
  }

  getAllReservation() {
    this.resevationService.getActiveReservation(this.customerId).subscribe(res => {
      this.processToShow(res);
    });
  }

  getStatus(time) {
    if (time === 'e') {
      return 'Evening';
    } else if (time === 'm') {
      return 'Morning'
    }
  }

  processToShow(res) {
    this.pager = this.pagination.getPager(
      this.currentPage,
      this.pageSize,
      res.totalElements
    );
    console.log('pager', this.pager);
    console.log(res);
    this.dataSource = new MatTableDataSource(res);
    this.reservation = res;
    this.totalItems = res.totalElements;
  }

  setPage(number) {
    this.currentPage = number;
    this.getAllReservation();
  }
  changePageSize(value) {
    console.log('Page size to show ' + value);
    this.pageSize = value;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cancelOrder(id) {
    const title = 'Delete';
    const dialogRef = this.dialog.open(CancelResevatioDialogComponent, {
      data: {
        reservationId: id,
        title: title
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getAllReservation();
    });

  }
}


