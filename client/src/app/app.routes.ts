import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FrontDeskComponent } from './components/front-desk/front-desk.component';

export const routes: Routes = [
    // {
    //     path: '',
    //     component: HomeComponent,
    // },
    {
        path: 'front-desk',
        component: FrontDeskComponent,
    }
];
