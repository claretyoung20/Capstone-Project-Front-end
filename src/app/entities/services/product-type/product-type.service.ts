import { Injectable } from '@angular/core';
import { ProductType } from 'app/entities/interfaces/productType';
import { EntityService } from '../entity.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { HH_PRODUCT_TYPE } from 'app/static/constants/api.contants';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService extends EntityService<ProductType> {

  category$: Subject<any> = new BehaviorSubject(null);
  baseUrl = HH_PRODUCT_TYPE.BASE;
  constructor() {
    super();
  }
}
