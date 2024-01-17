import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogProfileDropdownComponent } from '../dialog-profile-dropdown/dialog-profile-dropdown.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(public dialog: MatDialog) {}


  reloadPage() {
    window.location.reload();
  }


  openDrodown() {
    this.dialog.open(DialogProfileDropdownComponent);
  }
}
