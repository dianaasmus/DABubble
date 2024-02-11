import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogProfileDropdownComponent } from '../dialog-profile-dropdown/dialog-profile-dropdown.component';
import { UsersService } from '../../users.service';
import { CurrencyPipe } from '@angular/common';
import { User } from '../../../models/user.class';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  currentUser!: User;

  constructor(public dialog: MatDialog, public usersServ: UsersService) {
    // debugger;
    // usersServ.getUsers();
    // usersServ.initUsers();

    this.currentUser = usersServ.currentUser;
  }

  // ngAfterInit() {
  //   debugger;
  //   this.usersServ.initUsers();

  // }
  // ngAfterViewInit() {
  //   this.currentUser = this.usersServ.initUsers();
  // }


  reloadPage() {
    window.location.reload();
  }


  openDrodown() {
    this.dialog.open(DialogProfileDropdownComponent, {
      panelClass: 'profile-dropdown-container',
    });
  }
}
