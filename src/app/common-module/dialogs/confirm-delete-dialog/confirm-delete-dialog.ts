import { Component, inject } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-dialog',
  imports: [MatDialogModule],
  templateUrl: './confirm-delete-dialog.html',
  styleUrl: './confirm-delete-dialog.scss',
})
export class ConfirmDeleteDialog {

   constructor(private dialogRef: MatDialogRef<ConfirmDeleteDialog>) {}


  onCancel() {
    this.dialogRef.close(false);
  }

  onConfirm() {
    this.dialogRef.close(true);
  }
}
