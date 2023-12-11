import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, forkJoin, retry } from 'rxjs';
import { ListaAsistenciaDTO } from 'src/app/models/modelos';
import { DataService } from 'src/app/services/data-service.service';
import { ServiciosService } from 'src/app/services/servicios.service';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Swal from 'sweetalert2';

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
  inicioSemana: any[] = [];
  finSemana: any[] = [];
  nombreGrupo = "";

  opcionesPeriodo: any[] = [
    {
      "label":"Primer Parcial", "value": "1",
    },{
      "label":"Segundo Parcial", "value": "1",
    },{
      "label":"Tercel Parcial", "value": "1",
    }
    ];
  periodoSeleccionado: any[] = [];

  filas: any[] = [];
  data: any[] = [];
  dates: any[] = [];
  alumnos: any[] = [];
  vacaciones: any[] = [];
  parciales: any[] = [];
  periodo: any[] = [];
  feriados: any[] = [];
  materia: any[] = [];
  listaAsistencia: any = {};
  docente: any = null;
  opciones: any = {};
  fechasExcluidas: any[] = [];

  opcionesAsistencia: any[] = [
    { label: 'Asignar...', value: '' },
    { label: 'Asistió', value: 'A' },
    { label: 'Faltó', value: 'F' },
    { label: 'Retardo', value: 'R' }
  ];

  constructor(
    private router: Router,
    private service: ServiciosService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    document.title = "Asistencias - Tomar Asistencia";
    this.dataService.selectRow$.subscribe(res => {
      console.log(res);
      this.listaAsistencia = res;
    });
    this.getPeriodo().subscribe(res => {
      console.log("PERIODO");
      console.log(res);
    });

    

    // this.getMateria();

    this.getStorage();

    this.nombreGrupo = this.listaAsistencia.grupo.nombre;

    this.service.parUrlApi = "http://localhost:8080/api/listaAsistencia/getListaAsistencias/" + this.docente.matricula + "/" +

      // this.service.enviarDatosPost().subscribe(res => {

      // });

      this.filtrarAlumnos();
    forkJoin({
      alumnos: this.getAlumnos(),
    }).subscribe(result => {
        this.alumnos = result.alumnos;
    });

    forkJoin({
      feriados: this.getFeriados(),
      vacaciones: this.getVacaciones(),
    }).subscribe(result => {
      this.feriados = result.feriados;
      this.vacaciones = result.vacaciones;
      console.log("FERIADOS");
      console.log(this.feriados);

      this.feriados.map(fecha => {
        fecha.fecha = new Date(fecha.fecha);
        this.fechasExcluidas.push(fecha.fecha);
      })

      this.vacaciones.map(vacacion => {
        vacacion.fechaInicio = new Date(vacacion.fechaInicio);
        vacacion.fechaFin = new Date(vacacion.fechaFin);
        this.extraerFechasVacaciones(vacacion.fechaInicio, vacacion.fechaFin);
      })
    });
    
    this.dates = this.generarFechas(new Date(this.listaAsistencia.fechas[0]), new Date(this.listaAsistencia.fechas[1]), this.fechasExcluidas);

  }

  extraerFechasVacaciones(fechaInicio : "", fechaFin : ""): any {
    const fechaInicioD = new Date(fechaInicio); // Reemplaza con tu fecha de inicio
    const fechaFinD = new Date(fechaFin);   // Reemplaza con tu fecha de fin


    let fechaActual = new Date(fechaInicio);  // Inicializamos fechaActual con la fecha de inicio

    while (fechaActual <= fechaFinD) {
      this.fechasExcluidas.push(new Date(fechaActual));
      fechaActual.setDate(fechaActual.getDate() + 1);
    }
    console.log(this.fechasExcluidas);
  }

  getStorage(): any {
    const storedData = localStorage.getItem('user');
    if (storedData) {
      this.docente = JSON.parse(storedData);
    }
  }

  getPeriodo(): Observable<any> {
    this.service.parUrlApi = "http://localhost:8083/api/periodo/getPeriodo/" + this.listaAsistencia.horario.idHorario;
    return this.service.obtenerDatos();
  }

  getVacaciones(): Observable<any> {
    this.service.parUrlApi = "http://localhost:8083/api/vacacion/getVacacion/" + this.listaAsistencia.horario.idHorario;
    return this.service.obtenerDatos();
  }

  getFeriados(): Observable<any> {
    this.service.parUrlApi = "http://localhost:8083/api/feriado/getFeriado/" + this.listaAsistencia.horario.idHorario;
    return this.service.obtenerDatos();
  }

  getMateria(idMateria: string): Observable<any> {
    this.service.parUrlApi = "http://localhost:8083/api/materia/getMateria/" + this.listaAsistencia.materia.idMateria;
    return this.service.obtenerDatos();
  }

  getHorario(): Observable<any> {
    this.service.parUrlApi = "http://localhost:8083/api/horario/getHorario/" + this.listaAsistencia.horario.idHorario;
    return this.service.obtenerDatos();
  }

  getParciales(): Observable<any> {
    this.service.parUrlApi = "http://localhost:8083/api/parcial/getParcial/" + this.listaAsistencia.horario.idPeriodo;
    return this.service.obtenerDatos();
  }

  getAlumnos(): Observable<any> {
    this.service.parUrlApi = "http://localhost:8082/api/alumno/getAlumnosGrupo/" + this.listaAsistencia.grupo.idGrupo;
    return this.service.obtenerDatos();
  }


  volver(): void {
    console.log("volviste");
    this.router.navigate(['/dashboard/listaAsistencias']);
  }

  filtrarAlumnos(): any[] {
    this.alumnosFiltrados = this.alumnos.filter((dato) =>
      dato.persona.nombre.toLowerCase().includes(this.txtBuscarAlumno.toLowerCase())
    );
    return this.alumnosFiltrados;
  }

  fecha(): void {
    console.log(this.txtBuscarAlumno);
  }

  formatearFecha(fecha: Date): string {
    return format(fecha, 'dd/MM/yyyy', { locale: es });
  }

  generarFechas(fechaInicio: Date, fechaFin: Date, fechasExcluir: Date[] = []): string[] {
    const fechasGeneradas: string[] = [];
    
    const fechaActual = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    while (fechaActual <= fin) {
      fechasGeneradas.push(this.formatearFecha(fechaActual));
      fechaActual.setDate(fechaActual.getDate() + 1);
    }
  
    return fechasGeneradas.filter(f => !fechasExcluir.includes(new Date(f)));
  }

  guardarLista():void{
    this.router.navigate(['/dashboard/listaAsistencias']);
      Swal.fire('Guardado!', 'Se han guardado sus asistencias correctamente.', 'success');
  }
  
}

