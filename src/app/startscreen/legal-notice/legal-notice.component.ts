import { Component } from '@angular/core';
import { StartscreenComponent } from '../startscreen.component';

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss'
})
export class LegalNoticeComponent {

  constructor(public startscreen: StartscreenComponent) {}


  toggleDataProtection() {
    this.startscreen.toggleDataProtection();
  }

  toggleImprint() {
    this.startscreen.toggleImprint();
  }
}
