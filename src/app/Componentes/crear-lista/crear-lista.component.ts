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
  nombreDocenteCompleto = "";
  opcionesDocentes: any[] = [];
  docenteSeleccionado: any;
  opcionesAlumnos: any[] = [];
  fechaCuatrimestre: any[] = [];
  fechaCuatrimestreSeleccionada: any;
  inicioVacaciones: any[] = [];
  opcionesPeriodo: any[] = [];
  periodoSeleccionado: any;
  finVacaciones: any[] = [];
  diasClases: any[] = [{
    "label": "Lunes",
    "value": "Lunes"
  }, {
    "label": "Martes",
    "value": "Martes"
  }, {
    "label": "Miercoles",
    "value": "Miercoles",
  }, {
    "label": "Jueves",
    "value": "Jueves"
  }, {
    "label": "Viernes",
    "value": "Viernes"
  }, {
    "label": "Sabado",
    "value": "Sabado"
  }];
  diasClasesSeleccionado: any;
  horarioClase: any[] = [];
  opcionesMaterias: any[] = [];
  materiaSeleccionada: any;
  opcionesGrupos: any[] = [];
  grupoSeleccionado: any;
  horarioClaseSeleccionada: any[] = [];
  horaClase: Date[] = [];
  diasInhabilesSeleccionado: any;
  horasInicio: { [key: string]: any } = {};
  horasFin: { [key: string]: any } = {};
  
  volver(): void {
    console.log("volviste");
    this.router.navigate(['/dashboard/inicio']);
  }

  filtrarAlumnos(): void {

  }

  ngOnInit(): void {
    this.getMateria();
    this.getDocentes();
    this.getGrupos();
    this.getPeriodos();
  }

  getMateria(): any {
    this.service.parUrlApi = "http://localhost:8083/api/materia/getAll";
    return this.service.obtenerDatos().subscribe(res =>{
      this.opcionesMaterias = res;
    });
  }

  getDocentes(): any {
    this.service.parUrlApi = "http://localhost:8082/api/docente/getAll";
    return this.service.obtenerDatos().subscribe(res =>{
      this.opcionesDocentes = res;
    });
  }

  getGrupos(): any {
    this.service.parUrlApi = "http://localhost:8083/api/grupo/getAll";
    return this.service.obtenerDatos().subscribe(res =>{
      this.opcionesGrupos = res;
    });
  }

  getPeriodos(): any {
    this.service.parUrlApi = "http://localhost:8083/api/periodo/getAll";
    return this.service.obtenerDatos().subscribe(res =>{
      this.opcionesPeriodo = res;
    });
  }

  guardarLista(): any {
    // console.log(this.materiaSeleccionada.idMateria);
    // console.log(this.docenteSeleccionado);
    // console.log(this.grupoSeleccionado);
    // console.log(this.diasInhabilesSeleccionado);
    // console.log(this.horarioClaseSeleccionada);
    // console.log(this.fechaCuatrimestreSeleccionada);
       console.log(this.convertirObjetoATipoTime(this.horasInicio));
    // console.log(this.convertirObjetoATipoTime(this.horasFin));
    //console.log(this.diasClasesSeleccionado);

    
    for (let index = 0; index < this.diasClasesSeleccionado.length; index++) {
      console.log("FOR");
      console.log(this.materiaSeleccionada.idMateria);
      console.log(this.grupoSeleccionado.idGrupo);
      console.log(this.periodoSeleccionado.idPeriodo);
      
      // Corrigiendo el error de sintaxis y asignando valores a las propiedades
      let horario = {
        "diaSemana": this.diasClasesSeleccionado[index].value,
        "horaInicio": "valor_de_inicio",
        "horaFin": "valor_de_fin",
        "idMateria": this.materiaSeleccionada.idMateria,
        "idGrupo": this.grupoSeleccionado.idGrupo,
        "idPeriodo": this.periodoSeleccionado.idPeriodo,
      };
    
      // Puedes hacer algo con el objeto horario, por ejemplo, imprimirlo
      console.log(horario);
    

   }
   
   

    
  }


  convertirObjetoATipoTime(objetoFecha: any ): any {
    const resultado: { [key: string]: string } = {};

    // Iterar sobre las claves del objeto original
    for (const dia in objetoFecha) {
      if (objetoFecha.hasOwnProperty(dia)) {
        const fechaOriginal = objetoFecha[dia];
        const horaFormateada = this.formatoHora(fechaOriginal);
        objetoFecha[dia] = horaFormateada;
      }
    }

    return resultado;
  }

  formatoHora(fecha: Date): string {
    const horas = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    const segundos = fecha.getSeconds().toString().padStart(2, '0');

    return `${horas}:${minutos}:${segundos}`;
  }
  
  
  
}
