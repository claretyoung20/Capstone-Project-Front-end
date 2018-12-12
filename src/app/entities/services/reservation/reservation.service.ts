import { tap } from 'rxjs/internal/operators';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
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
  getReservationHistory(id: number | string): Observable<any> {
    const option = this.buildFindAllOption();
    const reqOptions = this.buildQueryRequestOption(option);
    const url = HH_RESERVATION.RESERVATIONHISTORY + '?id=' + id;
      return this.http.get<Reservation>(url, reqOptions).pipe(
        tap(this.onResponse.bind(this)));
  }

  getActiveReservation(id: number | string): Observable<any> {
    const option = this.buildFindAllOption();
    const reqOptions = this.buildQueryRequestOption(option);
    const url = HH_RESERVATION.ACTIVERESERVATION + '?id=' + id;
      return this.http.get<Reservation>(url, reqOptions).pipe(
        tap(this.onResponse.bind(this)));
  }

  getByStatus(status: string): Observable<any> {
    const option = this.buildFindAllOption();
    const reqOptions = this.buildQueryRequestOption(option);
    const url = HH_RESERVATION.BYSTATUS + '?status=' + status;
      return this.http.get<Reservation>(url, reqOptions).pipe(
        tap(this.onResponse.bind(this)));
  }
}
