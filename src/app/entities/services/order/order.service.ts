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

  getbyStatusId(id: number | string, option: QueryOption) {
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
      const url = HH_ORDER.CURRENTORDERHISTORY;
      const reqOptions = this.buildQueryRequestOption(option);
      return this.http.get<Order>(url, reqOptions).pipe(
          tap(this.onResponse.bind(this)));
  }

    getOrderReport(option: QueryOption): Observable<any> {
        const url = HH_ORDER.ORDERREPORT;
        const reqOptions = this.buildQueryRequestOption(option);
        return this.http.get<Order>(url, reqOptions).pipe(
            tap(this.onResponse.bind(this)));
    }

    getCurrentCustomerActiveOrder(id: number | string): Observable<any> {
        const option = this.buildFindAllOption();
        const reqOptions = this.buildQueryRequestOption(option);
        const url = HH_ORDER.CURRENTCUSTOMERORDER + '/' + id;
        return this.http.get<Order>(url, reqOptions).pipe(
            tap(this.onResponse.bind(this)));
    }

    getSumCompleteOrder(): Observable<any> {
        const option = this.buildFindAllOption();
        const reqOptions = this.buildQueryRequestOption(option);
        const url = HH_ORDER.SUMCOMPLETEORDER;
        return this.http.get<Number>(url, reqOptions).pipe(
            tap(this.onResponse.bind(this)));
    }

    getCountCompleteOrder(): Observable<any> {
        const option = this.buildFindAllOption();
        const reqOptions = this.buildQueryRequestOption(option);
        const url = HH_ORDER.COUNTCOMPLETEORDER;
        return this.http.get<Number>(url, reqOptions).pipe(
            tap(this.onResponse.bind(this)));
    }

    getSumCancelOrder(): Observable<any> {
        const option = this.buildFindAllOption();
        const reqOptions = this.buildQueryRequestOption(option);
        const url = HH_ORDER.SUMCANCELORDER;
        return this.http.get<Number>(url, reqOptions).pipe(
            tap(this.onResponse.bind(this)));
    }
    getCountCancelOrder(): Observable<any> {
        const option = this.buildFindAllOption();
        const reqOptions = this.buildQueryRequestOption(option);
        const url = HH_ORDER.COUNTCANCELORDER;
        return this.http.get<Number>(url, reqOptions).pipe(
            tap(this.onResponse.bind(this)));
    }

}
