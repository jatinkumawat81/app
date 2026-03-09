import { inject, Injectable } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  
} from '@angular/material/dialog';
import { ConfirmDeleteDialog } from '../common-module/dialogs/confirm-delete-dialog/confirm-delete-dialog';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  dialog = inject(MatDialog);

  openConfirmDeleteDialog(conf: MatDialogConfig = {}): MatDialogRef<any>  {
    let dialogConfig: MatDialogConfig = {
      panelClass: ['rounded-lg', 'p-0', 'overflow-auto'],
      disableClose: true,
      autoFocus: false,
      ...conf
    }
    return this.dialog.open(ConfirmDeleteDialog, dialogConfig);
  }
   openTemplateDialog(
    template: any,
    config: MatDialogConfig = {},
    data: any = {}
  ): MatDialogRef<any> {
    let dialogConfig: MatDialogConfig = {
      maxWidth: "900px",
      disableClose: true,
      minHeight: "fit-content",
      data: data,
      ...config,
    };
    return this.dialog.open(template, dialogConfig);
  }

  closeAllDialogs() {
    this.dialog.closeAll();
  }
}
