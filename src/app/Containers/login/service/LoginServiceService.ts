import { Injectable} from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { IAccount } from '../../../entities/model/user/iaccount.interface'

import { HH_AUTH_ADMIN, BASE_API_URL, AUTH_API } from './../../../static/constants/api.contants';
import { EntityService } from 'app/entities/services/entity.service';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService  extends EntityService<IAccount> {

    personal$: Subject<any> = new BehaviorSubject(null);
    baseUrl = AUTH_API.BASE;

    constructor() {
        super();
    }

    // auth(credentials, callback?) {
    //     const cb = callback || function() {};
    //         this.login(credentials).subscribe(
    //             data => {
    //                 // this.principal.identity(true).then(account => {
    //                 //    resolve(data);
    //                 });
    //                 // return cb();
    //      }
}
