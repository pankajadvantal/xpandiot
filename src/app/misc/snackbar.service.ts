import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(public snackBar: MatSnackBar) { }

  success(msg): any {
    this.snackBar.open(msg, '', { duration: 3000, panelClass: ['mat-toolbar', 'success-snackbar']} );
  }

  error(msg): any{
    this.snackBar.open(msg, '', { duration: 3000, panelClass: ['mat-toolbar', 'mat-warn']} );
  }

  alert(msg): any{
    this.snackBar.open(msg, '', { duration: 3000, panelClass: ['mat-toolbar', 'mat-primary']} );
  }

}
