import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
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

}
