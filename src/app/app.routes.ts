import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/user-details/user-details').then(x => x.UserDetailsComponent)
    },
    {
        path: 'visit-page',
        loadComponent: () => import('./pages/visit-page/visit-page').then(x => x.VisitPage)
    }
];
