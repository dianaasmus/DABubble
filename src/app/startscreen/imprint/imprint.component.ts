import { Component } from '@angular/core';
import { StartscreenComponent } from '../startscreen.component';

@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.scss'
})
export class ImprintComponent {

  constructor(public startscreen: StartscreenComponent) {}


  toggleImprint() {
    this.startscreen.toggleImprint();
  }
}
