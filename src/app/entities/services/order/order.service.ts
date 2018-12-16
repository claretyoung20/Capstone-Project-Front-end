import { tap } from 'rxjs/operators';
import {EntityService, QueryOption} from './../entity.service';
import {HH_COUPON, HH_ORDER} from './../../../static/constants/api.contants';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { Order } from 'app/entities/interfaces/order';
import {Coupon} from '../../interfaces/coupon';

@Injectable({
  providedIn: 'root'
})

export class OrderService extends EntityService<Order> {

  order$: Subject<any> = new BehaviorSubject(null);
  baseUrl = HH_ORDER.BASE;
  constructor() {
    super();
  }

  getbyStatusId(id: number | string) {
    const option = this.buildFindAllOption();
    const reqOptions = this.buildQueryRequestOption(option);
    const url = HH_ORDER.BYSTATUSID + '/' + id;
      return this.http.get<Order>(url, reqOptions).pipe(
        tap(this.onResponse.bind(this)));
  }

  getOrderHistory(id: number | string): Observable<any> {
    const option = this.buildFindAllOption();
    const reqOptions = this.buildQueryRequestOption(option);
    const url = HH_ORDER.HISTORYORDER + '/' + id;
      return this.http.get<Order>(url, reqOptions).pipe(
        tap(this.onResponse.bind(this)));
  }

  getActiveOrder(id: number | string): Observable<any> {
    const option = this.buildFindAllOption();
    const reqOptions = this.buildQueryRequestOption(option);
    const url = HH_ORDER.ACTIVEORDER + '/' + id;
      return this.http.get<Order>(url, reqOptions).pipe(
        tap(this.onResponse.bind(this)));
  }

  getTodaysOrder(option: QueryOption): Observable<any> {
      // const option = this.buildFindAllOption();
      // const reqOptions = this.buildQueryRequestOption(option);
      const url = HH_ORDER.TODAYSORDER;
      const reqOptions = this.buildQueryRequestOption(option);
      return this.http.get<Order>(url, reqOptions).pipe(
          tap(this.onResponse.bind(this)));
  }

  getHistoryOrder(option: QueryOption): Observable<any> {
      // const option = this.buildFindAllOption();
      // const reqOptions = this.buildQueryRequestOption(option);
      // const url = HH_ORDER.CURRENTORDERHISTORY;

      const reqOptions = this.buildQueryRequestOption(option);
      const url = this.buildQueryUrl(option);
      return this.http.get<Order>(url, reqOptions).pipe(
          tap(this.onResponse.bind(this)));
  }

}
