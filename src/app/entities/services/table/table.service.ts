import { Injectable } from '@angular/core';
import { EntityService } from '../entity.service';
import { Table } from 'app/entities/interfaces/table';
import { Subject, BehaviorSubject } from 'rxjs';
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

}
