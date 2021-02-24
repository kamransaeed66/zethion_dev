import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { NotFoundComponent } from './error/notfound/notfound.component';
import { WaitingconfirmComponent } from './layouts/waitingconfirm/waitingconfirm.component';
import { WaitingchangepasswordComponent } from './layouts/waitingchangepassword/waitingchangepassword.component';

import { OnfieldTestComponent } from './result-details/details-football/onfield-test/onfield-test.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'news',
    pathMatch: 'full',
  },
  {
    path: 'confirm',
    component: WaitingconfirmComponent,
  },
  {
    path: 'change_password',
    component: WaitingchangepasswordComponent,
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'news',
        loadChildren: './news/news.module#NewsModule'
      },
      {
        path: 'match',
        loadChildren: './match/match.module#MatchModule'
      },
      {
        path: 'results',
        loadChildren: './results/results.module#ResultsModule'
      },
      {
        path: 'onfield-test',
        component: OnfieldTestComponent
      }
    ]
  },
  // error redirect
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' }
];
