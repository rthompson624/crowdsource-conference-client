import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Conference } from '../../../core/models/conference.model';

@Component({
  selector: 'app-conference-detail',
  templateUrl: './conference-detail.component.html',
  styleUrls: ['./conference-detail.component.css']
})
export class ConferenceDetailComponent implements OnInit {
  @Input() conference: Conference;
  @Output() clickEdit = new EventEmitter<Conference>();
  @Output() clickDelete = new EventEmitter<Conference>();

  constructor() { }

  ngOnInit() {
  }

  onClickEdit(): void {
    this.clickEdit.emit(this.conference);
  }

  onClickDelete(): void {
    this.clickDelete.emit(this.conference);
  }

}
