import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageRenderingService } from '../../message-rendering.service';
import { UsersService } from '../../users.service';
import { Message } from '../../../models/message.class';

@Component({
  selector: 'app-textfield',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './textfield.component.html',
  styleUrl: './textfield.component.scss'
})
export class TextfieldComponent {
  textarea!: any;


  constructor(public messageServ: MessageRenderingService, private fb: FormBuilder, private usersServ: UsersService) {}


  messageDetails = this.fb.group({
    message: [this.textarea, [Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]]
  });

  // messageDetails = {
  //   user: this.usersServ.currentUser,
  //   message: this.textarea
  // };

  sendMessage() {
    const messageToSend = {
      user: this.usersServ.currentUser.id,
      message: this.messageDetails.value.message,
      time: Date.now() // Zeitstempel für die aktuelle Zeit
    };
  
    // console.log(this.usersServ.currentUser);
    // console.log(messageToSend);
    console.log(this.textarea);
    this.messageServ.addMessage(messageToSend);
    
    
    // console.log(this.textarea);
    // document.getElementById('chatHistory')!.innerHTML += `
    // <div class="sent-user">
    // <div class="sent-message">
    //     <p>
    //         <span class="sent-message-time">21:30 Uhr</span>
    //         <span class="sent-user-name">Frederick Beck</span>
    //     </p>
    //     <p class="sent-message-text">
    //         ${this.textarea}
    //     </p>
    //     <div class="sent-message-feedback">
    //         <p class="message-details-border">emoji 1</p>
    //         <p class="message-details-border">emoji 2</p>
    //         <img class="emoji-reaction" src="../../assets/imgs/main-chat/add_reaction.png" alt="Add reaction">
    //     </div>
    // </div>
    // <img src="../../../assets/imgs/avatars/avatar1.png" alt="user-profile">
    // </div>
    // `;

    // this.textarea = '';
  }
}
