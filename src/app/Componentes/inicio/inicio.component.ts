import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  ngOnInit(){
    this.tituloIdentificador();
    this.bienvenida();
  }

  tituloIdentificador(): void{
    document.title = "Inicio";
  }
  bienvenida(): void {
    const fechaActual = new Date();
    const hora = fechaActual.getHours();

    let mensaje: string;

    if (hora >= 5 && hora < 12) {
      mensaje = 'Buenos días';
    } else if (hora >= 12 && hora < 18) {
      mensaje = 'Buenas tardes';
    } else {
      mensaje = 'Buenas noches';
    }
    // Obtener el elemento h2 del DOM
    const h2Element = document.getElementById('mensajeBienvenida');

    if (h2Element) {
      // Actualizar el contenido del h2
      h2Element.innerHTML = `${mensaje}, <span>{$user}</span>`;
    }
  }

}
