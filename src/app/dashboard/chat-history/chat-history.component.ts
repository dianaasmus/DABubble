import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MessageRenderingService } from '../../message-rendering.service';
import { Message } from '../../models/message.class';
import { UsersService } from '../../users.service';
import { MainChatComponent } from '../main-chat/main-chat.component';


@Component({
  selector: 'app-chat-history',
  standalone: true,
  imports: [NgFor, NgIf, NgClass],
  templateUrl: './chat-history.component.html',
  styleUrl: './chat-history.component.scss'
})
export class ChatHistoryComponent {
  date: Date = new Date();
  time = this.date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
  allChatMessage = this.getChannelMessages();
  currentChat = 'Entwicklerteam';
  
  constructor(public mainChat: MainChatComponent, public usersService: UsersService, public messagesServ: MessageRenderingService) {
    this.getChannelMessages();
  }
  
  getChannelMessages(): Message[] | null {
    if (this.messagesServ.messages && this.messagesServ.messages.length > 0) {
      return this.messagesServ.messages;
    } else {
      return null;
    }
  }


}
