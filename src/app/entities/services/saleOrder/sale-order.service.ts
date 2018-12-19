import { tap } from 'rxjs/internal/operators';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {EntityService, QueryOption} from 'app/entities/services/entity.service';
import { Injectable } from '@angular/core';
import { SaleOrder } from 'app/entities/interfaces/saleOrder';
import {HH_RESERVATION, HH_SALE_ORDER} from 'app/static/constants/api.contants';
import {Order} from '../../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class SaleOrderService extends EntityService<SaleOrder> {

  saleOrder$: Subject<any> = new BehaviorSubject(null);
  baseUrl = HH_SALE_ORDER.BASE;
  constructor() {
    super();
  }

  // get by order Id
  getbyOrderId(id: number | string) {
    const option = this.buildFindAllOption();
    const reqOptions = this.buildQueryRequestOption(option);
    const url = HH_SALE_ORDER.BYORDERID + '/' + id;
      return this.http.get<SaleOrder>(url, reqOptions).pipe(
        tap(this.onResponse.bind(this)));
  }

    getChart(option: QueryOption): Observable<any> {
        const reqOptions = this.buildQueryRequestOption(option);
        // const option = this.buildFindAllOption();
        // const reqOptions = this.buildQueryRequestOption(option);
        const url = HH_SALE_ORDER.CHART;
        return this.http.get<Order>(url, reqOptions).pipe(
            tap(this.onResponse.bind(this)));
    }

    findAllByDateAndPrice(option: QueryOption, checkDate: any, minValue: number, maxValue: number): Observable<any> {
        const reqOptions = this.buildQueryRequestOption(option);
        // const option = this.buildFindAllOption();
        // const reqOptions = this.buildQueryRequestOption(option);
        const url = HH_SALE_ORDER.FILTERBYDATEADNPRICE + '?checkDate=' + checkDate + '&maxValue=' + maxValue + '&minValue=' + minValue;
        return this.http.get<SaleOrder>(url, reqOptions).pipe(
            tap(this.onResponse.bind(this)));
    }

    findAllByPrice(option: QueryOption, minValue: number, maxValue: number): Observable<any> {
        const reqOptions = this.buildQueryRequestOption(option);
        // const option = this.buildFindAllOption();
        // const reqOptions = this.buildQueryRequestOption(option);
        const url = HH_SALE_ORDER.FILTERBYPRICE + '?maxValue=' + maxValue + '&minValue=' + minValue;
        return this.http.get<SaleOrder>(url, reqOptions).pipe(
            tap(this.onResponse.bind(this)));
    }
}
