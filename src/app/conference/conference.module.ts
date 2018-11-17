import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, 
  MatProgressSpinnerModule, MatListModule, MatCardModule
} from '@angular/material';

import { ConferenceRoutingModule } from './conference-routing.module';
import { SharedModule } from '../shared/shared.module';

import { ListComponent } from './containers/list/list.component';
import { ConferenceListComponent } from './components/conference-list/conference-list.component';
import { ConferenceDetailComponent } from './components/conference-detail/conference-detail.component';
import { DetailComponent } from './containers/detail/detail.component';
import { ConferenceEditorComponent } from './components/conference-editor/conference-editor.component';
import { CreateComponent } from './containers/create/create.component';
import { EditComponent } from './containers/edit/edit.component';

@NgModule({
  entryComponents: [],
  imports: [
    CommonModule,
    ConferenceRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatCardModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    ListComponent,
    ConferenceListComponent,
    ConferenceDetailComponent,
    DetailComponent,
    ConferenceEditorComponent,
    CreateComponent,
    EditComponent
  ]
})
export class ConferenceModule {
}