import { Component, OnInit, Input } from '@angular/core';
import { Conference } from '../../../core/models/conference.model';

@Component({
  selector: 'app-conference-list',
  templateUrl: './conference-list.component.html',
  styleUrls: ['./conference-list.component.css']
})
export class ConferenceListComponent implements OnInit {
  @Input() conferences: Conference[];

  constructor() { }

  ngOnInit() {
  }

}
