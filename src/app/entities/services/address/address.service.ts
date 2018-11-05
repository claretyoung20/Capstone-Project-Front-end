import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { HH_ADDRESS } from 'app/static/constants/api.contants';
import { EntityService } from '../entity.service';
import { Address } from 'app/entities/interfaces/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService  extends EntityService<Address> {

  address$: Subject<any> = new BehaviorSubject(null);
  baseUrl = HH_ADDRESS.BASE;
  constructor() {
    super();
  }


}
