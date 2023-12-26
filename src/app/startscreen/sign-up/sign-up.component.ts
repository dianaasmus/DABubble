import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LegalNoticeComponent } from '../legal-notice/legal-notice.component';
import { StartscreenComponent } from '../startscreen.component';
import { NgIf } from '@angular/common';
import { SelectAvatarComponent } from '../select-avatar/select-avatar.component';



@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, LegalNoticeComponent, SelectAvatarComponent, NgIf],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  checkData = false;


  newUser = this.fb.group({
    firstLastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+\s[a-zA-Z]+$/)]],
    email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/)]],
    checkData: [this.checkData]
  });


  constructor(public startscreen: StartscreenComponent, private fb: FormBuilder) {}


  onCheckboxChange(event: Event) {
    this.checkData = (event.target as HTMLInputElement).checked;
  }


  submitForm(e: any) {
    e.preventDefault();
    console.log(this.newUser);
    this.newUser.reset();

    this.openSelectAvatar();
  }


  openSelectAvatar() {
    this.startscreen.toggleSelectAvatar();
  }


  toggleSignup() {
    this.startscreen.toggleSignup();
  }
  

  toggleDataProtection() {
    this.startscreen.toggleDataProtection();
  }

}
