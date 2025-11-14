import { Routes } from '@angular/router';
import { DetailJuegos } from './modules/juegos/pages/detail-juegos/detail-juegos';
import { Home } from './public/home/home';
import { SignupComponent } from './modules/auth/pages/signup/signup';
import { SigninComponent } from './modules/auth/pages/signin/signin';
import { MisComprasComponent } from './modules/mis-compras/pages/mis-compras';
import { Carrito } from './modules/carrito/pages/carrito/carrito';
import { GestionarJuegos } from './modules/juegos/pages/gestionar-juegos/gestionar-juegos';
import { UpdateJuegos } from './modules/juegos/pages/update-juegos/update-juegos';
import { Pago} from './modules/carrito/pages/pago/pago';
import { ProfileComponent } from './modules/auth/pages/profile/profile';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
import { publicGuard } from './core/guards/public.guard';
import { CreateJuego } from './modules/juegos/pages/create-juego/create-juego';

export const routes: Routes = [

    {
      path: '',
      component: Home
    },

    {
      path: 'signup',
      component: SignupComponent,
      canActivate: [publicGuard]
    },

    {
      path: 'signin',
      component: SigninComponent,
      canActivate: [publicGuard]
    },

    {
      path: 'profile',
      component: ProfileComponent,
      canActivate: [authGuard]
    },

    {
    path: 'juego/:id',
    component: DetailJuegos
  },

   { path: 'mis-compras',
      component: MisComprasComponent,
      canActivate: [authGuard]
  },

  {
    path: 'carrito',
    component: Carrito,
    canActivate: [authGuard]
  },

  {
    path: 'gestionar-juegos',
    component: GestionarJuegos,
    canActivate: [adminGuard]
  },
  {
    path: 'actualizar-juegos/:id',
    component: UpdateJuegos,
    canActivate: [adminGuard]
  },
  {
    path: 'crear-juegos',
    component: CreateJuego,
    canActivate: [adminGuard]
  },
  {
    path: 'pago',
    component: Pago,
    canActivate: [authGuard]
  },
    {
      path: '**',
      redirectTo: ''
    },


];
