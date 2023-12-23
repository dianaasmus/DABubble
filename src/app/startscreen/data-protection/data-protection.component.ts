import { Component } from '@angular/core';
import { StartscreenComponent } from '../startscreen.component';

@Component({
  selector: 'app-data-protection',
  standalone: true,
  imports: [],
  templateUrl: './data-protection.component.html',
  styleUrl: './data-protection.component.scss'
})
export class DataProtectionComponent {

  constructor(public startscreen: StartscreenComponent) {}


  toggleDataProtection() {
    this.startscreen.toggleDataProtection();
  }
}
