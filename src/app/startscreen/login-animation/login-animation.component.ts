import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-login-animation',
  standalone: true,
  imports: [LoginComponent, SignUpComponent],
  templateUrl: './login-animation.component.html',
  styleUrl: './login-animation.component.scss'
})
export class LoginAnimationComponent {

  openSignUp() {
    document.getElementById('signUp')!.classList.remove('d-none');
    document.getElementById('signUpBtn')!.classList.add('d-none');
    document.getElementById('login')!.classList.add('d-none');
  }
}
