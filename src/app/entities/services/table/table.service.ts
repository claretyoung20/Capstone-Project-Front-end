import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { EntityService } from '../entity.service';
import { Table } from 'app/entities/interfaces/table';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { HH_TABLE } from 'app/static/constants/api.contants';

@Injectable({
  providedIn: 'root'
})
export class TableService extends EntityService<Table> {

  table$: Subject<any> = new BehaviorSubject(null);
  baseUrl = HH_TABLE.BASE;
  constructor() {
    super();
  }

  getAvialableTable(person: number | string, period: string, reserveDate: any ): Observable<any> {
        const option = this.buildFindAllOption();
        const reqOptions = this.buildQueryRequestOption(option);
        const url = HH_TABLE.AVAILABLE + '?period=' + period + '&persons=' + person + '&reserveDate=' + reserveDate;
        return this.http.get<Table>(url, reqOptions).pipe(
            tap(this.onResponse.bind(this)));
    }

    getIsAvialableTable(): Observable<any> {
        const option = this.buildFindAllOption();
        const reqOptions = this.buildQueryRequestOption(option);
        const url = HH_TABLE.ISAVAILABLE;
        return this.http.get<Table>(url, reqOptions).pipe(
            tap(this.onResponse.bind(this)));
    }

}
