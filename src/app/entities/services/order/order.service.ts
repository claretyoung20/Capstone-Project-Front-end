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

}
