import { Component } from '@angular/core';

@Component({
  selector: 'app-justificacion',
  templateUrl: './justificacion.component.html',
  styleUrls: ['./justificacion.component.css']
})
export class JustificacionComponent {
  ngOnInit(): void {
    this.tituloIdentificador();
  }

  tituloIdentificador(): void{
    document.title = "Justificacion";
  }
}
