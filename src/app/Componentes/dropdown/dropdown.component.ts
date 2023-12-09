import { Component, OnInit } from '@angular/core';
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

  constructor(private service: ServiciosService){}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void{

    this.service.parUrlApi = "";

    this.service.enviarDatosGet().subscribe(res =>{
      this.items = res.map((item: any) => ({label: item.nombre, value: item.id}));
    })
  }

  onValueChange(): void{
    if (this.selectedValue) {
      this.service.enviarDatosGet().subscribe(res =>{

      });    
    }
  }

}
