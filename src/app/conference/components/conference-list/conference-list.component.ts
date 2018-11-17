import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Multiple } from '../../../core/models/multiple.model';
import { Conference } from '../../../core/models/conference.model';

@Component({
  selector: 'app-conference-list',
  templateUrl: './conference-list.component.html',
  styleUrls: ['./conference-list.component.css']
})
export class ConferenceListComponent implements OnInit {
  @Input() conferences: Multiple<Conference>;
  @Input() displayedColumns: string[];
  @Output() clickRow = new EventEmitter<Conference>();
  @Output() load = new EventEmitter<PageEvent>();

  constructor() { }

  ngOnInit() {
  }

  rowClick(conference: Conference) {
    this.clickRow.emit(conference);
  }

  onPageEvent(event: PageEvent) {
    this.load.emit(event);
  }

  formatDate(value: string): string {
    const date = new Date(value);
    return date.toDateString();
  }

}
