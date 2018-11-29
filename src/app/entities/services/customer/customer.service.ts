import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { HH_CUSTOMER } from 'app/static/constants/api.contants';
import { EntityService } from '../entity.service';
import { Customer } from 'app/entities/interfaces/customer';
import { tap } from 'rxjs/operators';
import { LocalStorage } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends EntityService<Customer> {
  customer$: Subject<any> = new BehaviorSubject(null);
  baseUrl = HH_CUSTOMER.BASE;
  constructor() {
    super();
  }

  // public customerLogin(email: string, password: string): Observable<Customer> {
  //   const url =  HH_CUSTOMER.LOGIN + '/?email=' + email + '&password=' + password;
  //   return this.http.get<Customer>(url).pipe(
  //     tap(this.onResponse.bind(this)
  //     // .map(this.extractResponse.bind(this))
  //     // .map(this.convertSingleResponse.bind(this))
  //     // .catch(error => this.handleError(error))
  //   ));
  // }

  public customerLogin(email: string, password: string) {
    const url =  HH_CUSTOMER.LOGIN + '/?email=' + email + '&password=' + password;
    return this.http.get<Customer>(url);
  }
}
