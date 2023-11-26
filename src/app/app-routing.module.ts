import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Componentes/login/login.component';
import { DashboardComponent } from './Componentes/dashboard/dashboard.component';
import { SidenavComponent } from './Componentes/sidenav/sidenav.component';
import { NotfoundComponent } from './Componentes/notfound/notfound.component';

const routes: Routes = [

  {path:"login", component: LoginComponent},
  {
    path:"dashboard", 
    component: DashboardComponent,
    children: [
      {path:"notFound", component: NotfoundComponent}
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
