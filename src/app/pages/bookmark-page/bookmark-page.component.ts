import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { PostResponse } from 'src/app/payloads/response/post';
import { AuthService } from 'src/app/services/auth.service';
import { BookmarkService } from 'src/app/services/bookmark.service';

@Component({
  selector: 'app-bookmark-page', // Selector para usar el componente en el HTML como <app-bookmark-page></app-bookmark-page>
  templateUrl: './bookmark-page.component.html', // Ruta del archivo de plantilla del componente
  styleUrls: ['./bookmark-page.component.css'] // Ruta del archivo de estilos del componente
})
export class BookmarkPageComponent implements OnInit {

  tweets: Array<PostResponse>; // Array para almacenar los tweets
  navigationSubscription; // Variable para almacenar la suscripción al evento de navegación del Router

  constructor(private bookmarkService: BookmarkService, private authService: AuthService, private router: Router) {
    // Constructor del componente, inyecta las dependencias del BookmarkService, AuthService y Router
    this.tweets = new Array(); // Inicializa el array de tweets vacío

    this.bookmarkService.getBookmarks(this.authService.getUsername()).subscribe(bookmarks => this.tweets = bookmarks);
    // Obtiene los marcadores (bookmarks) del usuario actual mediante el servicio bookmarkService
    // Suscribe a la respuesta y asigna los marcadores al array de tweets

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    // Desactiva la reutilización de rutas en el enrutador

    this.navigationSubscription = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });
    // Suscribe al evento de navegación del enrutador
    // Si el evento es de tipo NavigationEnd, se reinicia la navegación del enrutador
  }

  ngOnInit(): void {
    // Método del ciclo de vida que se ejecuta al inicializar el componente
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
  // Método del ciclo de vida que se ejecuta antes de destruir el componente
  // Si existe una suscripción al evento de navegación, se cancela la suscripción para evitar fugas de memoria
}
