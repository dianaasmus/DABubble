import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { User } from '../../../models/user.interface';
import { UsersService } from '../../../services/users.service';
import { DialogProfileDropdownComponent } from '../dialog-profile-dropdown/dialog-profile-dropdown.component';

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

  constructor(public dialog: MatDialog, public usersServ: UsersService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.usersSubscription = this.usersServ.usersSubject.subscribe(users => {
      this.users = users;
      console.log('Aktuelle Benutzer:', users);
    });

    this.usersServ.getUsers();
  }

  ngAfterViewChecked() {
    const newCurrentUser = this.usersServ.returnCurrentUser();
    if (newCurrentUser !== this.currentUser) {
      this.currentUser = newCurrentUser;
      this.cdRef.detectChanges();
    }
  }

  ngOnDestroy() {
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
  }

  /**
   * Reloads the current page.
   * This method forces a full reload of the current page using the `window.location.reload()` method.
   */
  reloadPage(): void {
    window.location.reload();
  }
  
  /**
   * Opens a dropdown dialog for the user profile.
   * This method opens a dialog with the `DialogProfileDropdownComponent` and applies the 'profile-dropdown-container' class to the dialog panel.
   */
  openDrodown(): void {
    this.dialog.open(DialogProfileDropdownComponent, {
      panelClass: 'profile-dropdown-container',
    });
  }
}
