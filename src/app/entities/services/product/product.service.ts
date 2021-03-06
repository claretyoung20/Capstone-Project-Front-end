import { Injectable } from '@angular/core';
import {EntityService, QueryOption} from '../entity.service';
import { Product } from 'app/entities/interfaces/product';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { HH_PRODUCT } from 'app/static/constants/api.contants';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends EntityService<Product> {

  product$: Subject<any> = new BehaviorSubject(null);
  baseUrl = HH_PRODUCT.BASE;
  constructor() {
    super();
  }


  public findAllByCategory(id: number | string): Observable<any> {
    const option = this.buildFindAllOption();
    const reqOptions = this.buildQueryRequestOption(option);
    const url = HH_PRODUCT.BYCATEGORY + '/' + id;
    return this.http.get<Product>(url, reqOptions).pipe(
      tap(this.onResponse.bind(this)));
  }

  public findProductsByShowOnHomepage(option: QueryOption): Observable<any> {
    const reqOptions = this.buildQueryRequestOption(option);
    const url = HH_PRODUCT.BYSHOWONPAGE;
    return this.http.get<Product>(url, reqOptions).pipe(
      tap(this.onResponse.bind(this)));
  }


  public isAvailable(option: QueryOption): Observable<any> {
    const reqOptions = this.buildQueryRequestOption(option);
    const url = HH_PRODUCT.ISAVAILABLE;
    return this.http.get<Product>(url, reqOptions).pipe(
      tap(this.onResponse.bind(this)));
  }

  public isNotAvailable(option: QueryOption): Observable<any> {
    const reqOptions = this.buildQueryRequestOption(option);
    const url = HH_PRODUCT.ISNOTAVAILABLE;
    return this.http.get<Product>(url, reqOptions).pipe(
      tap(this.onResponse.bind(this)));
  }
   public noPaging(): Observable<any> {
        const option = this.buildFindAllOption();
        const reqOptions = this.buildQueryRequestOption(option);
        const url = HH_PRODUCT.NOPAGING;
        return this.http.get<Product>(url, reqOptions).pipe(
            tap(this.onResponse.bind(this)));
    }

}
