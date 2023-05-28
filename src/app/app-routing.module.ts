import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioPComponent } from './paginas/inicio-p/inicio-p.component';
import { RegistroComponent } from './paginas/autenticacion-p/registro/registro.component';
import { AccesoComponent } from './paginas/autenticacion-p/acceso/acceso.component';
import { AutenticacionPComponent } from './paginas/autenticacion-p/autenticacion-p.component';
import { PerfilPComponent } from './paginas/perfil-p/perfil-p.component';
import { GuardadoPComponent } from './paginas/guardado-p/guardado-p.component';

const routes: Routes = [
  {path : "" , component:AutenticacionPComponent},
  {path : "acceso" , component: AccesoComponent},
  {path : "registro" , component:RegistroComponent},
  {path : "inicio" , component:InicioPComponent},
  {path : "guardado" , component:GuardadoPComponent},
  {path : "perfil" , component:PerfilPComponent},

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


