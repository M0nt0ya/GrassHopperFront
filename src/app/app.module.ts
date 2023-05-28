import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GuardadoComponent } from './guardado/guardado.component';
import { CorazonComponent } from './corazon/corazon.component';
import { NavegacionComponent } from './navegacion/navegacion.component';
import { GuardadoPComponent } from './paginas/guardado-p/guardado-p.component';
import { PerfilPComponent } from './paginas/perfil-p/perfil-p.component';
import { InicioPComponent } from './paginas/inicio-p/inicio-p.component';
import { AutenticacionPComponent } from './paginas/autenticacion-p/autenticacion-p.component';
import { RegistroComponent } from './paginas/autenticacion-p/registro/registro.component';
import { AccesoComponent } from './paginas/autenticacion-p/acceso/acceso.component';
import { MensajePComponent } from './paginas/mensaje-p/mensaje-p.component';
import { RespuestaComponent } from './respuesta/respuesta.component';
import { CompartirComponent } from './compartir/compartir.component';
import { MensajeComponent } from './mensaje/mensaje.component';

@NgModule({
  declarations: [
    AppComponent,
    GuardadoComponent,
    CorazonComponent,
    NavegacionComponent,
    GuardadoPComponent,
    PerfilPComponent,
    InicioPComponent,
    AutenticacionPComponent,
    RegistroComponent,
    AccesoComponent,
    MensajePComponent,
    RespuestaComponent,
    CompartirComponent,
    MensajeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
