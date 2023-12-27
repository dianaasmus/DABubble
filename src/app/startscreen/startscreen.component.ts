import { Component } from '@angular/core';
import { LoginAnimationComponent } from './login-animation/login-animation.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { SignUpNoticeComponent } from './sign-up-notice/sign-up-notice.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { DataProtectionComponent } from './data-protection/data-protection.component';
import { ImprintComponent } from './imprint/imprint.component';
import { SelectAvatarComponent } from './select-avatar/select-avatar.component';
import { NgIf } from '@angular/common';
import { FormGroup } from '@angular/forms';



@Component({
  selector: 'app-startscreen',
  standalone: true,
  imports: [LoginAnimationComponent, SignUpComponent, LegalNoticeComponent, SignUpNoticeComponent, SelectAvatarComponent, LoginComponent, DataProtectionComponent, ImprintComponent, NgIf],
  templateUrl: './startscreen.component.html',
  styleUrl: './startscreen.component.scss'
})
export class StartscreenComponent {
  showLogin = true;
  showSignup = false;
  showDataProtection = false;
  showImprint = false;
  selectAvatar = false;
  newUser!: any;


  toggleSignup() {
    this.showLogin = !this.showLogin;
    this.showSignup = !this.showSignup;
  }


  toggleDataProtection() {
    this.showDataProtection = !this.showDataProtection;
  }


  toggleImprint() {
    this.showImprint = !this.showImprint;
  }


  toggleSelectAvatar() {
    this.showSignup = !this.showSignup;
    this.selectAvatar = !this.selectAvatar;
  }

}
