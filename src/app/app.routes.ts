import { Routes } from '@angular/router';
import { StartscreenComponent } from './startscreen/startscreen.component';
import { DashboardComponent } from './dashboard/dashboard.component';


export const routes: Routes = [
    { path: '', component: StartscreenComponent },
    { path: ':id', component: DashboardComponent }
];
