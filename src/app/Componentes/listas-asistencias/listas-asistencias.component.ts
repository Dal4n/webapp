import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ListaAsistenciaDTO, Periodo } from 'src/app/models/modelos';
import { ServiciosService } from 'src/app/services/servicios.service';
import { FormsModule } from '@angular/forms';
import { DataService } from 'src/app/services/data-service.service';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-listas-asistencias',
  templateUrl: './listas-asistencias.component.html',
  styleUrls: ['./listas-asistencias.component.css']
})
export class ListasAsistenciasComponent implements OnInit {
  txtBuscar: string = "";
  txtHoraClase: string = "";
  listaSeleccionada: any = {};
  listaFiltrados: any[] = [];

  periodo: any[] = [];
  materia: any[] = [];
  horario: any[] = [];
  grupo: any[] = [];
  datos: any[] = [];
  headers: any[] = [];
  listaGrupos: any[] = [];
  filas: any[] = [];
  docente: any = {};
  nombre = "";
  @Input() idPeriodo: any;
  listaAsistencia: ListaAsistenciaDTO = {};


  constructor(
    private router: Router,
    private service: ServiciosService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    document.title = "Asistencias - Lista de materias";
    this.getPeriodo();

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

  getGrupo(idGrupo: string): Observable<any> {
    this.service.parUrlApi = "http://localhost:8083/api/grupo/getGrupo/" + idGrupo;
    return this.service.obtenerDatos();
  }

  getHorario(idHorario: string): Observable<any> {
    this.service.parUrlApi = "http://localhost:8083/api/horario/getHorario/" + idHorario;
    return this.service.obtenerDatos();
  }

  getPeriodo(): void {
    this.service.parUrlApi = "http://localhost:8083/api/periodo/getAll";
    this.service.obtenerDatos().subscribe(dato=>{
      this.periodo = dato;
      console.log(dato);
    });
  }

  getDatos(): void {
    this.getStorage();

    this.service.parUrlApi = "http://localhost:8085/api/listaAsistencia/getListaAsistencias/" + this.docente.user.nombreUser + "/" + this.idPeriodo;
    console.log(this.service.parUrlApi);
    this.service.obtenerDatos().subscribe(res => {
      this.datos = res;
      console.log("DATOS");
      console.log(this.datos);

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
          console.log(this.filas);
        
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