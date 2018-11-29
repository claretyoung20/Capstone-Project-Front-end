import { tap } from 'rxjs/internal/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { EntityService } from 'app/entities/services/entity.service';
import { Injectable } from '@angular/core';
import { SaleOrder } from 'app/entities/interfaces/saleOrder';
import { HH_SALE_ORDER } from 'app/static/constants/api.contants';

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
}
