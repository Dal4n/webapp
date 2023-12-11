import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authenticationservice.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  user: any;

  constructor(private router: Router, private authService: AuthenticationService){}

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

    this.getStorage();
    

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
      h2Element.innerHTML = `${mensaje}, <span>${this.user.content.persona.primerApellido + " " + this.user.content.persona.segundoApellido + " " + this.user.content.persona.nombre}</span>`;
    }
  }

  getStorage(): any {
    const storedData = localStorage.getItem('user');
    if (storedData) {
      this.user = JSON.parse(storedData);
    }
  }

  irA(btn: String): void{
    if (btn != "out") {
      this.router.navigate(['/dashboard/' + btn]);
    } else {      
      this.authService.setLoggedIn(true);
      localStorage.clear();
    }
  }

}
