import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../users.service';
import { User } from '../../../models/user.interface';
import { map } from 'rxjs';
import { DialogFeedbackComponent } from '../../dialog-feedback/dialog-feedback.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginFeedbacks!: string;
  loginUser = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

  guestUser: User = {
    firstLastName: 'Gast',
    profileImg: '../../../assets/imgs/person.png',
  };

  constructor(
    private usersServ: UsersService,
    private router: Router,
    public dialog: MatDialog,
    private appComponent: AppComponent
  ) {}

  setRouterId() {
    this.router.navigateByUrl('' + this.usersServ.currentUser.id);
  }

  async submitForm(e: any) {
    e.preventDefault();
    const enteredEmail = this.loginUser.get('email')?.value;
    let userExists = await this.returnUserEmail(enteredEmail);

    if (userExists) {
      this.tryCatchLogin(userExists);
    } else {
      this.loginFeedback();
    }
  }

  tryCatchLogin(userExists: User) {
    const enteredPassword = this.loginUser.get('password')?.value;

    try {
      if (userExists.password === enteredPassword) {
        this.usersServ.currentUser = userExists;
        this.setRouterId();
      } else {
        this.loginFeedback();
      }
    } catch (e) {
      console.warn(e);
    } finally {
      let message = 'Willkommen zurück.';
      this.appComponent.isFeedback = true;
      this.appComponent.message = message;

      setTimeout(() => {
        this.appComponent.isFeedback = false;
      }, 3200); 
    }
  }

  returnUserEmail(enteredEmail: string): User | null {
    let foundUser = null;
    this.usersServ.users$
      .pipe(
        map(
          (users) => users.find((user) => user.email === enteredEmail) || null
        )
      )
      .subscribe((user) => {
        foundUser = user;
      });

    return foundUser;
  }

  private loginFeedback() {
    this.loginFeedbacks = 'Email und Passwort stimmen nicht überein.';
  }

  onFeedbackChange() {
    this.loginFeedbacks = '';
  }

  redirectDashboard() {
    debugger;
    this.usersServ.currentUser = this.guestUser;
    this.router.navigate(['/dashboard']);
  }
}
