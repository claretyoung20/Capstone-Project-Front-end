import { Customer } from 'app/entities/interfaces/customer';
import { Reservation } from './../../../../entities/interfaces/reservation';
import { LOCALSTORAGEFORCUSTOMER } from './../../../../static/constants/site.constants';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { PaginationService } from 'app/shared/pagination/pagination.service';
import { ReservationService } from 'app/entities/services/reservation/reservation.service';

@Component({
  selector: 'app-history-reservation',
  templateUrl: './history-reservation.component.html',
  styleUrls: ['./history-reservation.component.css']
})
export class HistoryReservationComponent implements OnInit {

  reservation: Reservation[] = [];
  customer: Customer;
  customerId: number;
  displayedColumns: string[] = [
    'id',
    'dateCreated',
    'tableNumber',
    'time',
    'comment',
    'status',
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

  getStatus(time) {
    if (time === 'e') {
      return 'Evening';
    } else if (time === 'm') {
      return 'Morning'
    }
  }

  getAllReservation() {
    this.resevationService.getReservationHistory(this.customerId).subscribe(res => {
      this.processToShow(res);
    });
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

}
