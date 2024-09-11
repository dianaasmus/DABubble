import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from './header/header.component';
import { MainChatComponent } from './main-chat/main-chat.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, SidenavComponent, MainChatComponent, FormsModule, MatButtonModule, MatSidenavModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  showDMs = true;
  showChannels = true;

  constructor(private usersServ: UsersService) {
    // this.usersServ.getUsers();
  }

}
