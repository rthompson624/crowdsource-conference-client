import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Conference } from '../../../core/models/conference.model';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-conference-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './conference-detail.component.html',
  styleUrls: ['./conference-detail.component.css']
})
export class ConferenceDetailComponent implements OnInit, OnDestroy {
  @Input() conference: Conference;
  @Output() clickEdit = new EventEmitter<Conference>();
  @Output() clickDelete = new EventEmitter<Conference>();
  private ngUnsubscribe = new Subject<boolean>();

  constructor(
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }

  onClickEdit(): void {
    this.clickEdit.emit(this.conference);
  }

  onClickDelete(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.conference;
    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
    dialogRef.afterClosed().pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
      if (data) {
        this.clickDelete.emit(this.conference);
      }
    });    
  }

}
