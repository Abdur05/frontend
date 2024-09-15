import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-event-view-dialog',
  templateUrl: './event-view-dialog.component.html',
  styleUrls: ['./event-view-dialog.component.css']
})
export class EventViewDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EventViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
