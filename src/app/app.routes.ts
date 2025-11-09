import { Routes } from '@angular/router';
import { DetailJuegos } from './modules/juegos/pages/detail-juegos/detail-juegos';
import { Home } from './public/home/home';
import { SignupComponent } from './modules/auth/pages/signup/signup';
import { SigninComponent } from './modules/auth/pages/signin/signin';
import { MisComprasComponent } from './modules/mis-compras/mis-compras.component';
import { Carrito } from './modules/carrito/pages/carrito/carrito';
import { GestionarJuegos } from './modules/juegos/pages/gestionar-juegos/gestionar-juegos';
import { UpdateJuegos } from './modules/juegos/pages/update-juegos/update-juegos';
import { Pago} from './modules/carrito/pages/pago/pago';
export const routes: Routes = [

    {
      path: '',
      component: Home
    },

    {
      path: 'signup',
      component: SignupComponent
    },

    {
      path: 'signin',
      component: SigninComponent
    },


    {
    path: 'juego/:id',
    component: DetailJuegos
  },

   { path: 'mis-compras',
      component: MisComprasComponent
  },


  {
    path: 'carrito',
    component: Carrito
  },

  {
    path: 'gestionar-juegos',
    component: GestionarJuegos
  },
  {
    path: 'actualizar-juegos/:id',
    component: UpdateJuegos
  },
  {
    path: 'pago',
    component: Pago
  },
    {
      path: '**',
      redirectTo: ''
    },


];
