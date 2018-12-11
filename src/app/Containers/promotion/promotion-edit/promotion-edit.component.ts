import { Coupon } from './../../../entities/interfaces/coupon';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CouponService } from './../../../entities/services/coupon/coupon.service';
import { ICoupon } from './../../../entities/interfaces/iCoupon';
import { Component, OnInit } from '@angular/core';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';

@Component({
  selector: 'app-promotion-edit',
  templateUrl: './promotion-edit.component.html',
  styleUrls: ['./promotion-edit.component.css']
})
export class PromotionEditComponent implements OnInit {
  id: any;
  private _coupon: Coupon;
  isSaving: boolean;

  endDateDp: any;
  startFromDateDp: any;

  dateOptions: INgxMyDpOptions = {
    dateFormat: 'yyyy-mm-dd'
  };

  constructor(
    private couponService: CouponService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this._coupon = {};

    this.activatedRoute.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.id = params.get('id');
        this.getAllByCouponId(this.id);
      } else {
        // error handling
      }
    });
  }

  getAllByCouponId(id) {
    this.couponService.find(id).subscribe(res => {
      this._coupon = res;
    });
  }
  previousState() {
    window.history.back();
  }

   // date
   onDateChanged(event: IMyDateModel): void {
    console.log('event date', event);
  }

  save() {
    this.isSaving = true;
    
    if (this.coupon.id !== undefined) {
      this.subscribeToSaveResponse(this.couponService.update(this.coupon));
    } else {
      this.subscribeToSaveResponse(this.couponService.create(this.coupon));
    }
  }

  private subscribeToSaveResponse(result: Observable<Coupon>) {
    result.subscribe(
      (res: ICoupon) => this.onSaveSuccess(),
      (res: HttpErrorResponse) => this.onSaveError()
    );
  }

  private onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  private onSaveError() {
    this.isSaving = false;
  }

  private onError(errorMessage: string) {
    // this.jhiAlertService.error(errorMessage, null, null);
  }
  get coupon() {
    return this._coupon;
  }

  set coupon(coupon: ICoupon) {
    this._coupon = coupon;
  }
}
