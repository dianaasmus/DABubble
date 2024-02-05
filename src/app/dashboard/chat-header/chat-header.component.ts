import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChannelsService } from '../../channels.service';
import { DialogChannelSettingsComponent } from '../dialog-channel-settings/dialog-channel-settings.component';
import { Channel } from '../../../models/channel.class';

@Component({
  selector: 'app-chat-header',
  standalone: true,
  imports: [],
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.scss'
})
export class ChatHeaderComponent {
  users: any;
  // usersCount!: Number;

  constructor(public dialog: MatDialog, public channelsServ: ChannelsService) {
  }


  ngAfterViewChecked() {
    this.users = this.getChannelUsers();    
  }


  getChannelUsers() {
    const allChannels = this.channelsServ.channels;
    const currentChannel = this.channelsServ.currentChannel;
  
    const foundChannel: any = allChannels.find((channel: Channel) => channel.name === currentChannel);
  
    return foundChannel ? foundChannel.users : [];
  }
  


  openSettings(channel: string) {
    this.dialog.open(DialogChannelSettingsComponent, {
      panelClass: 'channel-settings-container',
    });
  }
}
