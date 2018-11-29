import { tap } from 'rxjs/operators';
import { EntityService } from './../entity.service';
import { HH_ORDER } from './../../../static/constants/api.contants';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Order } from 'app/entities/interfaces/order';

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
}
