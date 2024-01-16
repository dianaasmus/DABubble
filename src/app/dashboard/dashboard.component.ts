import { Component } from '@angular/core';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogProfileDropdownComponent } from './dialog-profile-dropdown/dialog-profile-dropdown.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidenavComponent, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(public dialog: MatDialog) {}


  reloadPage() {
    window.location.reload();
  }


  openDrodown() {
    this.dialog.open(DialogProfileDropdownComponent);
  }
}
