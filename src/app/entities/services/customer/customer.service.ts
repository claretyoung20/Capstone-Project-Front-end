import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { HH_CUSTOMER } from 'app/static/constants/api.contants';
import { EntityService } from '../entity.service';
import { Customer } from 'app/entities/interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends EntityService<Customer> {
  customer$: Subject<any> = new BehaviorSubject(null);
  baseUrl = HH_CUSTOMER.BASE;
  constructor() {
    super();
  }
}
