import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Message } from '../../../models/message.class';
import { MessageRenderingService } from '../../message-rendering.service';
import { UsersService } from '../../users.service';
import { MainChatComponent } from '../main-chat/main-chat.component';
import { User } from '../../../models/user.class';


@Component({
  selector: 'app-chat-history',
  standalone: true,
  imports: [],
  templateUrl: './chat-history.component.html',
  styleUrl: './chat-history.component.scss'
})
export class ChatHistoryComponent {
  // date: Date = new Date();
  // time = this.date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
  allChatMessage = this.getChannelMessages();
  currentChat = 'Entwicklerteam';
  users: any;
  // users: User[] = [];
  userName: any;
  userImg: any;

  constructor(public mainChat: MainChatComponent, public messagesServ: MessageRenderingService, public usersServ: UsersService) { }


  ngOnInit(): void {
    this.usersServ.users$.subscribe(users => {
      this.users = users;
      // Führen Sie hier die gewünschte Logik mit den Benutzern aus
    });
  }


  sentMessageUserImg(id: any) {
    // debugger;
    let user = this.sentMessageUser(id);
    if (this.users) {
      debugger;
      // const user = this.users.find((user: User) => user.id === id);
      return user.profileImg;
    }
  }


  sentMessageUser(id: any) {
    // debugger;
    if (this.users) {
      // debugger;
      const user = this.users.find((user: User) => user.id === id);
      this.userName = user.firstLastName;
      this.userImg = user.profileImg;
      return user.firstLastName;
    }
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


  getUserImage(firstLastName: string): string {
    this.users = this.usersServ.users$;
    const messageUser = this.users.find((user: any) => user.firstLastName === `${firstLastName}`);
    return messageUser?.profileImg;
  }

}
