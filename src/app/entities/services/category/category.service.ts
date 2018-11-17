import { Injectable } from '@angular/core';
import { Category } from 'app/entities/interfaces/category';
import { EntityService } from '../entity.service';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { HH_CATEGORY } from 'app/static/constants/api.contants';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends EntityService<Category> {

  category$: Subject<any> = new BehaviorSubject(null);
  baseUrl = HH_CATEGORY.BASE;
  constructor() {
    super();
  }


  public findAllByProductTypeId(id: number | string): Observable<any> {
    const option = this.buildFindAllOption();
    const reqOptions = this.buildQueryRequestOption(option);
    const url = HH_CATEGORY.BYPRODUCTYPE + '/' + id;
    return this.http.get<Category>(url, reqOptions).pipe(
      tap(this.onResponse.bind(this)));
  }

}
