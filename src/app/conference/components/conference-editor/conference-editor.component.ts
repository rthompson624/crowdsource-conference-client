import { Component, OnInit, Output, EventEmitter, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Conference } from '../../../core/models/conference.model';

@Component({
  selector: 'app-conference-editor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './conference-editor.component.html',
  styleUrls: ['./conference-editor.component.css']
})
export class ConferenceEditorComponent implements OnInit, OnChanges {
  @Input() conference: Conference;
  @Output() conferenceSave = new EventEmitter<Conference>();
  
  conferenceForm: FormGroup;
  errorMessage: string;

  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.conference) this.buildForm();
  }

  onSubmit(): void {
    this.errorMessage = null;
    this.conference.name = this.conferenceForm.controls['name'].value;
    this.conferenceSave.emit(this.conference);
  }

  private buildForm(): void {
    this.conferenceForm = this.fb.group(
      {
        name: [this.conference.name, [Validators.required]]
      }
    );
  }

}
