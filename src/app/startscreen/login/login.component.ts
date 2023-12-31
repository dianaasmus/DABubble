import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseFireService } from '../../database-fire.service';


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

  constructor(private database: DatabaseFireService, private router: Router) { }


  submitForm(e: any) {
    e.preventDefault();
    const enteredEmail = this.loginUser.get('email')?.value;
    const enteredPassword = this.loginUser.get('password')?.value;
    const userExists = this.database.users.find(user => user.email === enteredEmail);

    if (userExists) {
      if (userExists.password === enteredPassword) {
        this.redirectDashboard();
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
