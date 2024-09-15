import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { ChannelsService } from '../../../services/channels.service';
import { UsersService } from '../../../services/users.service';
import { DialogChannelSettingsComponent } from '../dialog-channel-settings/dialog-channel-settings.component';

@Component({
  selector: 'app-chat-header',
  standalone: true,
  imports: [],
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.scss'
})
export class ChatHeaderComponent {
  channelUsers = {};
  userData: any;


  constructor(public dialog: MatDialog, public channelsServ: ChannelsService, public usersServ: UsersService) { }

  ngOnInit(): void {
    this.getChannelUsers();
    // this.getUserData();
  }


  getUserData() {
    if (this.channelUsers) {
      // this.channelUsers.forEach(channelUserId => {
      //   const user$ = this.returnUserId(channelUserId);
      //   user$.subscribe(user => {
      //     if (user) {
      //       this.userData.push(user);
      //       console.log(user);
      //     }
      //   });
      // });
      for (let channelUserId in this.channelUsers) {
        const user$ = this.returnUserId(channelUserId);
        user$.subscribe(user => {
          if (user) {
            this.userData.push(user);
            console.log(user);
          }
        });
      }
    }
  }


  returnUserId(channelUserId: string) {
    return this.usersServ.usersSubject.pipe(
      map(users => users.find(user => user.id === channelUserId))
    );
  }


  getChannelUsers() {
    // debugger;
    this.channelsServ.channels$.subscribe(allChannels => {
      const currentChannel = this.channelsServ.currentChannel;
      const foundChannel = allChannels.find(channel => channel.name === currentChannel);
      if (foundChannel) {
        // debugger;
        console.log(this.channelUsers);
        console.log(allChannels[0].users);
        console.log(foundChannel.users);

        this.channelUsers = allChannels[0].users;
        this.getUserData();

        return Object.keys(this.channelUsers).length;
      } else {
        return null;
      }
    });
  }


  returnCurrentChannel(currentChannel: string) {
    return this.channelsServ.channels$.pipe(
      map(channel => channel.find(channel => channel.name === currentChannel) || null)
    );
  }


  openSettings(channel: string) {
    this.dialog.open(DialogChannelSettingsComponent, {
      panelClass: 'channel-settings-container',
    });
  }
}
