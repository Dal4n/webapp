import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ListaAsistenciaDTO, Periodo } from 'src/app/models/modelos';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-listas-asistencias',
  templateUrl: './listas-asistencias.component.html',
  styleUrls: ['./listas-asistencias.component.css']
})
export class ListasAsistenciasComponent implements OnInit {
  txtBuscarAlumno: string = "";

  listaSeleccionada: any = {};
  listaFiltrados: any[] = [];

  periodo: any[] = [];
  materia: any[] = [];
  horario: any[] = [];
  datos: any[] = [];
  headers: any[] = [];
  docente: any = {};
  tipoId = "";
  
  listaAsistencia: ListaAsistenciaDTO = {};
  
  @Input() idPeriodo: any;  
  
  constructor(
    private router: Router,
    private service: ServiciosService
  ) { }

  ngOnInit(): void {

    this.getPeriodo().subscribe(res => {
      this.periodo = res;
      console.log(this.periodo);
    });

    this.tipoId = "periodo";

    //this.filtrarListas();
    this.tituloIdentificador();

    this.headers = [
      "Fecha Inicio",
      "Fecha Final",

    ]
  }

  getMateria(): void {
    this.service.parUrlApi = "http://localhost:8083/api/materia/getMateria/"+ "1";
    this.service.obtenerDatos().subscribe(res => {
      this.materia = res
    });
  }

  getGrupo(): void {
    this.service.parUrlApi = "http://localhost:8083/api/materia/getMateria/"+ "1";
    this.service.obtenerDatos().subscribe(res => {
      this.materia = res
    });
  }

  getHorario(): void {
    this.service.parUrlApi = "http://localhost:8083/api/materia/getMateria/"+ "1";
    this.service.obtenerDatos().subscribe(res => {
      this.materia = res
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

    this.service.parUrlApi = "http://localhost:8085/api/listaAsistencia/getListaAsistencias/" + this.docente.user.nombreUser + "/" + this.idPeriodo;

    this.service.obtenerDatos().subscribe(res => {
      this.datos = res;
      console.log(res);
    });
  }

  obtenerValor(event: any): void {
    this.idPeriodo = event;
    this.getListas();
  }

  

  tituloIdentificador(): void {
    document.title = "Asistencias";
  }

  volver(): void {
    this.router.navigate(['/dashboard/inicio']);
  }

  // filtrarListas(): void {
  //   this.listaFiltrados = this.lista.filter((list:any) =>
  //     list.nombre.toLowerCase().includes(this.txtBuscarAlumno.toLowerCase())
  //   );
  //}

  fecha(): void {
  }

  opciones: any = {};


}


