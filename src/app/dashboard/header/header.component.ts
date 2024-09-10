import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../../models/user.interface';
import { UsersService } from '../../users.service';
import { DialogProfileDropdownComponent } from '../dialog-profile-dropdown/dialog-profile-dropdown.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  currentUser!: User;
  users!: any;


  constructor(public dialog: MatDialog, public usersServ: UsersService) {}


  ngOnInit() {
    this.loadUsers();
  }


  async loadUsers() {
    await this.usersServ.getUsers();  
    this.usersServ.returnCurrentUser().subscribe(currentUser => {
      if (currentUser !== null) {
        this.currentUser = currentUser;
        console.log(this.currentUser);
      }
    });
  }
  

  reloadPage() {
    window.location.reload();
  }


  openDrodown() {
    this.dialog.open(DialogProfileDropdownComponent, {
      panelClass: 'profile-dropdown-container',
    });
  }
}
