import { Component } from '@angular/core';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent {
  ngOnInit(): void {
    this.tituloIdentificador();
  }

  tituloIdentificador(): void{
    document.title = "Reporte";
  }
}
