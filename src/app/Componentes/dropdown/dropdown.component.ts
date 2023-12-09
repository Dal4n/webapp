import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
  items: SelectItem[] = [];
  selectedValue : any;
  datos : any[] = []; 
  hashId: any = {
    "periodo": "http://localhost:8083/api/periodo/getAll",
    "materia": "idMateria"
  };

  @Input() tipoId = "";
  @Output() value: EventEmitter<any> = new EventEmitter<any>();

  constructor(private service: ServiciosService){}

  ngOnInit(): void {
    this.getDatos();
  }

  getDatos(): void {
    this.service.parUrlApi = this.hashId[this.tipoId];
    this.service.obtenerDatos().subscribe(res => {
      this.datos = res
      this.items = this.datos.map((item: any) => ({label: item.nombre, value: item.idPeriodo}));
    });
  }

  onValueChange(): void{
    if (this.selectedValue) {
      this.value.emit(this.selectedValue); 
    }
  }

}
