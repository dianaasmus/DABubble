import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ChatHistoryComponent } from '../chat-history.component';
import { TextfieldComponent } from '../../textfield/textfield.component';
import { MainChatComponent } from '../../main-chat/main-chat.component';

@Component({
  selector: 'app-threat',
  standalone: true,
  imports: [ChatHistoryComponent, TextfieldComponent, MatButtonModule, MatSidenavModule, MatIconModule, NgIf],
  templateUrl: './threat.component.html',
  styleUrl: './threat.component.scss'
})
export class ThreatComponent {

  constructor(public mainChat: MainChatComponent) {}

}
