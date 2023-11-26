import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../services/servicios.service';
import { Usuarios } from '../../models/modelos'
import { Alumno } from '../../models/modelos';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: String = "";
  password: String = "";

  datos: any = {
    "id": 1,
    "user": "Diego",
    "password": "1234",
    "rol": "Admin"
  };

  alumno: Alumno = {id: 1, nombre: "Diego"};
  us: Usuarios = {};

  constructor(private service: ServiciosService){}

  ngOnInit(){
    this.service.parUrlApi = "http://localhost:8081/api/usuario/login"
  }

  eveIngresar(){

    this.service.enviarDatosPost(this.datos).subscribe(res=>{
      this.us = res;

      console.log(this.us);
    });

    console.log("User", this.user," Pass: ", this.password, this.alumno, this.us);
  }


}
