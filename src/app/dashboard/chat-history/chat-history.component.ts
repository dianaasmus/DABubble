import { Component } from '@angular/core';
import { MainChatComponent } from '../main-chat/main-chat.component';


@Component({
  selector: 'app-chat-history',
  standalone: true,
  imports: [],
  templateUrl: './chat-history.component.html',
  styleUrl: './chat-history.component.scss'
})
export class ChatHistoryComponent {

  constructor(public mainChat: MainChatComponent) { }

}
