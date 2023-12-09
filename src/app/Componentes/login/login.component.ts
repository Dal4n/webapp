import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../services/servicios.service';
import { Usuario } from '../../models/modelos'
import { Alumno } from '../../models/modelos';
import { AuthenticationService } from 'src/app/services/authenticationservice.service';
import { JsonpInterceptor } from '@angular/common/http';
import { JSDocComment } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: String = "";
  password: String = "";  
  us: Usuario = {};
  datos: any;

  constructor(
    private service: ServiciosService,
    private authService: AuthenticationService,
    private router: Router
  ){}

  ngOnInit(){
    this.service.parUrlApi = "http://localhost:8081/api/usuario/login"
    this.tituloIdentificador();
  }

  tituloIdentificador(): void{
    document.title = "Inicio de sesión";
  }  

  eveIngresar(){

    this.datos = {"user":this.user,"password":this.password};

    this.service.enviarDatosPost(this.datos).subscribe(res=>{
      if (res) {
        this.us = res;
        localStorage.setItem("user", JSON.stringify(this.us));
        this.authService.setLoggedIn(false);
        this.router.navigate(['/dashboard/inicio']);
      }

    });

    this.authService.setLoggedIn(true);


  }


}
