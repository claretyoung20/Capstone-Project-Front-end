import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { HH_ACCOUNT, HH_STAFF } from 'app/static/constants/api.contants';
import { EntityService, QueryOption } from '../entity.service';
import { HttpResponse } from '@angular/common/http';
import { User } from 'app/core';
import { tap } from 'rxjs/operators';
import { IUser } from 'app/entities/model/user/user.model';


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

    findByUserLogin(login: string, password: string): Observable<HttpResponse<IUser>> {
      const url =  HH_STAFF.BYUSERID + '/?login=' + login + '&password=' + password;
      return this.http.get<IUser>(url, { observe: 'response' });
  }
}

