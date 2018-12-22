import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, 
  MatProgressSpinnerModule, MatTableModule, MatCardModule, MatDialogModule,
  MatPaginatorModule, MatDatepickerModule, MatSelectModule
} from '@angular/material';

import { ConferenceRoutingModule } from './conference-routing.module';
import { SharedModule } from '../shared/shared.module';

import { ListComponent } from './containers/list/list.component';
import { DetailComponent } from './containers/detail/detail.component';
import { CreateComponent } from './containers/create/create.component';
import { EditComponent } from './containers/edit/edit.component';
import { ConferenceListComponent } from './components/conference-list/conference-list.component';
import { ConferenceDetailComponent } from './components/conference-detail/conference-detail.component';
import { ConferenceEditorComponent } from './components/conference-editor/conference-editor.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';

@NgModule({
  entryComponents: [
    DeleteDialogComponent
  ],
  imports: [
    CommonModule,
    ConferenceRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatCardModule,
    ReactiveFormsModule,
    SharedModule,
    MatDialogModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatSelectModule
  ],
  declarations: [
    ListComponent,
    ConferenceListComponent,
    ConferenceDetailComponent,
    DetailComponent,
    ConferenceEditorComponent,
    CreateComponent,
    EditComponent,
    DeleteDialogComponent
  ]
})
export class ConferenceModule {
}