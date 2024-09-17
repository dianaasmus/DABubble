import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { User } from '../../../models/user.interface';
import { AppComponent } from '../../app.component';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginFeedbacks!: string;
  enteredEmail: string | undefined;
  loginUser = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

  constructor(
    private usersServ: UsersService,
    private router: Router,
    public dialog: MatDialog,
    private appComponent: AppComponent
  ) { }


  ngOnInit() {
    this.usersServ.getUsers();
  }

  /**
   * Navigates to the user's page by setting the router URL based on the current user's ID.
   */
  setRouterId(): void {
    this.router.navigateByUrl('' + this.usersServ.currentUser?.id);
  }

  /**
   * Handles the guest login process by retrieving guest credentials 
   * and assigning them to the login form. Once the credentials are set, 
   * the form is submitted.
   * 
   * @async
   * @function checkGuestLogin
   * @returns {Promise<void>} - A promise that resolves when the guest login process is complete.
   */
  async checkGuestLogin() {
    const guestCredentials = this.usersServ.getGuestCredentials();

    this.loginUser.patchValue({
      email: guestCredentials.email,
      password: guestCredentials.password
    });

    this.submitForm(event);
  }

  /**
  * Submits the login form, checks if the user exists, and attempts to log in.
  * 
  * @param {Event} e - The form submit event.
  */
  async submitForm(e: any): Promise<void> {
    e.preventDefault();
    this.enteredEmail = this.loginUser.get('email')?.value;

    if (this.enteredEmail) {
      let userExists = await this.returnUserEmail(this.enteredEmail);

      if (userExists) {
        this.tryCatchLogin(userExists);
      } else {
        this.loginFeedback();
      }
    } else {
      this.loginFeedback();
    }
  }

  /**
  * Tries to log in the user if the credentials match. 
  * If successful, navigates to the user's page. Otherwise, displays feedback.
  * 
  * @param {User} userExists - The user object that exists based on the entered email.
  */
  tryCatchLogin(userExists: User): void {
    let sucessLogin;
    const enteredPassword = this.loginUser.get('password')?.value;

    try {
      if (userExists.password === enteredPassword) {
        this.usersServ.currentUser = userExists;
        this.setRouterId();
        sucessLogin = true;
      } else {
        this.loginFeedback();
      }
    } catch (e) {
      console.warn(e);
    } finally {
      this.sendSuccessMsg(sucessLogin);
    }
  }

  /**
   * Displays a success message when the login is successful.
   * 
   * @param {boolean | undefined} sucessLogin - Whether the login was successful or not.
   */
  sendSuccessMsg(sucessLogin: boolean | undefined): void {
    if (sucessLogin) {
      let message = 'Willkommen zurück.';
      this.appComponent.isFeedback = true;
      this.appComponent.message = message;

      setTimeout(() => {
        this.appComponent.isFeedback = false;
      }, 3200);
    }
  }

  /**
   * Finds a user by their email in the list of users.
   * 
   * @param {string} enteredEmail - The email of the user to find.
   * @returns {User | null} The user object if found, otherwise null.
   */
  returnUserEmail(enteredEmail: string): User | null {
    let foundUser = null;
    this.usersServ.usersSubject
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

  /**
   * Removes the current feedback message by clearing the login feedback string.
   */
  removeFeedback(): void {
    this.loginFeedbacks = '';
  }

  /**
   * Displays a feedback message if the entered email and password do not match.
   */
  loginFeedback(): void {
    const enteredEmail = this.loginUser.get('email')?.value;
    const enteredPassword = this.loginUser.get('password')?.value;
    if (enteredEmail && enteredPassword) {
      this.loginFeedbacks = 'Email und Passwort stimmen nicht überein.';
    }
  }

  /**
   * Handles feedback change during user input, checking if the entered password matches any user.
   * 
   * @param {Event} event - The input change event.
   */
  onChangeFeedback(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let foundUser;
    const enteredPassword = this.loginUser.get('password')?.value;
    this.usersServ.usersSubject
      .pipe(
        map(
          (users) => users.find((user) => user.password === enteredPassword) || null
        )
      )
      .subscribe((user) => {
        foundUser = user;
      });
    foundUser ? true : this.loginFeedback();
  }

}
