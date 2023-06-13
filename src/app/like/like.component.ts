import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { LikeService } from '../services/like.service';
import { SingleAction } from '../single-action';

@Component({
  selector: 'app-like', // Selector para usar el componente en el HTML como <app-like></app-like>
  templateUrl: './like.component.html', // Ruta del archivo de plantilla del componente
  styleUrls: ['./like.component.css'] // Ruta del archivo de estilos del componente
})
export class LikeComponent extends SingleAction implements OnInit {
  
  constructor(private likeService: LikeService, private router: Router) { 
    super(); // Llama al constructor de la clase padre SingleAction
    this.faIcon = faHeart; // Asigna el ícono regular faHeart a la propiedad faIcon
    this.faSolidIcon = faSolidHeart; // Asigna el ícono sólido faHeart a la propiedad faSolidIcon
  }

  ngOnInit(): void {
    this.likeService.isLiked(this.tweet.id).subscribe(response => this.isActive = response);
    // Llama al método isLiked del servicio likeService con el id del tweet
    // Suscribe a la respuesta del método, y cuando se reciba la respuesta, asigna el valor a la propiedad isActive
  }

  like() {
    const self = this; // Guarda una referencia al componente en la variable self
    this.likeService.like(this.tweet.id).subscribe({
      complete() {
        self.likeService.getLikeCounter(self.tweet.id).subscribe(likeCounter => self.tweet.likeCounter = likeCounter);
        // Llama al método getLikeCounter del servicio likeService con el id del tweet
        // Suscribe a la respuesta del método y asigna el valor a la propiedad likeCounter del tweet
        
        self.isActive = !self.isActive; // Invierte el valor de la propiedad isActive
        
        if (self.router.url == "/profile/likes") { // Si la ruta actual es "/profile/likes"
          console.log("URL : " + self.router.url);
          self.router.navigateByUrl(self.router.url); // Navega a la misma ruta actual
        }
      }
    });
    // Llama al método like del servicio likeService con el id del tweet
    // Suscribe al Observable devuelto y, cuando se complete, ejecuta una función
    // En la función, llama al método getLikeCounter del servicio likeService y asigna el valor a la propiedad likeCounter del tweet
    // Luego, invierte el valor de la propiedad isActive y, si la ruta actual es "/profile/likes", navega a la misma ruta actual
  }
}
