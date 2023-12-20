import { Routes } from '@angular/router';
import { LoginAnimationComponent } from './login-animation/login-animation.component';
import { SignUpComponent } from './sign-up/sign-up.component';


export const routes: Routes = [
    { path: '', component: LoginAnimationComponent },
    { path: 'registrieren', component: SignUpComponent }
];
