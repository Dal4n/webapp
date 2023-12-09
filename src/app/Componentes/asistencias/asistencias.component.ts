import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { retry } from 'rxjs';
import { ListaAsistenciaDTO } from 'src/app/models/modelos';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.component.html',
  styleUrls: ['./asistencias.component.css']
})

export class AsistenciasComponent implements OnInit {
  txtBuscarAlumno: string = "";
  txtHoraClase: string = "";
  datePeriodo: any = "";
  dateSemana: any = "";
  dateHoraClase: any = "";
  alumnoSeleccionado: any = {};
  alumnosFiltrados: any[] = [];

  data: any[] = [];
  dates: any[] = [];
  alumnos: any[] = [];
  vacaciones: any[] = [];
  parciales: any[] = [];
  periodo: any[] = [];
  feriados: any[] = [];
  materia: any[] = [];

  listaAsistencia: ListaAsistenciaDTO = {};

  //@Output() lista: EventEmitter<any> = new EventEmitter<any>();
  @Input() lista: any = null;

  opcionesAsistencia: any[] = [
    { label: 'Asistió', value: 'A' },
    { label: 'Faltó', value: 'F' },
    { label: 'Retardo', value: 'R' }
  ];

  constructor(
    private router: Router,
    private service: ServiciosService
  ){}

  ngOnInit(): void {

    this.getPeriodo();

    this.getAlumnos();

    this.getVacaciones();
    
    this.getParciales();

    this.getFeriados();

    this.getMateria();

    this.dates = this.generarFechas(new Date('2023-01-01'), new Date('2023-02-15'), [new Date('2023-01-01'), new Date('2023-02-15'), new Date('2023-03-30')]);

    const storedData = localStorage.getItem('user');

    if (storedData) {
      this.lista = JSON.parse(storedData);
    }

    this.service.parUrlApi = "http://localhost:8080/api/listaAsistencia/getListaAsistencias/" + this.lista.matricula  + "/" + 

    // this.service.enviarDatosPost().subscribe(res => {

    // });

    this.filtrarAlumnos();
    this.tituloIdentificador();    

  }

  getPeriodo(): void {
    this.service.parUrlApi = "http://localhost:8083/api/periodo/getAll";
    this.service.obtenerDatos().subscribe(res => {
      this.periodo = res
      console.log(res);
    });
  }

  getVacaciones(): void {
    this.service.parUrlApi = "http://localhost:8083/api/vacacion/getVacacion/"+ "1";
    this.service.obtenerDatos().subscribe(res => {
      this.vacaciones = res
    });
  }

  getFeriados(): void {
    this.service.parUrlApi = "http://localhost:8083/api/feriado/getFeriado/"+ "1";
    this.service.obtenerDatos().subscribe(res => {
      this.feriados = res
    });
  }

  getMateria(): void {
    this.service.parUrlApi = "http://localhost:8083/api/materia/getMateria/"+ "1";
    this.service.obtenerDatos().subscribe(res => {
      this.materia = res
    });
  }
  
  
  getParciales(): void {
    this.service.parUrlApi = "http://localhost:8083/api/parcial/getParcial/"+ "1";
    this.service.obtenerDatos().subscribe(res => {
      this.parciales = res
    });
  }

  getAlumnos(): void {
    this.service.parUrlApi = "http://localhost:8082/api/alumno/getAlumnosGrupo/" + "1";
    this.service.obtenerDatos().subscribe(res => {
      this.alumnos = res;
    });
  }

  tituloIdentificador(): void{
    document.title = "Asistencias";
  }

  volver(): void{
    console.log("volviste");
    this.router.navigate(['/dashboard/inicio']);
  }

  filtrarAlumnos(): void {
    this.alumnosFiltrados = this.alumnos.filter(alumnos =>
      alumnos.nombre.toLowerCase().includes(this.txtBuscarAlumno.toLowerCase())
    );
  }

  fecha(): void {
    console.log(this.txtBuscarAlumno);
  }

  opciones: any = {};

  formatearFecha(fecha: Date): string {
    this.opciones = {year: "numeric", moth: "2-digit", day: "2-digit"};

    return fecha.toLocaleDateString('es-MX', this.opciones);    
  }

  generarFechas(fechaInicio: Date, fechaFin: Date, fechasExluir: Date[] = []): string[] {

    const fechasGeneradas: string[] = []

    const fechaActual = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    while(fechaActual <= fin){
      fechasGeneradas.push(this.formatearFecha(fechaActual));
      fechaActual.setDate(fechaActual.getDate() + 1);
    }

    return fechasGeneradas.filter(f => !fechasExluir.includes(new Date(f)));

  }
}

