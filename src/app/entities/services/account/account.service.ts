import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { HH_ACCOUNT } from 'app/static/constants/api.contants';
import { EntityService, QueryOption } from '../entity.service';
import { User } from 'app/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountStaffService extends EntityService<User> {
  user$: Subject<any> = new BehaviorSubject(null);
  baseUrl = HH_ACCOUNT.BASE;
  constructor() {
    super();
  }

    public findAccountById(id: number | string): Observable<User> {
      const url = HH_ACCOUNT.BASE + '/staff/account/' + id;
      return this.http.get<User>(url).pipe(
        tap(this.onResponse.bind(this)
        ));
    }
}
