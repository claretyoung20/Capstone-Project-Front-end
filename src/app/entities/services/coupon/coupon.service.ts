import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Coupon } from '../../interfaces/coupon';
import { EntityService } from './../entity.service';
import { HH_COUPON } from 'app/static/constants/api.contants';

@Injectable({
  providedIn: 'root'
})

export class CouponService extends EntityService<Coupon> {

  coupon$: Subject<any> = new BehaviorSubject(null);
  baseUrl = HH_COUPON.BASE;
  constructor() {
    super();
  }

  public findValidCoupon(): Observable<any> {
    const option = this.buildFindAllOption();
    const reqOptions = this.buildQueryRequestOption(option);
    const url = HH_COUPON.VALIDCOUPON;
    return this.http.get<Coupon>(url, reqOptions).pipe(
      tap(this.onResponse.bind(this)));
  }

  public activeCoupon(): Observable<any> {
    const option = this.buildFindAllOption();
    const reqOptions = this.buildQueryRequestOption(option);
    const url = HH_COUPON.ACTIVE;
    return this.http.get<Coupon>(url, reqOptions).pipe(
      tap(this.onResponse.bind(this)));
  }

  public historyCoupon(): Observable<any> {
    const option = this.buildFindAllOption();
    const reqOptions = this.buildQueryRequestOption(option);
    const url = HH_COUPON.HISTORY;
    return this.http.get<Coupon>(url, reqOptions).pipe(
      tap(this.onResponse.bind(this)));
  }
    public applyCoupon(amount: number, code: string, id: number): Observable<any> {
        const option = this.buildFindAllOption();
        const reqOptions = this.buildQueryRequestOption(option);
        const url = HH_COUPON.APPLYCOUPON + '?id=' + id + '&code=' + code + '&amount=' + amount;
        return this.http.get<Coupon>(url, reqOptions).pipe(
            tap(this.onResponse.bind(this)));
    }

}
