import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { ReservationService } from 'app/entities/services/reservation/reservation.service';
import { Reservation } from 'app/entities/interfaces/reservation';

@Component({
  selector: 'app-confirm-reservation',
  templateUrl: './confirm-reservation.component.html',
  styleUrls: ['./confirm-reservation.component.css']
})
export class ConfirmReservationComponent implements OnInit {

  reservation: Reservation = {};
  constructor(
    public dialogRef: MatDialogRef<ConfirmReservationComponent>,
    private reservetionService: ReservationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.reservation = this.data.dataRes;
  }

  cancel() {
    this.dialogRef.close();
  }

  ok() {
    console.log('oooo' + this.reservation);
    this.reservetionService.create(this.reservation).subscribe(res => {
      this.dialogRef.close();
    })
  }

}
