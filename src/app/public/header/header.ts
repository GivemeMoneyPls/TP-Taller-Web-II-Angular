import { Component, inject, OnInit  } from '@angular/core';
import { Router, RouterModule, NavigationEnd  } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../api/services/auth/auth.service';
import { SearchService } from '../../api/services/search/search.service';
import { JuegoFiltrosService } from '../../api/services/juego-filtros/juego-filtros.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit{
  authService = inject(AuthService);
  juegoFiltrosService = inject(JuegoFiltrosService);
  user$ = this.authService.user$;
  searchService = inject(SearchService);
  router = inject(Router);

  searchTerm = '';
  isDropdownOpen = false;


  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (!event.url.includes('/juegos')) {
          this.searchTerm = '';
          this.searchService.setSearchTerm('');
        }
      });
  }


  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  logout() {
    localStorage.removeItem('juegoFiltrosGuardados');
    this.juegoFiltrosService.actualizarJuegos([]);
    this.searchService.setSearchTerm('');
    console.log("final")
    this.closeDropdown();
    this.authService.logout();
  }


  onSearchChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm = value;

    this.searchService.setSearchTerm(value);

    if (!this.router.url.includes('/juegos') && value.trim() !== '') {
      this.router.navigate(['/juegos'], { queryParams: { q: value } });
    }
  }

  onSearchSubmit() {
    if (this.router.url.includes('/juegos')) {
      this.searchService.setSearchTerm(this.searchTerm);
    } else {
      this.router.navigate(['/juegos'], { queryParams: { q: this.searchTerm } });
    }
  }
}
