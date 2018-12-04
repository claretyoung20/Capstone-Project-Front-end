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
}
