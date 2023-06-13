import { Component, Input, OnInit } from '@angular/core';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as faSolidBookmark }  from '@fortawesome/free-solid-svg-icons';
import { BookmarkService } from '../services/bookmark.service';
import { Router } from '@angular/router';
import { SingleAction } from '../single-action';

@Component({
  selector: 'app-bookmark', // Selector para usar el componente en el HTML como <app-bookmark></app-bookmark>
  templateUrl: './bookmark.component.html', // Ruta del archivo de plantilla del componente
  styleUrls: ['./bookmark.component.css'] // Ruta del archivo de estilos del componente
})
export class BookmarkComponent extends SingleAction implements OnInit {
  
  constructor(private bookmarkService: BookmarkService, private router: Router) { 
    super(); // Llama al constructor de la clase padre SingleAction
    this.faIcon = faBookmark; // Asigna el ícono regular faBookmark a la propiedad faIcon
    this.faSolidIcon = faSolidBookmark; // Asigna el ícono sólido faBookmark a la propiedad faSolidIcon
  }

  ngOnInit(): void {
    this.bookmarkService.isBookmarked(this.tweet.id).subscribe(response => this.isActive = response);
    // Llama al método isBookmarked del servicio bookmarkService con el id del tweet
    // Suscribe a la respuesta del método, y cuando se reciba la respuesta, asigna el valor a la propiedad isActive
  }

  bookmark(){
    const self = this; // Guarda una referencia al componente en la variable self
    this.bookmarkService.bookmark(this.tweet.id).subscribe({complete(){
      self.isActive = !self.isActive; // Invierte el valor de la propiedad isActive
      if(self.router.url === "/bookmarks") // Si la ruta actual es "/bookmarks"
        self.router.navigateByUrl(self.router.url); // Navega a la misma ruta actual
    }});
    // Llama al método bookmark del servicio bookmarkService con el id del tweet
    // Suscribe al Observable devuelto, y cuando se complete, ejecuta una función
    // En la función, invierte el valor de la propiedad isActive y si la ruta actual es "/bookmarks", navega a la misma ruta actual
  }

}
