import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-listar-imagen',
  templateUrl: './listar-imagen.component.html',
  styleUrls: ['./listar-imagen.component.css']
})
export class ListarImagenComponent {
termino = '';
suscription: Subscription;
empty = false;
listImagenes: any[] = [];
loading = false;
imagenesPorPagina = 30;
paginaActual = 1;
totalPaginas = 1;

  constructor(private _imagenService:ImagenService) {
    this.suscription = this._imagenService.getTerminoBusqueda().subscribe(data => {
      this.termino = data;
      this.loading = true;
      this.paginaActual = 1;
      this.totalPaginas = 1;
      this.obtenerImagenes();
    });
  }

  obtenerImagenes(){
    this._imagenService.getImagenes(this.termino,this.paginaActual,this.imagenesPorPagina).subscribe(data => {
      console.log(data);
      this.loading = false;
      if(data.hits.length === 0){
        this.totalPaginas = 1;
        this.empty = true;
        this._imagenService.setError('No se encontraron resultados.');
        return;
      }
      this.empty = false;
      this.listImagenes = data.hits;
      this.totalPaginas = Math.ceil(data.totalHits / this.imagenesPorPagina);
    }, error => {this._imagenService.setError('Ocurrió un error al obtener las imágenes.');
    this.loading = false;

    });
  }

  paginaAnterior(){
    this.paginaActual--;
    this.loading = true;
    this.listImagenes = [];
    this.obtenerImagenes();
  }
  paginaSiguiente(){
    this.paginaActual++;
    this.loading = true;
    this.listImagenes = [];
    this.obtenerImagenes();
  }
paginaAnteriorClase(){
  if(this.paginaActual === 1) return false;
  return true; }
paginaSiguienteClase(){
  if(this.paginaActual === this.totalPaginas) return false;
  return true;}
}
