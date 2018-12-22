import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Conference } from '../../../core/models/conference.model';
import { Page } from '../../../core/models/page.model';
import { LocationService } from '../../../core/services/location.service';
import { DateService } from '../../../core/services/date.service';

@Component({
  selector: 'app-conference-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './conference-list.component.html',
  styleUrls: ['./conference-list.component.css']
})
export class ConferenceListComponent implements OnInit {
  @Input() conferences: Conference[];
  @Input() pageInfo: Page;
  @Input() displayedColumns: string[];
  @Output() clickRow = new EventEmitter<Conference>();
  @Output() load = new EventEmitter<PageEvent>();

  constructor(
    public locationService: LocationService,
    public dateService: DateService
  ) { }

  ngOnInit() {
  }

  rowClick(conference: Conference) {
    this.clickRow.emit(conference);
  }

  onPageEvent(event: PageEvent) {
    this.load.emit(event);
  }

}
