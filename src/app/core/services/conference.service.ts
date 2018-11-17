import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CoreModule } from '../core.module';
import { AuthenticationService } from './authentication.service';
import { ApiEnvelope } from '../models/api-envelope.model';
import { Conference } from '../models/conference.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: CoreModule
})
export class ConferenceService {
  private confUrl: string = 'http://' + environment.restApiDomain + '/conferences';
  private pageSize: number = environment.apiPageSize;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthenticationService
  ) {
  }

  getNewObject(): Conference {
    let newConference: Conference = {
      name: null,
      host_id: null
    };
    return newConference;
  }

  create(conference: Conference): Observable<Conference> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.authService.getAccessToken());
    const options = {headers: headers};
    return this.httpClient.post<Conference>(this.confUrl, conference, options);
  }

  update(conference: Conference): Observable<Conference> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.authService.getAccessToken());
    const options = {headers: headers};
    return this.httpClient.put<Conference>(this.confUrl + '/' + conference.id, conference, options);
  }

  getOne(id: number): Observable<Conference> {
    const headers = new HttpHeaders().set('Authorization', this.authService.getAccessToken());
    const options = {headers: headers};
    return this.httpClient.get<Conference>(this.confUrl + '/' + id, options);
  }

  getMany(page: number, hostId?: number): Observable<Conference[]> {
    const headers = new HttpHeaders().set('Authorization', this.authService.getAccessToken());
    const skip = (page * this.pageSize) - this.pageSize;
    let params: HttpParams;
    if (hostId) {
      params = new HttpParams()
        .set('$skip', skip.toString(10))
        .set('host_id', String(hostId));
    } else {
      params = new HttpParams()
        .set('$skip', skip.toString(10));
    }
    const options = {headers: headers, params: params};
    return this.httpClient.get<ApiEnvelope<Conference>>(this.confUrl, options).pipe(
      map(response => {
        return response.data;
      })
    );
  }

  delete(conference: Conference): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', this.authService.getAccessToken());
    const options = {headers: headers};
    return this.httpClient.delete<void>(this.confUrl + '/' + conference.id, options);
  }

}
