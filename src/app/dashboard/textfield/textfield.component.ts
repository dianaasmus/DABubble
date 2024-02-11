import { Component } from '@angular/core';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { MessageRenderingService } from '../../message-rendering.service';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-textfield',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './textfield.component.html',
  styleUrl: './textfield.component.scss'
})
export class TextfieldComponent {
  textarea!: any;

  constructor(public messageServ: MessageRenderingService, private fb: FormBuilder, private usersServ: UsersService) {}


  messageDetails = this.fb.group({
    firstLastName: this.usersServ.currentUser,
    email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/)]],
    checkData: [false, Validators.requiredTrue],
    profileImg: ['', undefined]
  });

  sendMessage() {
    console.log(this.usersServ.currentUser);
    
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
