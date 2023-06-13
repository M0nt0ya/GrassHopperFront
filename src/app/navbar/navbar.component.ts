import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar', // Selector para usar el componente en el HTML como <app-navbar></app-navbar>
  templateUrl: './navbar.component.html', // Ruta del archivo de plantilla del componente
  styleUrls: ['./navbar.component.css'] // Ruta del archivo de estilos del componente
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) {
    // Constructor del componente, inyecta las dependencias del Router y AuthService
  }

  ngOnInit(): void {
    // Método del ciclo de vida que se ejecuta al inicializar el componente
  }

  getUrl() {
    return this.router.url;
    // Método que devuelve la URL actual a través del Router
  }

  logout() {
    this.authService.logout();
    // Método para cerrar sesión, invoca el método logout del AuthService
  }

}
