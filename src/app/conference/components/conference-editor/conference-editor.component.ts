import { Component, OnInit, Output, EventEmitter, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Conference } from '../../../core/models/conference.model';
import { LocationService } from '../../../core/services/location.service';

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
    private fb: FormBuilder,
    public locationService: LocationService
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
    this.conference.tagLine = this.conferenceForm.controls['tagLine'].value;
    this.conference.description = this.conferenceForm.controls['description'].value;
    this.conference.startDate = this.conferenceForm.controls['startDate'].value;
    this.conference.endDate = this.conferenceForm.controls['endDate'].value;
    this.conference.city = this.conferenceForm.controls['city'].value;
    this.conference.state = this.conferenceForm.controls['state'].value;
    this.conference.country = this.conferenceForm.controls['country'].value;
    this.conferenceSave.emit(this.conference);
  }

  private buildForm(): void {
    this.conferenceForm = this.fb.group(
      {
        name: [this.conference.name, [Validators.required]],
        tagLine: [this.conference.tagLine, [Validators.required]],
        description: [this.conference.description, [Validators.required]],
        startDate: [this.conference.startDate, [Validators.required]],
        endDate: [this.conference.endDate, [Validators.required]],
        city: [this.conference.city, [Validators.required]],
        state: [this.conference.state, [Validators.required]],
        country: [this.conference.country, [Validators.required]]
      }
    );
  }

}
