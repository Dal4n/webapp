import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data-service.service';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-crear-lista',
  templateUrl: './crear-lista.component.html',
  styleUrls: ['./crear-lista.component.css']
})
export class CrearListaComponent {
  constructor(
    private router: Router,
    private service: ServiciosService,
    private dataService: DataService
  ) { }

  txtBuscarAlumno = "";
  opcionesDocentes: any[] = [];
  opcionesAlumnos: any[] = [];
  fechaCuatrimestre: any[] = [];
  inicioVacaciones: any[] = [];
  finVacaciones: any[] = [];
  diasClases: any[] = [{
    "label": "Lunes",
    "value": 1
  }, {
    "label": "Martes",
    "value": 2
  }, {
    "label": "Miercoles",
    "value": 3
  }, {
    "label": "Jueves",
    "value": 4
  }, {
    "label": "Viernes",
    "value": 5
  }, {
    "label": "Sabado",
    "value": 6
  }];
  horarioClase: any[] = [];
  opcionesMaterias: any[] = [];
  opcionesGrupos: any[] = [];
  horarioClaseSeleccionada: any[] = [];
  horaClase: Date[] = [];
  
  volver(): void {
    console.log("volviste");
    this.router.navigate(['/dashboard/inicio']);
  }

  filtrarAlumnos(): void {

  }
}
