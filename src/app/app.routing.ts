import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'user:/id',
        pathMatch: 'full',
    },
    {
        path: 'user/:id',
        component: UserComponent
    },
];
