import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LegalNoticeComponent } from '../legal-notice/legal-notice.component';
import { StartscreenComponent } from '../startscreen.component';



@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, LegalNoticeComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  newUser = new FormGroup({
    firstLastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  submitForm(e: any) {
    e.preventDefault();
  }

  constructor(public startscreen: StartscreenComponent) {}

  toggleSignup() {
    this.startscreen.toggleSignup();
  }

}
