import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ConferenceStoreModule } from './conference-store/conference-store.module';
import { environment } from '../../environments/environment';
import { AuthenticationStoreModule } from './authentication-store/authentication-store.module';

@NgModule({
  imports: [
    CommonModule,
    ConferenceStoreModule,
    StoreModule.forRoot({ routerReducer: routerReducer }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AuthenticationStoreModule
  ],
  declarations: []
})
export class RootStoreModule { }
