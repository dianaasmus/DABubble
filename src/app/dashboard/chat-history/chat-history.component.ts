import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Message } from '../../../models/message.class';
import { MessageRenderingService } from '../../message-rendering.service';
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
  // date: Date = new Date();
  // time = this.date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
  allChatMessage = this.getChannelMessages();
  currentChat = 'Entwicklerteam';
  users: any;


  constructor(public mainChat: MainChatComponent, public usersService: UsersService, public messagesServ: MessageRenderingService, public usersServ: UsersService) {
  }


  getChannelMessages(): Message[] | null {
    if (this.messagesServ.messages && this.messagesServ.messages.length > 0) {
      return this.messagesServ.messages;
    } else {
      return null;
    }
  }


  getFormattedTime(timestamp: number) {
    const date = new Date(timestamp * 1000);
    const formattedTime = date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
    return formattedTime;
  }


  getUserImage(firstName: string, lastName: string): string | null {
    this.users = this.usersServ.users;
    const messageUser = this.users.find((user: any) => user.firstLastName === `${firstName} ${lastName}`);
    return messageUser?.profileImg || null;
  }
  
}
