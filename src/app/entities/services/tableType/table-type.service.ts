import { EntityService } from './../entity.service';
import { HH_TABLE_TYPE } from './../../../static/constants/api.contants';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { TableType } from 'app/entities/interfaces/tableType';


@Injectable({ providedIn: 'root' })
export class TableTypeService extends EntityService<TableType> {

  tableType$: Subject<any> = new BehaviorSubject(null);
  baseUrl = HH_TABLE_TYPE.BASE;
  constructor() {
    super();
  }
}

