import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LegalNoticeComponent } from '../legal-notice/legal-notice.component';
import { StartscreenComponent } from '../startscreen.component';

@Component({
  selector: 'app-select-avatar',
  standalone: true,
  imports: [ReactiveFormsModule, LegalNoticeComponent],
  templateUrl: './select-avatar.component.html',
  styleUrl: './select-avatar.component.scss'
})
export class SelectAvatarComponent {
  newUser: any;

  constructor(public startscreen: StartscreenComponent) { }


  submitForm(e: any) {
    e.preventDefault();
    console.log(this.newUser);
  }


  toggleSelectAvatar() {
    this.startscreen.toggleSelectAvatar();
  }
}
