import { Coupon } from './../../../entities/interfaces/coupon';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CouponService } from './../../../entities/services/coupon/coupon.service';
import { ICoupon } from './../../../entities/interfaces/iCoupon';
import { Component, OnInit } from '@angular/core';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
import { TimeService } from 'app/shared/util/time.service';

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
    private activatedRoute: ActivatedRoute,
    private timeService: TimeService,
    private router: Router,
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
    const data = this.prepareToSave(this.coupon);
    console.log(data);
    if (this.coupon.id !== undefined) {
      this.subscribeToSaveResponse(this.couponService.update(data));
    } else {
      this.subscribeToSaveResponse(this.couponService.create(data));
    }
  }
  prepareToSave(data) {
    const dataProcess = data;
    dataProcess.startFromDate = this.timeService.fromTimeDatePicker(dataProcess.startFromDate).setUTC().toISOString();
    dataProcess.endDate = this.timeService.fromTimeDatePicker(dataProcess.endDate).setUTC().toISOString();
    return dataProcess;
  }

  private subscribeToSaveResponse(result: Observable<Coupon>) {
    result.subscribe(
      (res: ICoupon) => this.onSaveSuccess(),
      (res: HttpErrorResponse) => this.onSaveError()
    );
  }

  private onSaveSuccess() {
    this.isSaving = false;
    this.router.navigate(['/admin/promotion']);
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
