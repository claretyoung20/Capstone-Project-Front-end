import { createRequestOption } from './../../../shared/util/request-util';
import { IHHSocialMedia } from './../../model/hh-social-media.model';
import { SERVER_API_URL } from './../../../static/constants/api.contants';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

type EntityResponseType = HttpResponse<IHHSocialMedia>;
type EntityArrayResponseType = HttpResponse<IHHSocialMedia[]>;

@Injectable({ providedIn: 'root' })
export class HhSocialService {
    private resourceUrl = SERVER_API_URL + 'api/hh-social-medias';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/hh-social-medias';

    constructor(private http: HttpClient) {}

    create(hHSocialMedia: IHHSocialMedia): Observable<EntityResponseType> {
        return this.http.post<IHHSocialMedia>(this.resourceUrl, hHSocialMedia, { observe: 'response' });
    }

    update(hHSocialMedia: IHHSocialMedia): Observable<EntityResponseType> {
        return this.http.put<IHHSocialMedia>(this.resourceUrl, hHSocialMedia, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IHHSocialMedia>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IHHSocialMedia[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IHHSocialMedia[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}

