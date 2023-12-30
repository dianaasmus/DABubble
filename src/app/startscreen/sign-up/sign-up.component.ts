import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DatabaseFireService } from '../../database-fire.service';
import { LegalNoticeComponent } from '../legal-notice/legal-notice.component';
import { StartscreenComponent } from '../startscreen.component';



@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, LegalNoticeComponent, NgIf],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  checkData = this.database.checkData;
  newUser = this.database.newUser;


  constructor(public database: DatabaseFireService, public startscreen: StartscreenComponent) { }


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
