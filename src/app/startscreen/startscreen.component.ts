import { Component } from '@angular/core';
import { LoginAnimationComponent } from './login-animation/login-animation.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { SignUpNoticeComponent } from './sign-up-notice/sign-up-notice.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { NgIf } from '@angular/common';



@Component({
  selector: 'app-startscreen',
  standalone: true,
  imports: [LoginAnimationComponent, SignUpComponent, LegalNoticeComponent, SignUpNoticeComponent, LoginComponent, NgIf],
  templateUrl: './startscreen.component.html',
  styleUrl: './startscreen.component.scss'
})
export class StartscreenComponent {
  showLogin = true;
  showSignup = false;

  toggleSignup() {
    this.showLogin = !this.showLogin;
    this.showSignup = !this.showSignup;
  }

}
