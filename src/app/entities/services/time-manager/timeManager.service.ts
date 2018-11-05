import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { HH_TIME_MANAGER } from 'app/static/constants/api.contants';
import { EntityService } from '../entity.service';
import { TimeManager } from 'app/entities/interfaces/timeManager';

@Injectable({
  providedIn: 'root'
})
export class TimeManagerService extends EntityService<TimeManager> {

  timeManager$: Subject<any> = new BehaviorSubject(null);
  baseUrl = HH_TIME_MANAGER.BASE;
  constructor() {
    super();
  }

}
