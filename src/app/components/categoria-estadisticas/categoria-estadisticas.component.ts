import { Component, OnInit, Input } from '@angular/core';
import { Categoria } from 'src/app/modelos/categoria';

@Component({
  selector: 'app-categoria-estadisticas',
  templateUrl: './categoria-estadisticas.component.html',
  styleUrls: ['./categoria-estadisticas.component.css']
})
export class CategoriaEstadisticasComponent implements OnInit {

  @Input() categorias: Array<Categoria>;;
  constructor() { }

  ngOnInit() {
    console.log( this.categorias);
  }

}
