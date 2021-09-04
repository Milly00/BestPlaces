import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostulacionService {

  baseUrl: string = "http://localhost:3000/send-email";

  constructor(private http: HttpClient) { }

  Enviar(usuario: string, nombresitio: string, email: string): Observable<any> {
    const URL = "http://localhost:3000/send-email";
    const body = { email, usuario, nombresitio };
    //console.log( body, URL);
    return this.http.post(URL, body);
    /**
     * .pipe(
        tap(response => {
          console.log(response);
          
        }),
        map(res => res),// si el status es exitoso, se envia un booleano true
        catchError(e => of(e.error.msg))  // si el status es fallido se envia el mensaje recibido por back
      );
     */

  }
}
