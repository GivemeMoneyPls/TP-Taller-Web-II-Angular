import { Component, OnInit } from '@angular/core';
import { Pedido, PedidoService } from '../../api/services/pedido/pedido.service';
import { AuthService } from '../../api/services/auth/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-mis-compras',
  standalone: true,
imports: [
    CommonModule
  ],
  templateUrl: './mis-compras.component.html',
  
  styleUrls: ['./mis-compras.component.css']
})
export class MisComprasComponent implements OnInit {
   misPedidos: Pedido[] = []; 
    isLoading = true;
    error: string | null = null;
   
    constructor(
        private pedidoService: PedidoService,
        private authService: AuthService
    ) { }
   
    ngOnInit(): void {
       
        
        const usuarioId = this.authService.getCurrentUserId();
       
        if (usuarioId) {
            this.cargarMisPedidos(usuarioId); 
        } else {
           
            this.error = "Por favor, inicia sesión para ver tus compras.";
            this.isLoading = false;
        }
    }
   
    
    cargarMisPedidos(usuarioId: number): void {
     this.pedidoService.getMisPedidos(usuarioId).subscribe({
        next: (data: Pedido[]) => { 
          this.misPedidos = data;
          this.isLoading = false;
        },
        error: (err: any) => { 
          console.error('Error al cargar las compras:', err);
          this.error = 'Ocurrió un error al cargar tus compras. Asegúrate que el backend está corriendo.';
          this.isLoading = false;
        }
      });
    }
}