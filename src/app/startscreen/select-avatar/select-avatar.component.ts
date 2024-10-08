import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogFeedbackComponent } from '../../dialog-feedback/dialog-feedback.component';
import { LegalNoticeComponent } from '../legal-notice/legal-notice.component';
import { StartscreenComponent } from '../startscreen.component';
import { UsersService } from '../../../services/users.service';


@Component({
  selector: 'app-select-avatar',
  standalone: true,
  imports: [ReactiveFormsModule, LegalNoticeComponent],
  templateUrl: './select-avatar.component.html',
  styleUrl: './select-avatar.component.scss'
})
export class SelectAvatarComponent {
  newUser = this.usersServ.newUser;
  avatarSrc = '../../../assets/imgs/person.png';


  constructor(public startscreen: StartscreenComponent, public usersServ: UsersService, public dialog: MatDialog) { }


  createUser(e: Event): void {
    e.preventDefault();
    this.openFeedbackDialog('Konto erfolgreich erstellt!');
    this.newUser.get('profileImg')?.setValue(this.avatarSrc);
    this.usersServ.addUser();
    this.performActionsAfterDelay();
  }


  private openFeedbackDialog(message: string): void {
    this.dialog.open(DialogFeedbackComponent, { data: { message } });
  }


  private performActionsAfterDelay(): void {
    setTimeout(() => {
      this.startscreen.selectAvatar = false;
      this.startscreen.showLogin = true;
      this.newUser.reset();
      this.dialog.closeAll();
    }, 1000);
  }


  uploadFiles(event: any) {
    if (event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event: any) => {
        this.avatarSrc = event.target.result;
        document.getElementById('avatarPlaceholder')?.classList.add('selected-avatar');
        this.newUser.get('profileImg')?.setValue(this.avatarSrc);
      };
    }
  }


  selectAvatar(avatarNbr: number) {
    this.avatarSrc = `../../../assets/imgs/avatars/avatar${avatarNbr}.png`;
    document.getElementById('avatarPlaceholder')?.classList.add('selected-avatar');
  }


  toggleSelectAvatar() {
    this.startscreen.toggleSelectAvatar();
  }
}