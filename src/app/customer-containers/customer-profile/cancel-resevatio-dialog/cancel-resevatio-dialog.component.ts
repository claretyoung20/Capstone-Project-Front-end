import { RESERVATIONSTATUTSCANCEL } from './../../../static/constants/site.constants';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ReservationService } from 'app/entities/services/reservation/reservation.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Reservation } from 'app/entities/interfaces/reservation';

@Component({
  selector: 'app-cancel-resevatio-dialog',
  templateUrl: './cancel-resevatio-dialog.component.html',
  styleUrls: ['./cancel-resevatio-dialog.component.css']
})
export class CancelResevatioDialogComponent implements OnInit {

  show = false;
  id: any;
  reservation: Reservation;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CancelResevatioDialogComponent>,
    private reservationService: ReservationService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
      this.id = this.data.reservationId;
      if (this.id !== null) {
        this.getReservation(this.id);
      }
  }

  getReservation(id) {
    this.reservationService.find(id).subscribe( res => {
      this.reservation = res;
    })
  }
  cancelReservation() {
    this.reservation.status = RESERVATIONSTATUTSCANCEL;
    this.reservationService.update(this.reservation).subscribe((res) =>
      this.dialogRef.close(),
    (res: HttpErrorResponse) => {
      this.show = true;
    }
    );
  }

cancel() {
  this.dialogRef.close();
}
close() {
  this.dialogRef.close();
}
}
