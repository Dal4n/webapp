import { Component, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.component.html',
  styleUrls: ['./asistencias.component.css']
})

export class AsistenciasComponent  {
  txtBuscarAlumno: string = "";
  txtHoraClase: string = "";
  datePeriodo: any = "";
  dateSemana: any = "";
  dateHoraClase: any = "";
  alumnoSeleccionado: any = {};
  alumnosFiltrados: any[] = [];

  ngOnInit(): void {
    this.filtrarAlumnos();
    this.tituloIdentificador();
  }

  tituloIdentificador(): void{
    document.title = "Asistencias";
  }

  volver(): void{
    console.log("volviste");
  }

  filtrarAlumnos(): void {
    this.alumnosFiltrados = this.alumno.filter(alumno =>
      alumno.nombre.toLowerCase().includes(this.txtBuscarAlumno.toLowerCase())
    );
  }

  // Resto de tu lógica

  alumno: any[] = [
    { code: 1, nombre: 'Alonso Landin Diego Guadalupe' },
    { code: 2, nombre: 'Martinez Castro Angel Roberto' },
    { code: 3, nombre: 'Morales Alcocer Pedro' }
  ];

  opcionesAsistencia: any[] = [
    { label: 'Asistió', value: 'A' },
    { label: 'Faltó', value: 'F' },
    { label: 'Retardo', value: 'R' },
    { label: 'Justificó', value: 'J' }
  ];
  

  fecha(): void {
    console.log(this.txtBuscarAlumno);
  }
}

