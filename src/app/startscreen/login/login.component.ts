import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../users.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginFeedbacks!: string;
  loginUser = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });


  constructor(private usersServ: UsersService, private router: Router) { }


  setRouterId() {
    this.router.navigateByUrl('' + this.usersServ.currentUser.id);
  }


  submitForm(e: any) {
    e.preventDefault();
    const enteredEmail = this.loginUser.get('email')?.value;
    const enteredPassword = this.loginUser.get('password')?.value;
    const userExists = this.usersServ.users.find(user => user.email === enteredEmail);

    if (userExists) {
      if (userExists.password === enteredPassword) {
        this.usersServ.currentUser = userExists;
        this.setRouterId();
      } else {
        this.loginFeedback();
      }
    } else {
      this.loginFeedback();
    }
  }


  private loginFeedback() {
    this.loginFeedbacks = 'Email und Passwort stimmen nicht überein.';
  }


  onFeedbackChange() {
    this.loginFeedbacks = '';
  }


  redirectDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
