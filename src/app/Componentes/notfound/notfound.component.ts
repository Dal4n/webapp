import { Component } from '@angular/core';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent {
  ngOnInit(): void {
    this.tituloIdentificador();
  }

  tituloIdentificador(): void{
    document.title = "No se encontró";
  }
}
