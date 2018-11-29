import { EntityService } from 'app/entities/services/entity.service';
import { Injectable } from '@angular/core';
import { OrderStatus } from 'app/entities/interfaces/orderStatus';
import { Subject, BehaviorSubject } from 'rxjs';
import { HH_ORDER_STATUS } from 'app/static/constants/api.contants';

@Injectable({
  providedIn: 'root'
})
export class OrderStatusService extends EntityService<OrderStatus> {

  orderStatus$: Subject<any> = new BehaviorSubject(null);
  baseUrl = HH_ORDER_STATUS.BASE;
  constructor() {
    super();
  }

}
