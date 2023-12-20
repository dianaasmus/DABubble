import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  newUser = new FormGroup({
    firstLastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  submitForm(e: any) {
    e.preventDefault();
  }

}
