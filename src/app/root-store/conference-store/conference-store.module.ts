import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ConferenceStoreEffects } from './effects';
import { conferenceReducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('conference', conferenceReducer),
    EffectsModule.forFeature([ConferenceStoreEffects])
  ],
  declarations: [],
  providers: [ConferenceStoreEffects]
})
export class ConferenceStoreModule { }
