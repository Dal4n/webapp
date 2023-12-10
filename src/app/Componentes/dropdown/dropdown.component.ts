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
<<<<<<< HEAD
  datos : any[] = [];

  hashId: any = {
    "periodo": "http://localhost:8083/api/periodo/getAll",
    "materia": "idMateria"
  };

  @Input() tipoId = "";

  @Input() set data(value: any){
    console.log("PRUEBA DATA", value);
  };

=======

  @Input() set data(value: any[]){     
    this.getGenearItems(value);
  };

>>>>>>> 0957ddf (Se realizó la lista de asistencias y asistencias)
  @Output() value: EventEmitter<any> = new EventEmitter<any>();  

  constructor(){}

  ngOnInit(): void {}

  getGenearItems(datos: any[]): void{    
    this.items = datos.map((item: any) => {
      const idKey = Object.keys(item).find(key => key.toLowerCase().includes('id'));

      const idValue = idKey ? item[idKey] : null;

      return { label: item.nombre, value: idValue };
    });
  }

  onValueChange(): void{
    if (this.selectedValue) {
      this.value.emit(this.selectedValue); 
    }
  }
}
