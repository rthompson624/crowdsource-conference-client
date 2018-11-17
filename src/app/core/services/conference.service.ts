import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CoreModule } from '../core.module';
import { AuthenticationService } from './authentication.service';
import { Multiple } from '../models/multiple.model';
import { Conference } from '../models/conference.model';
import { environment } from '../../../environments/environment';
import { AppConfiguration } from '../../../configuration/configuration';

@Injectable({
  providedIn: CoreModule
})
export class ConferenceService {
  private confUrl: string = 'http://' + environment.restApiDomain + '/conferences';
  private pageSize: number = AppConfiguration.apiPageSize;

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

  getMany(page: number, hostId?: number): Observable<Multiple<Conference>> {
    const headers = new HttpHeaders().set('Authorization', this.authService.getAccessToken());
    const skip = (page * this.pageSize);
    let params: HttpParams;
    if (hostId) {
      params = new HttpParams()
        .set('$skip', skip.toString(10))
        .set('$limit', this.pageSize.toString(10))
        .set('host_id', String(hostId));
    } else {
      params = new HttpParams()
        .set('$skip', skip.toString(10))
        .set('$limit', this.pageSize.toString(10));
    }
    const options = {headers: headers, params: params};
    return this.httpClient.get<Multiple<Conference>>(this.confUrl, options);
  }

  delete(conference: Conference): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', this.authService.getAccessToken());
    const options = {headers: headers};
    return this.httpClient.delete<void>(this.confUrl + '/' + conference.id, options);
  }

}
