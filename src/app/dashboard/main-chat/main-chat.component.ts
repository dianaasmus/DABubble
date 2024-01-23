import { NgIf } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChatHistoryComponent } from '../chat-history/chat-history.component';
import { ThreatComponent } from '../chat-history/threat/threat.component';
import { TextfieldComponent } from '../textfield/textfield.component';


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


  ngAfterViewChecked() {
    this.scrollToBottom();
  }


  scrollToBottom() {
    try {
      this.chatHistory.nativeElement.scrollTop = this.chatHistory.nativeElement.scrollHeight;
    } catch(err) { }
  }

}
