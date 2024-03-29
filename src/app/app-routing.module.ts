import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Componentes/login/login.component';
import { DashboardComponent } from './Componentes/dashboard/dashboard.component';
import { SidenavComponent } from './Componentes/sidenav/sidenav.component';
import { NotfoundComponent } from './Componentes/notfound/notfound.component';
import { AsistenciasComponent } from './Componentes/asistencias/asistencias.component';
import { JustificacionComponent } from './Componentes/justificacion/justificacion.component';
import { GrupoComponent } from './Componentes/grupo/grupo.component';
import { ReporteComponent } from './Componentes/reporte/reporte.component';
import { InicioComponent } from './Componentes/inicio/inicio.component';
import { authGuard } from './auth.guard';
import { ListasAsistenciasComponent } from './Componentes/listas-asistencias/listas-asistencias.component';
import { CrearListaComponent } from './Componentes/crear-lista/crear-lista.component';

const routes: Routes = [

  {path:"login", component: LoginComponent},
  {
    path:"dashboard", 
    component: DashboardComponent,
    children: [
      {path:"inicio", component: InicioComponent},
      {path:"notFound", component: NotfoundComponent},
      {path:"asistencias", component: AsistenciasComponent},
      {path:"reportes", component: ReporteComponent},
      {path:"justificacion", component: JustificacionComponent},
      {path:"grupo", component: GrupoComponent},
      {path:"listaAsistencias", component: ListasAsistenciasComponent},
      {path:"crearLista", component: CrearListaComponent}

    ],
    canActivate: [authGuard]

  },
  {path:"**", redirectTo: '/login', pathMatch: 'full'},
  
  //{path:"**", component: NotfoundComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
