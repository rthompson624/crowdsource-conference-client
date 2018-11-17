import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CoreModule } from '../core.module';
import { AuthRequest } from '../models/auth-request.model';
import { AuthResponse } from '../models/auth-response.model';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: CoreModule
})
export class AuthenticationService {
  private authUrl: string = 'http://' + environment.restApiDomain + '/authentication';
  private accessToken: string;
  private user: User;

  constructor(private httpClient: HttpClient) {
    if (!this.accessToken) {
      // Check local storage
      this.accessToken = this.retrieveInLocalStorage('accessToken');
    }
    if (!this.user) {
      // Check local storage
      this.user = JSON.parse(this.retrieveInLocalStorage('user'));
    }
  }

  authenticateUser(authReq: AuthRequest): Observable<AuthResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {headers: headers};
    return this.httpClient.post<AuthResponse>(this.authUrl, authReq, options).pipe(
      tap((authRes: AuthResponse) => {
        // Authentication succeeded
        this.accessToken = authRes.accessToken;
        this.saveInLocalStorage('accessToken', this.accessToken);
        this.user = authRes.user;
        this.saveInLocalStorage('user', JSON.stringify(this.user));
      })
    );
  }

  userIsAuthenticated(): boolean {
    if (this.accessToken) {
      return true;
    } else {
      return false;
    }
  }

  getAccessToken(): string {
    return this.accessToken;
  }

  getUser(): User {
    return this.user;
  }

  logoutUser(): void {
    this.accessToken = null;
    this.deleteInLocalStorage('accessToken');
    this.user = null;
    this.deleteInLocalStorage('user');
  }

  private saveInLocalStorage(key: string, value: string): void {
    if (typeof(Storage) !== 'undefined') {
      // Browser supports LocalStorage
      window.localStorage.setItem(key, value);
    } else {
      // No support for LocalStorage
    }
  }
  
  private deleteInLocalStorage(key: string): void {
    if (typeof(Storage) !== 'undefined') {
      // Browser supports local storage
      window.localStorage.removeItem(key);
    } else {
      // No support for local storage
    }
  }
  
  private retrieveInLocalStorage(key: string): string {
    if (typeof(Storage) !== 'undefined') {
      // Browser supports local storage
      const value: string = window.localStorage.getItem(key);
      if (value) {
        return value;
      } else {
        return null;
      }
    } else {
      // No support for local storage
      return null;
    }
  }

}
