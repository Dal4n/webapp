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

  @Input() set data(value: any[]){     
    this.getGenearItems(value);
  };

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
