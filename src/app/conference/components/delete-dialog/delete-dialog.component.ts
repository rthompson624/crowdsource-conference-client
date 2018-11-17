import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Conference } from '../../../core/models/conference.model';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {
  conference: Conference;

  constructor(
    private dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.conference = data;
  }

  ngOnInit() {
  }

  delete() {
    this.dialogRef.close(this.conference);
  }

  cancel() {
    this.dialogRef.close();
  }

}
