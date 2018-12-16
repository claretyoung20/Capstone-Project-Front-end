import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { HH_STAFF, HH_STAFF_ACCOUNT } from 'app/static/constants/api.contants';
import { EntityService, QueryOption } from '../entity.service';
import { User } from 'app/core';
import { tap } from 'rxjs/operators';
import { Staff } from 'app/entities/interfaces/staff';

@Injectable({ providedIn: 'root' })
export class StaffService extends EntityService<User> {
  staff$: Subject<any> = new BehaviorSubject(null);
  baseUrl = HH_STAFF.BASE;
  constructor() {
    super();
  }

  getStaffAccount(option: QueryOption ): Observable<any> {
      const reqOptions = this.buildQueryRequestOption(option);
      const url = HH_STAFF_ACCOUNT.BASE;
      return this.http.get<User>(url, reqOptions).pipe(
        tap(this.onResponse.bind(this)
        // .map(this.extractResponse.bind(this))
        // .map(this.convertListResponse.bind(this))
        // .catch(error => this.handleError(error))
        ));
    }

    // get staff by user id
    getStaffbyUserId(id: number | string): Observable<any> {
      const option = this.buildFindAllOption();
      const reqOptions = this.buildQueryRequestOption(option);
      const url = HH_STAFF.BYUSERACCOUNTID + '/' + id;
      return this.http.get<Staff>(url, reqOptions).pipe(
        tap(this.onResponse.bind(this)));
    }

    getAllStaff(option: QueryOption): Observable<any> {
        // const option = this.buildFindAllOption();
        const reqOptions = this.buildQueryRequestOption(option);
        const url = HH_STAFF_ACCOUNT.ALLSTAFFS;
        return this.http.get<Staff>(url, reqOptions).pipe(
            tap(this.onResponse.bind(this)));
    }
}


