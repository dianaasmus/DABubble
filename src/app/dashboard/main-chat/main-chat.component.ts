import { NgIf } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChatHistoryComponent } from '../chat-history/chat-history.component';
import { ThreatComponent } from '../chat-history/threat/threat.component';
import { TextfieldComponent } from '../textfield/textfield.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogChannelSettingsComponent } from '../dialog-channel-settings/dialog-channel-settings.component';


@Component({
  selector: 'app-main-chat',
  standalone: true,
  imports: [TextfieldComponent, ChatHistoryComponent, ThreatComponent, NgIf],
  templateUrl: './main-chat.component.html',
  styleUrl: './main-chat.component.scss'
})
export class MainChatComponent {
  threat: boolean = false;
  @ViewChild('scrollChatHistory', { static: true }) chatHistory!: ElementRef;


  constructor(public dialog: MatDialog) {}


  ngAfterViewChecked() {
    this.scrollToBottom();
  }


  scrollToBottom() {
    try {
      this.chatHistory.nativeElement.scrollTop = this.chatHistory.nativeElement.scrollHeight;
    } catch(err) { }
  }


  openSettings(channel: string) {
    console.log(channel);
    
    this.dialog.open(DialogChannelSettingsComponent, {
      panelClass: 'channel-settings-container',
    });
  }

}
