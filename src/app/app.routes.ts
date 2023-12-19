import { Routes } from '@angular/router';
import { LoginAnimationComponent } from './login-animation/login-animation.component';
import { LoginComponent } from './login/login.component';


export const routes: Routes = [
    { path: '', component: LoginAnimationComponent },
    { path: '', component: LoginComponent }
];
