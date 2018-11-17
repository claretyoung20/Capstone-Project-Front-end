import {AppInjector} from '../../app.injector';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/internal/operators'
import { Entity } from '../interfaces/entity.interface';
import {HttpParams, HttpClient, HttpHeaders} from '@angular/common/http';
import { SERVER_API_URL } from 'app/static/constants/api.contants';

export interface QueryOption {
  size?: number;
  page?: number;
  pageNumber?: number;
}

export const defaultQueryOption: QueryOption = {
}

export class EntityService<T extends Entity> {
  protected http: HttpClient;
  protected baseUrl: string;

  constructor() {
    this.http = AppInjector.get(HttpClient);
  }

  public find(id: number | string): Observable<T> {
    const url = this.buildFindingUrl(id);
    return this.http.get<T>(url).pipe(
      tap(this.onResponse.bind(this)
      // .map(this.extractResponse.bind(this))
      // .map(this.convertSingleResponse.bind(this))
      // .catch(error => this.handleError(error))
    ));
  }

  login(credentials): Observable<any> {
    const data =
        'j_username=' +
        encodeURIComponent(credentials.username) +
        '&j_password=' +
        encodeURIComponent(credentials.password) +
        '&remember-me=' +
        credentials.rememberMe +
        '&submit=Login';
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(SERVER_API_URL + 'api/authentication', data, { headers });
  }

  public create(data: T): Observable<T> {
    const url = this.buildCreateUrl(data);
    const option = this.buildCreateOption(data);
    return this.http.post<T>(url, option).pipe(
      tap(this.onResponse.bind(this)
      // .map(this.extractResponse.bind(this))
      // .catch(error => this.handleError(error))
      ));
  }

  public findAll(): Observable<any> {
    const option = this.buildFindAllOption();
    return this.query(option);
  }

  public query(option: QueryOption): Observable<any> {
    const reqOptions = this.buildQueryRequestOption(option);
    const url = this.buildQueryUrl(option);
    return this.http.get<T>(url, reqOptions).pipe(
      tap(this.onResponse.bind(this)
      // .map(this.extractResponse.bind(this))
      // .map(this.convertListResponse.bind(this))
      // .catch(error => this.handleError(error))
      ));
  }

  public searchApi(searchValue:  string, option: QueryOption): Observable<any> {
    const reqOptions = this.buildQueryRequestOption(option);
    const url = this.buildSearchUrl(searchValue);
    return this.http.get<any>(url, reqOptions).pipe(
      tap(this.onResponse.bind(this)
      // .map(this.extractResponse.bind(this))
      // .map(this.convertListResponse.bind(this))
      // .catch(error => this.handleError(error))
    ));
  }

  public delete(id: number): Observable<any> {
    const url = this.buildDeleteUrl(id);
    return this.http.delete(url).pipe(
       tap(this.onResponse.bind(this)
      // .map(this.extractResponse.bind(this))
      // .catch(error => {
      //   // return Observable.of({ok: true});
      // })
       ));
  }

  public deleteResponseType(id: number): Observable<any> {
    const url = this.buildDeleteUrl(id);
    return this.http.delete(url, { responseType: 'text' }).pipe(
      tap(this.onResponse.bind(this)
      // .map(this.extractResponse.bind(this))
      // .catch(error => this.handleError(error))
      ));
  }

  public update(data: T): Observable<T> {
    const url = this.buildUpdateUrl(data);
    const option = this.buildUpdateOption(data);
    return this.http.put<T>(url, option).pipe(
      tap(this.onResponse.bind(this)
      // .map(this.extractResponse.bind(this))
      // .catch(error => this.handleError(error))
      ));
  }

  protected buildCreateUrl(data: T): string {
    return this.baseUrl;
  }

  protected buildSearchUrl(searchValue: string) {
    return `${this.baseUrl}/search/${searchValue}`;
  }

  protected buildCreateOption(data: T): T {
    return data;
  }

  protected buildUpdateUrl(data: T): string {
    return this.baseUrl;
  }

  protected buildUpdateOption(data: T): T {
    return data;
  }

  public patch(): Observable<T> {
    throw new Error('patial update is not implemented yet.');
  }

  protected buildFindingUrl(id: number | string): string {
    return `${this.baseUrl}/${id}`;
  }

  protected buildFindAllOption(): QueryOption {
    return defaultQueryOption;
  }

  protected buildQueryUrl(option: QueryOption): string {
    return this.baseUrl;
  }

  private buildDeleteUrl(id: number): string {
    return this.buildFindingUrl(id);
  }

  protected buildQueryRequestOption(option: QueryOption): any {
    return {
      params: option
    };
  }

  protected convertSingleResponse(res: T): T {
    return res;
  }

  protected convertListResponse(res: T[]): T[] {
    return res;
  }

  protected onResponse(res: any) {
    return res;
  }

  protected handleError(error: Error): Observable<any> {
    return Observable.throw(error)
  }

  protected extractResponse(res: any): any {
    return res;
  }

  protected buildQueryOption(option: QueryOption): HttpParams {
    return new HttpParams();
  }

  protected buildRequestEntity(data: T): T {
    return data;
  }

}
