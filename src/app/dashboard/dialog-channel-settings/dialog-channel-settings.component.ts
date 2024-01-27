import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-channel-settings',
  standalone: true,
  imports: [],
  templateUrl: './dialog-channel-settings.component.html',
  styleUrl: './dialog-channel-settings.component.scss'
})
export class DialogChannelSettingsComponent {
  editName = false;
  editDescr = false;

  constructor(public dialogRef: MatDialogRef<DialogChannelSettingsComponent>) { }

  closeDialog(): void {
    this.dialogRef.close();
  }


  toggleEditState(section: string) {
    if (section === 'name') {
      this.editName = !this.editName;
    } else {
      this.editDescr = !this.editDescr;
    }
  }

}
