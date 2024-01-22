import { Component, ElementRef, ViewChild } from '@angular/core';
import { TextfieldComponent } from '../textfield/textfield.component';
import { ChatHistoryComponent } from '../chat-history/chat-history.component';
import { NgIf } from '@angular/common';
import { ThreatComponent } from '../chat-history/threat/threat.component';


@Component({
  selector: 'app-main-chat',
  standalone: true,
  imports: [TextfieldComponent, ChatHistoryComponent, ThreatComponent, NgIf],
  templateUrl: './main-chat.component.html',
  styleUrl: './main-chat.component.scss'
})
export class MainChatComponent {
  threat: boolean = false;
}
