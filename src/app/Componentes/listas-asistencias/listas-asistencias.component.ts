import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ListaAsistenciaDTO, Periodo } from 'src/app/models/modelos';
import { ServiciosService } from 'src/app/services/servicios.service';
import { FormsModule } from '@angular/forms';
import { Observable, forkJoin } from 'rxjs';
import { DataService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-listas-asistencias',
  templateUrl: './listas-asistencias.component.html',
  styleUrls: ['./listas-asistencias.component.css']
})
export class ListasAsistenciasComponent implements OnInit {
<<<<<<< HEAD
  txtBuscarAlumno: string = "";

=======
  txtBuscar: string = "";
  txtHoraClase: string = "";
>>>>>>> 0957ddf (Se realizó la lista de asistencias y asistencias)
  listaSeleccionada: any = {};
  listaFiltrados: any[] = [];

  periodo: any[] = [];
  materia: any[] = [];
  horario: any[] = [];
  grupo: any[] = [];
  datos: any[] = [];
  headers: any[] = [];
<<<<<<< HEAD
  docente: any = {};
  tipoId = "";
  
  listaAsistencia: ListaAsistenciaDTO = {};
  
  @Input() idPeriodo: any;  
  
=======
  listaGrupos: any[] = [];
  filas: any[] = [];
  docente: any = {};
  nombre = "";
  @Input() idPeriodo: any;
  listaAsistencia: ListaAsistenciaDTO = {};


>>>>>>> 0957ddf (Se realizó la lista de asistencias y asistencias)
  constructor(
    private router: Router,
    private service: ServiciosService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
<<<<<<< HEAD

    this.getPeriodo().subscribe(res => {
      this.periodo = res;
      console.log(this.periodo);
    });

=======
    document.title = "Asistencias - Lista de materias";

    this.getPeriodo();
>>>>>>> 0957ddf (Se realizó la lista de asistencias y asistencias)
    this.tipoId = "periodo";

    this.filtrarListas();

    this.headers = [
      "Fecha",
      "Hora Inicio",
      "Hora Termino",
      "Materia",
      "Grupo"
    ]

    this.getStorage();
    this.nombre =  this.docente.content.persona.primerApellido + " " + this.docente.content.persona.segundoApellido + " " + this.docente.content.persona.nombre;

    this.filtrarListas();
  }

  getMateria(idMateria: string): Observable<any> {
    this.service.parUrlApi = "http://localhost:8083/api/materia/getMateria/" + idMateria;
    return this.service.obtenerDatos();
  }

<<<<<<< HEAD
  getHorario(): void {
    this.service.parUrlApi = "http://localhost:8083/api/horario/getHorario/"+ this.datos[0].idHorario;
    this.service.obtenerDatos().subscribe(res => {
      this.horario = res
      console.log("HORARIOS");
      console.log(res);
    });
  }

  getPeriodo(): Observable<any> {
    this.service.parUrlApi = "http://localhost:8083/api/periodo/getAll";
    return this.service.obtenerDatos();              
  }

  getListas(): void {

    const storedData = localStorage.getItem('user');

    if (storedData) {
      this.docente = JSON.parse(storedData);
    }

    this.service.parUrlApi = "http://localhost:8085/api/listaAsistencia/getListaAsistencias/" + this.lista.user.nombreUser + "/" + this.idPeriodo;

=======
  getGrupo(idGrupo: string): Observable<any> {
    this.service.parUrlApi = "http://localhost:8083/api/grupo/getGrupo/" + idGrupo;
    return this.service.obtenerDatos();
  }

  getHorario(idHorario: string): Observable<any> {
    this.service.parUrlApi = "http://localhost:8083/api/horario/getHorario/" + idHorario;
    return this.service.obtenerDatos();
  }

  getDatos(): void {
    this.getStorage();

    this.service.parUrlApi = "http://localhost:8085/api/listaAsistencia/getListaAsistencias/" + this.docente.user.nombreUser + "/" + this.idPeriodo;
>>>>>>> 0957ddf (Se realizó la lista de asistencias y asistencias)

    this.service.obtenerDatos().subscribe(res => {
      this.datos = res;

      this.datos.forEach((dato,index)=>{
        forkJoin({
          materia: this.getMateria(dato.idMateria),
          grupo: this.getGrupo(dato.idGrupo),
          horario: this.getHorario(dato.idHorario),
          
        }).subscribe(result => {
          this.materia = result.materia;
          this.grupo = result.grupo;
          this.horario = result.horario;
         
          this.filas.push({ "materia": this.materia, "grupo": this.grupo, "horario":this.horario,"fechas":[dato.fechaInicio,dato.fechaFin] });
        });
      });
      

    });
  }


  getStorage(): any {
    const storedData = localStorage.getItem('user');
    if (storedData) {
      this.docente = JSON.parse(storedData);
    }
  }

  obtenerValor(event: any): void {
    this.idPeriodo = event;
    this.getDatos();
    this.filas = [];
  }

  

  volver(): void {
    this.router.navigate(['/dashboard/inicio']);
  }

  filtrarListas(): any[] {
    this.listaFiltrados = this.filas.filter((dato) =>
      dato.materia.nombre.toLowerCase().includes(this.txtBuscar.toLowerCase()) ||
      dato.grupo.nombre.toLowerCase().includes(this.txtBuscar.toLowerCase()) ||
      dato.horario.diaSemana.toLowerCase().includes(this.txtBuscar.toLowerCase()) ||
      dato.horario.horaInicio.toLowerCase().includes(this.txtBuscar.toLowerCase()) ||
      dato.horario.horaFin.toLowerCase().includes(this.txtBuscar.toLowerCase())
    );
    return this.listaFiltrados;
  }

  fecha(): void {
  }

  opciones: any = {};

  seleccionar(selectedRow: any): void{
    console.log(selectedRow);
    this.dataService.setSelectedRow(selectedRow);
    this.router.navigate(['/dashboard/asistencias'])
  }

}