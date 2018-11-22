import { BehaviorSubject, Subject } from 'rxjs';
import { EntityService } from 'app/entities/services/entity.service';
import { Injectable } from '@angular/core';
import {  HH_RESERVATION } from 'app/static/constants/api.contants';
import { Reservation } from 'app/entities/interfaces/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService extends EntityService<Reservation> {

  reservation$: Subject<any> = new BehaviorSubject(null);
  baseUrl = HH_RESERVATION.BASE;
  constructor() {
    super();
  }


  // get reservation by tabl id
}
