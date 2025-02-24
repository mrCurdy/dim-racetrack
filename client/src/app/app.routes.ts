import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FrontDeskComponent } from './components/front-desk/front-desk.component';
import { SessionEditerComponent } from './components/session-editer/session-editer.component';

export const routes: Routes = [
    // {
    //     path: '',
    //     component: HomeComponent,
    // },
    {
        path: 'driver-list',
        component: FrontDeskComponent,
    },
    {
        path: 'front-desk',
        component: SessionEditerComponent,
    }
];
