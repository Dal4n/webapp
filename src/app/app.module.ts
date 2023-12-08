import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './Componentes/login/login.component';
import { SidenavComponent } from './Componentes/sidenav/sidenav.component';
import { DashboardComponent } from './Componentes/dashboard/dashboard.component';
import { BodyComponent } from './Componentes/body/body.component';
import { NotfoundComponent } from './Componentes/notfound/notfound.component'
import { TooltipModule } from 'primeng/tooltip';
import { AsistenciasComponent } from './Componentes/asistencias/asistencias.component';
import { JustificacionComponent } from './Componentes/justificacion/justificacion.component';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { ReporteComponent } from './Componentes/reporte/reporte.component';
import { GrupoComponent } from './Componentes/grupo/grupo.component';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidenavComponent,
    DashboardComponent,
    BodyComponent,
    NotfoundComponent,
    AsistenciasComponent,
    JustificacionComponent,
    ReporteComponent,
    GrupoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PasswordModule,
    InputTextModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TooltipModule,
    CalendarModule,
    TableModule,
    DropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
