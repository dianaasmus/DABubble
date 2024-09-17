import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-profile-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './dialog-profile-dropdown.component.html',
  styleUrl: './dialog-profile-dropdown.component.scss'
})
export class DialogProfileDropdownComponent {

  constructor(
    private router: Router, 
    private dialogRef: MatDialogRef<DialogProfileDropdownComponent>
  ) {}

  logOut() {
    this.dialogRef.close();
    this.router.navigateByUrl('');
  }
}
