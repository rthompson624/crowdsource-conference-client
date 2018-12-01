import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { first, switchMap } from 'rxjs/operators';
import { Observable } from "rxjs";
import { Store } from '@ngrx/store';

import { AppConfiguration } from '../../../configuration/configuration';
import { RootStoreState } from '../../root-store';

@Injectable()
export class SecurityInterceptor implements HttpInterceptor {

  constructor(
    private store$: Store<RootStoreState.State>
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store$.pipe(
      first(),
      switchMap(store => {
        if (this.needsToken(request.url)) {
          request = request.clone({headers: request.headers.append('Authorization', store.authentication.accessToken)});
        }
        return next.handle(request);
      })
    );
  }

  private needsToken(url: string): boolean {
    let isProtected = false;
    AppConfiguration.protectedRoutes.forEach(route => {
      if (url.includes(route)) isProtected = true;
    });
    return isProtected;
  }

}