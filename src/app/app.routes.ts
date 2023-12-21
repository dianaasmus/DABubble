import { Routes } from '@angular/router';
import { LoginComponent } from './startscreen/login/login.component';
import { SignUpComponent } from './startscreen/sign-up/sign-up.component';
import { StartscreenComponent } from './startscreen/startscreen.component';


export const routes: Routes = [
    { path: '', component: StartscreenComponent },
    // { path: 'registrieren', component: SignUpComponent }
];
