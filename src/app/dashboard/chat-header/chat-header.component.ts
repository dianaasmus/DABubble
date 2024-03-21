import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChannelsService } from '../../channels.service';
import { DialogChannelSettingsComponent } from '../dialog-channel-settings/dialog-channel-settings.component';
import { Channel } from '../../../models/channel.class';
import { UsersService } from '../../users.service';
import { User } from '../../../models/user.class';
import { map } from 'rxjs';

@Component({
  selector: 'app-chat-header',
  standalone: true,
  imports: [],
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.scss'
})
export class ChatHeaderComponent {
  channelUsers = [];
  userData: any;

  
  constructor(public dialog: MatDialog, public channelsServ: ChannelsService, public usersServ: UsersService) {
    this.channelUsers = this.getChannelUsers();    
    this.userData = this.getUserData(); 
  }


  getUserData() {
    const userData: User[] = [];
    if (this.channelUsers) {
    debugger;

      this.channelUsers.forEach(channelUserId => {

        const user = this.returnUserId(channelUserId);
        if (user) {
          
          // userData.push(user);
          console.log(userData);
          console.log(user);
          
        }
      });
    }
    // return userData;
  }


  returnUserId(channelUserId: string) {
    return this.usersServ.users$.pipe(
      map(users => users.find(user => user.id === channelUserId))
    );
  }
  

  getChannelUsers() {
    const allChannels = this.channelsServ.channels;
    const currentChannel = this.channelsServ.currentChannel;
  
    const foundChannel: any = allChannels.find((channel: Channel) => channel.name === currentChannel);

    this.getUserData();
    
    return foundChannel ? foundChannel.users : [];
  }


  openSettings(channel: string) {
    this.dialog.open(DialogChannelSettingsComponent, {
      panelClass: 'channel-settings-container',
    });
  }
}
