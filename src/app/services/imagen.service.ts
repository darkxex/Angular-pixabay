import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  private $error = new Subject<string>();
  private terminoBusqueda$ = new Subject<string>();
  setError(mensaje: string){
    this.$error.next(mensaje);
  }

  getError():Observable<string>{
    return this.$error.asObservable();
  }
  constructor(private http: HttpClient) { }

  enviarTerminoBusqueda(termino: string){
    this.terminoBusqueda$.next(termino);
  }

  getTerminoBusqueda():Observable<string>{
    return this.terminoBusqueda$.asObservable();
  }

  getImagenes(termino: string, paginaActual: number, imagenesPorPagina: number):Observable<any>{
    const KEY = '48651060-ad95963d87a56154ee6c1711a';
    const URL = 'https://pixabay.com/api/?key=' + KEY+'&q=' + termino.replace(' ', '+') + '&per_page=' + imagenesPorPagina + '&page=' + paginaActual;
    console.log(URL);
    return this.http.get(URL);
  }
}
