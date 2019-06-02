import { Component, OnInit, Input} from '@angular/core';
import { Categoria } from 'src/app/modelos/categoria';
@Component({
  selector: 'app-categoria-dashboard',
  templateUrl: './categoria-dashboard.component.html',
  styleUrls: ['./categoria-dashboard.component.css']
})
export class CategoriaDashboardComponent implements OnInit {

  @Input() categoria: Categoria;
  constructor() { }

  ngOnInit() {
  }

}
