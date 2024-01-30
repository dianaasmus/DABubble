import { Component, inject } from '@angular/core';
import { UsersService } from '../../users.service';
import { MainChatComponent } from '../main-chat/main-chat.component';
import { Firestore, collection, doc, onSnapshot } from '@angular/fire/firestore';
import { Message } from '../../models/message.class';


@Component({
  selector: 'app-chat-history',
  standalone: true,
  imports: [],
  templateUrl: './chat-history.component.html',
  styleUrl: './chat-history.component.scss'
})
export class ChatHistoryComponent {
  date: Date = new Date();
  time = this.date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });

  constructor(public mainChat: MainChatComponent, public usersService: UsersService) {}

}
