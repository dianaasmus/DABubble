import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LegalNoticeComponent } from '../legal-notice/legal-notice.component';
import { StartscreenComponent } from '../startscreen.component';
import { UsersService } from '../../users.service';



@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, LegalNoticeComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  checkData = this.usersServ.checkData;
  newUser = this.usersServ.newUser;


  constructor(public usersServ: UsersService, public startscreen: StartscreenComponent) { }


  submitForm(e: any) {
    e.preventDefault();
    this.openSelectAvatar();
  }


  openSelectAvatar() {
    this.startscreen.toggleSelectAvatar();
  }


  toggleSignup() {
    this.newUser.reset();
    this.startscreen.toggleSignup();
  }


  toggleDataProtection() {
    this.startscreen.toggleDataProtection();
  }

}
