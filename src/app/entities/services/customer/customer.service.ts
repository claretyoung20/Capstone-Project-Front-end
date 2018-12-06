import { HH_ACCOUNT } from './../../../static/constants/api.contants';
import { IUser } from './../../../core/user/user.model';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { HH_CUSTOMER } from 'app/static/constants/api.contants';
import { EntityService } from '../entity.service';
import { Customer, UserCustomer } from 'app/entities/interfaces/customer';
import { tap } from 'rxjs/operators';
import { LocalStorage } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends EntityService<UserCustomer> {
  userCustomer$: Subject<any> = new BehaviorSubject(null);
  baseUrl = HH_CUSTOMER.BASE;
  constructor() {
    super();
  }

  public customerCreate(data: IUser): Observable<IUser> {
    const url =  HH_CUSTOMER.NEWCUSTOMER;
    const option = this.buildCreateOption(data);
    return this.http.post<IUser>(url, option).pipe(
      tap(this.onResponse.bind(this)));
  }

  public findcustomerByUserId(id: number | string): Observable<UserCustomer> {
    const url = HH_CUSTOMER.BYUSERID + '/' + id;
    return this.http.get<UserCustomer>(url).pipe(
      tap(this.onResponse.bind(this)
      ));
  }

  public findUserByUserId(id: number | string): Observable<UserCustomer> {
    const url = HH_ACCOUNT.BYUSERID + '' + id;
    return this.http.get<UserCustomer>(url).pipe(
      tap(this.onResponse.bind(this)
      ));
  }

    public updateCustomerUser(data: IUser): Observable<IUser> {
      const url = HH_CUSTOMER.UPDATEUSECUSTOMER;
      const option = this.buildUpdateOption(data);
      return this.http.put<IUser>(url, option).pipe(
        tap(this.onResponse.bind(this)
       ));
  }
}
