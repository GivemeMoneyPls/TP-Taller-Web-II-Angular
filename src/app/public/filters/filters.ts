import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { Genero, Plataforma } from '../../modules/juegos/interfaces/juego.interface';
import { FilterService } from '../../api/services/filter/filter.service';
import { JuegoFiltrosService } from '../../api/services/juego-filtros/juego-filtros.service';

interface Filtros {
  precioMin?: number;
  precioMax?: number;
  plataformaId?: number;
  generoIds: number[];
}

@Component({
  selector: 'app-filters',
  imports: [FormsModule],
  templateUrl: './filters.html',
  styleUrl: './filters.css',
})
export class Filters  {

  generos:Genero[] = [];
  plataformas:Plataforma[] = [];

  public filtrosForm: Filtros = {
    precioMin: undefined,
    precioMax: undefined,
    plataformaId: undefined,
    generoIds: [] as number[]
  };

  filterService = inject(FilterService);
  juegoFiltrosService = inject(JuegoFiltrosService);

  private readonly FILTERS_KEY = 'juegoFiltrosGuardados';

  async ngOnInit() {
  this.cargarFiltrosGuardados();
  await this.crearFiltro(); // ✅ Espera a que termine de cargar géneros y plataformas
  this.aplicarFiltros();    // ✅ Ahora aplica los filtros cuando ya están listos
}

  async crearFiltro() {
  try {
    const [generos, plataformas] = await Promise.all([
      firstValueFrom(this.filterService.getGeneros()),
      firstValueFrom(this.filterService.getPlataformas())
    ]);

    this.generos = generos;
    this.plataformas = plataformas;
  } catch (error) {
    console.error('Error al cargar géneros o plataformas:', error);
  }
}

  onGeneroChange(event: Event, id: number): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.filtrosForm.generoIds.push(id);
    } else {
      this.filtrosForm.generoIds = this.filtrosForm.generoIds.filter(g => g !== id);
    }
  }

  cargarFiltrosGuardados() {
    const filtrosGuardados = localStorage.getItem(this.FILTERS_KEY);
    if (filtrosGuardados) {
      try {
        const parsedFiltros = JSON.parse(filtrosGuardados);
        this.filtrosForm = {
          ...parsedFiltros,
          precioMin: parsedFiltros.precioMin ? parseFloat(parsedFiltros.precioMin) : undefined,
          precioMax: parsedFiltros.precioMax ? parseFloat(parsedFiltros.precioMax) : undefined,
          plataformaId: parsedFiltros.plataformaId ? parseInt(parsedFiltros.plataformaId, 10) : undefined,
          generoIds: parsedFiltros.generoIds || [],
        };
      } catch (e) {
        console.error('Error al cargar filtros de localStorage:', e);
        localStorage.removeItem(this.FILTERS_KEY);
      }
    }
  }

  aplicarFiltros() {
    console.log('Filtros a enviar (ngModel):', this.filtrosForm);
    localStorage.setItem(this.FILTERS_KEY, JSON.stringify(this.filtrosForm));

    this.filterService.getJuegosFiltrados(this.filtrosForm).subscribe({
      next: (juegos) => {
        console.log('Juegos filtrados:', juegos);
        this.juegoFiltrosService.actualizarJuegos(juegos);
      },
      error: (error) => {
        console.error('Error al filtrar juegos:', error);
      }
    });
  }

  limpiarFiltros() {
    localStorage.removeItem(this.FILTERS_KEY);
    this.filtrosForm = {
      precioMin: undefined,
      precioMax: undefined,
      plataformaId: undefined,
      generoIds: []
    };
    this.aplicarFiltros();
  }
}
