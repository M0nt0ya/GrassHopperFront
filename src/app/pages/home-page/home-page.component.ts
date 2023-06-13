import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PostRequest } from 'src/app/payloads/request/post';
import { PostResponse } from 'src/app/payloads/response/post';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home-page', // Selector para usar el componente en el HTML como <app-home-page></app-home-page>
  templateUrl: './home-page.component.html', // Ruta del archivo de plantilla del componente
  styleUrls: ['./home-page.component.css'] // Ruta del archivo de estilos del componente
})
export class HomePageComponent implements OnInit {

  navigationSubscription;
  newTweetForm: FormGroup; // FormGroup para el formulario de nuevo tweet
  payload: PostRequest; // Objeto de solicitud para el nuevo tweet
  tweets: Array<PostResponse>; // Array para almacenar los tweets
  username: string; // Nombre de usuario actual

  constructor(
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private postService: PostService,
    private router: Router,
    private authService: AuthService) {

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

    this.username = this.authService.getUsername();
    // Obtiene el nombre de usuario actual del servicio AuthService

    this.newTweetForm = new FormGroup({
      text: new FormControl("", Validators.required)
    });
    // Inicializa el FormGroup para el formulario de nuevo tweet con un FormControl para el texto del tweet y una validación requerida

    this.tweets = new Array();
    // Inicializa el array de tweets vacío

    this.payload = {
      text: "",
      type: ""
    };
    // Inicializa el objeto de solicitud para el nuevo tweet con propiedades de texto y tipo vacías
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params["signedIn"] !== undefined && params["signedIn"] === "true") {
        this.toastr.success("Sign In Successful");
      }
    });
    // Suscribe a los parámetros de consulta de la ruta activada
    // Si existe el parámetro "signedIn" con el valor "true", muestra un mensaje de éxito usando ToastrService

    this.fetchTweets();
    // Llama al método para obtener los tweets
  }

  fetchTweets() {
    const self = this;
    this.postService.getAll().subscribe({
      next(data) {
        self.tweets = data;
      }
    });
    // Obtiene todos los tweets llamando al método getAll del servicio postService
    // Suscribe a la respuesta y asigna los tweets al array de tweets
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
  // Método del ciclo de vida que se ejecuta antes de destruir el componente

  tweet() {
    this.payload.text = this.newTweetForm.get("text")?.value;
    this.payload.type = "TWEET";
    const self = this;
    this.postService.tweet(this.payload).subscribe({
      next(response) {
        console.log(response);
        self.newTweetForm.reset();
        self.router.navigateByUrl("home");
      },
      complete() { },
      error(error) {
        console.log(error);
      }
    });
    // Obtiene el texto del nuevo tweet del formulario
    // Asigna el texto y el tipo al objeto de solicitud
    // Llama al método tweet del servicio postService para crear un nuevo tweet
    // Suscribe a la respuesta y realiza acciones en función de la respuesta (por ejemplo, restablece el formulario y navega a la página de inicio)
  }
}
