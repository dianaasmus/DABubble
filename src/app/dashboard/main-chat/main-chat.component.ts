import { Component } from '@angular/core';
import { TextfieldComponent } from '../../textfield/textfield.component';

@Component({
  selector: 'app-main-chat',
  standalone: true,
  imports: [TextfieldComponent],
  templateUrl: './main-chat.component.html',
  styleUrl: './main-chat.component.scss'
})
export class MainChatComponent {

}
