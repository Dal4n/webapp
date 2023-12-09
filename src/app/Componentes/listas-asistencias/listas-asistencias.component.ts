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
  grupo: any[] = [];
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
      "Fecha",
      "Hora Inicio",
      "Hora Termino",
      "Materia",
      "Grupo",
      "Horario"
    ]
  }

  getMateria(): void {
      this.service.parUrlApi = "http://localhost:8083/api/materia/getMateria/"+ this.datos[0].idMateria;
  
      this.service.obtenerDatos().subscribe(res => {
        this.materia = res;
        console.log("MATERIA");
        console.log(res);
      });
    
  }
  

  getGrupo(): void {
    this.service.parUrlApi = "http://localhost:8083/api/grupo/getGrupo/"+ this.datos[0].idGrupo;
    this.service.obtenerDatos().subscribe(res => {
      this.grupo = res
      console.log("GRUPOS");
      console.log(res);
    });
  }


  getHorario(): void {
    this.service.parUrlApi = "http://localhost:8083/api/horario/getHorario/"+ this.datos[0].idHorario;
    this.service.obtenerDatos().subscribe(res => {
      this.horario = res
      console.log("HORARIOS");
      console.log(res);
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
      this.getMateria();
      this.getGrupo();
      this.getHorario();
      console.log("DATOS TERMINO");
      console.log(this.datos);
      
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


