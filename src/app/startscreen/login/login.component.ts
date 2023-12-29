import { Component } from '@angular/core';
import { DatabaseFireService } from '../../database-fire.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private database: DatabaseFireService) {
    database.log();
  }
}
