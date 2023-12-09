import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ListaAsistenciaDTO, Periodo } from 'src/app/models/modelos';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-listas-asistencias',
  templateUrl: './listas-asistencias.component.html',
  styleUrls: ['./listas-asistencias.component.css']
})
export class ListasAsistenciasComponent implements OnInit {
  txtBuscarAlumno: string = "";
  txtHoraClase: string = "";
  listaSeleccionada: any = {};
  listaFiltrados: any[] = [];

  periodo: any[] = [];
  materia: any[] = [];
  horario: any[] = [];
  datos: any[] = [];
  tipoId = "";
  headers: any[] = [];

  @Input() idPeriodo: any;

  listaAsistencia: ListaAsistenciaDTO = {};

  //@Output() lista: EventEmitter<any> = new EventEmitter<any>();
  lista: any = {};

  constructor(
    private router: Router,
    private service: ServiciosService
  ) { }

  ngOnInit(): void {
    this.getPeriodo();
    this.tipoId = "periodo";

    //this.filtrarListas();
    this.tituloIdentificador();


    this.headers = [
      "Fecha Inicio",
      "Fecha Final"
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

  getListas(): void {
    const storedData = localStorage.getItem('user');
    if (storedData) {
      this.lista = JSON.parse(storedData);
    }

    this.service.parUrlApi = "http://localhost:8085/api/listaAsistencia/getListaAsistencias/" + this.lista.user.nombreUser + "/" + this.idPeriodo;


    this.service.obtenerDatos().subscribe(res => {
      this.datos = res;
      console.log(res);
    });
  }

  obtenerValor(event: any): void {
    this.idPeriodo = event;
    this.getListas();
  }

  getPeriodo(): void {
    this.service.parUrlApi = "http://localhost:8083/api/periodo/getAll";
    this.service.obtenerDatos().subscribe(res => {
      this.periodo = res;
    });
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


