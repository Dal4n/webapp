import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  parUrlApi: string = "";

  constructor(private http: HttpClient) { }

  // Método para enviar datos por una solicitud POST
  enviarDatosPost(datos: any): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.parUrlApi, datos);
  }

  // Método para enviar datos por una solicitud GET
  enviarDatosGet(parametros?: any): Observable<any> {

    let params = new HttpParams();

    if (parametros) {
      Object.keys(parametros).forEach(key => {
        params = params.set(key, parametros[key]);
      });
    }

    return this.http.get(this.parUrlApi, { params: params });
  }

  // Método para realizar una solicitud GET
  obtenerDatos(): Observable<any> {
    return this.http.get(this.parUrlApi);
  }

  // Método para actualizar datos por método PUT
  actualizarDatos(datos: any): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.put(this.parUrlApi, datos, { headers: headers });
  }

  // Método para eliminar datos por método DELETE
  eliminarDatos(id: number): Observable<any> {
    const URL = this.parUrlApi + id;
    return this.http.delete(URL);
  }

}
