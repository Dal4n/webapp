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

const routes: Routes = [

  {path:"login", component: LoginComponent},
  {
    path:"dashboard", 
    component: DashboardComponent,
    children: [
      {path:"notFound", component: NotfoundComponent},
      {path:"asistencias", component: AsistenciasComponent},
      {path:"reportes", component: ReporteComponent},
      {path:"justificacion", component: JustificacionComponent},
      {path:"grupo", component: GrupoComponent}

    ]

  },
  {path:"", redirectTo: '/login', pathMatch: 'full'},
  
  //{path:"**", component: NotfoundComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
