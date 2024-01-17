import { NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatButtonModule, MatSidenavModule, MatIconModule, NgIf],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  showDMs = true;
  showChannels = true;
  @ViewChild('drawer') drawer!: MatDrawer;

  // ngAfterViewInit() {
  //   this.drawer.toggle();
  // }

  toggleShowChannels() {
    const arrowDropChannel = document.getElementById('arrowDropChannel');
    this.showChannels = !this.showChannels;
    if (!this.showChannels) {
      arrowDropChannel!.style.transform = 'rotate(-90deg)';
    } else {
      arrowDropChannel!.style.transform = 'rotate(0deg)';
    }
  }

  toggleShowDMs() {
    const arrowDropDM = document.getElementById('arrowDropDM');
    this.showDMs = !this.showDMs;
    if (!this.showDMs) {
      arrowDropDM!.style.transform = 'rotate(-90deg)';
    } else {
      arrowDropDM!.style.transform = 'rotate(0deg)';
    }
  }
}
