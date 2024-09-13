import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../../models/user.interface';
import { UsersService } from '../../../services/users.service';
import { DialogProfileDropdownComponent } from '../dialog-profile-dropdown/dialog-profile-dropdown.component';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  currentUser: any;
  users: User[] = [];
  private usersSubscription!: Subscription;

  constructor(public dialog: MatDialog, public usersServ: UsersService) { }

  ngOnInit() {
    this.usersSubscription = this.usersServ.users$.subscribe(users => {
      this.users = users;
      console.log('Aktuelle Benutzer:', users);
    });

    this.usersServ.getUsers();
  }

  ngOnDestroy() {
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
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
