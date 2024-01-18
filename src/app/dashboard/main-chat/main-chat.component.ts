import { Component } from '@angular/core';
import { TextfieldComponent } from '../../textfield/textfield.component';
import { ChatHistoryComponent } from '../../chat-history/chat-history.component';

@Component({
  selector: 'app-main-chat',
  standalone: true,
  imports: [TextfieldComponent, ChatHistoryComponent],
  templateUrl: './main-chat.component.html',
  styleUrl: './main-chat.component.scss'
})
export class MainChatComponent {

}
