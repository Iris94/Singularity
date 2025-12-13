import { Routes } from '@angular/router';
import { Dashboard } from './components/pages/dashboard/dashboard';
import { Register } from './components/pages/register/register';

export const routes: Routes = [
    {
        path: '',
        component: Dashboard,
    },
    {
        path: 'register',
        component: Register,
    }
];
