import { Component } from '@angular/core';
import { StartscreenComponent } from "./../startscreen.component";

@Component({
  selector: 'app-sign-up-notice',
  standalone: true,
  imports: [StartscreenComponent],
  templateUrl: './sign-up-notice.component.html',
  styleUrl: './sign-up-notice.component.scss'
})
export class SignUpNoticeComponent {

  constructor(public startscreen: StartscreenComponent) {}

  toggleSignup() {
    this.startscreen.toggleSignup();
  }

}
