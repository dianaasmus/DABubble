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

  constructor(public dialogRef: MatDialogRef<DialogChannelSettingsComponent>) { }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
