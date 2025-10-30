import { Routes } from '@angular/router';
import { DetailJuegos } from './modules/juegos/pages/detail-juegos/detail-juegos';
import { Home } from './public/home/home';

export const routes: Routes = [

    {
      path: '',
      component: Home
    },

    {
      path: '**',
      redirectTo: ''
    }
];
