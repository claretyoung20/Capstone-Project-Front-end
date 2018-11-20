import { Injectable } from '@angular/core';
import { EntityService } from '../entity.service';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { ICart } from 'app/entities/interfaces/cart';
import { HH_CART } from 'app/static/constants/api.contants';
import { tap, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import * as moment from 'moment';

type EntityResponseType = HttpResponse<ICart>;
@Injectable({
  providedIn: 'root'
})
export class CartService extends EntityService<ICart> {

  cart$: Subject<any> = new BehaviorSubject(null);
  baseUrl = HH_CART.BASE;
  constructor() {
    super();
  }

  public findAllByPudctIdAndCustomerId(productId: number | string, customerId: number | string): Observable<EntityResponseType> {
    const url = HH_CART.CHECKCART + '/?productId=' + productId + '&customerId=' + customerId;
    return this.http
      .get<ICart>(url, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  public findAllByCustomerId(id: number | string): Observable<any> {
    const option = this.buildFindAllOption();
    const reqOptions = this.buildQueryRequestOption(option);
    const url = HH_CART.BYCUTOMERID + '/' + id;
      return this.http.get<ICart>(url, reqOptions).pipe(
        tap(this.onResponse.bind(this)));
  }

  private convertDateFromServer(res: EntityResponseType): EntityResponseType {
    res.body.dateCreated = res.body.dateCreated != null ? moment(res.body.dateCreated) : null;
    res.body.dateUpdated = res.body.dateUpdated != null ? moment(res.body.dateUpdated) : null;
    return res;
  }

}
