import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreateNewUserService } from '../../create-new-user.service';
import { DialogFeedbackComponent } from '../../dialog-feedback/dialog-feedback.component';
import { LegalNoticeComponent } from '../legal-notice/legal-notice.component';
import { StartscreenComponent } from '../startscreen.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-select-avatar',
  standalone: true,
  imports: [ReactiveFormsModule, LegalNoticeComponent],
  templateUrl: './select-avatar.component.html',
  styleUrl: './select-avatar.component.scss'
})
export class SelectAvatarComponent {
  newUser = this.createNU.newUser;
  avatarSrc = '../../../assets/imgs/person.png';


  constructor(public startscreen: StartscreenComponent, public createNU: CreateNewUserService, public dialog: MatDialog, private router: Router) { }


  createUser(e: Event) {
    e.preventDefault();
    console.log(this.newUser);
    this.dialog.open(DialogFeedbackComponent, { data: { message: 'Konto erfolgreich erstellt!' }});
    setTimeout(() => {
      this.startscreen.selectAvatar = false;
      this.startscreen.showLogin = true;
    }, 1000);
    this.newUser.reset();
  }


  uploadFiles(event: any) {
    if (event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event: any) => {
        this.avatarSrc = event.target.result;
        document.getElementById('avatarPlaceholder')?.classList.add('selected-avatar');
      };
    }
  }


  selectAvatar(avatarNbr: number) {
    this.avatarSrc = `../../../assets/imgs/avatar${avatarNbr}.png`;
    document.getElementById('avatarPlaceholder')?.classList.add('selected-avatar');
  }


  toggleSelectAvatar() {
    this.startscreen.toggleSelectAvatar();
  }
}
