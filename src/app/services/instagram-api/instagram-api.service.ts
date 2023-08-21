import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ContactResponse, FeedResponse, SearchProfileResponse } from '../../models/models';

@Injectable({
  providedIn: 'root'
})
export class InstagramApiService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) { }

  public getUsers(q: string, limit = 5, type = 'search', platform = 'instagram'): Observable<SearchProfileResponse> {
    const params = {
      params: new HttpParams().set('q', q).set('limit', limit).set('type', type).set('platform', platform),
    };

    return this.http.get<SearchProfileResponse>(`${this.apiUrl}/dict/users`, params);
  }

  public getUserFeed(url: string, after?: string): Observable<FeedResponse> {
    const params = {
      params: new HttpParams().set('url', url),
    };

    if (after) {
      params.params = params.params.set('after', after);
    }

    return this.http.get<FeedResponse>(`${this.apiUrl}/raw/ig/user/feed/`, params);
  }

  public getContacts(url: string, platform = 'instagram'): Observable<ContactResponse> {
    const params = {
      params: new HttpParams().set('url', url).set('platform', platform),
    };

    return this.http.get<ContactResponse>(`${this.apiUrl}/exports/contacts`, params);
  }
}
