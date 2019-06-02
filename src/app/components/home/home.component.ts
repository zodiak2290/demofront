import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../modelos/categoria';
import { CategoriaService } from '../../services/categoria/categoria.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  private page: number;
  private pages: number;
  private numbers: number[];
  private categorias: Categoria[];

  constructor(
      private _categoriaService: CategoriaService,
    ) {
    this.page = 1;
    this.numbers = [];
  }
  
  ngOnInit() {
    this.getCategorias(this.page);
  }

  getCategorias(page){
    console.log("hrloo")
    if( page > 0  ){
      this.page = page;
      let params = { page: page, limit: 12 };
      this._categoriaService.getCategorias(params)
      .subscribe(
          response => {
            console.log(response)
              this.categorias = response.categorias.docs;
              this.pages = response.categorias.pages;
              this.numbers = this.pages ? Array.from(Array(this.pages).keys()): [];
              console.log(this.numbers)
          }, error => {
              console.log(error);
          });
    }
  }


}
