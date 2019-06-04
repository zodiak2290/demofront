import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seccion-habilidades',
  templateUrl: './seccion-habilidades.component.html',
  styleUrls: ['./seccion-habilidades.component.css']
})
export class SeccionHabilidadesComponent implements OnInit {

  
  private habilidades: any[];
  
  constructor() { }

  
  ngOnInit() {
    this.habilidades = [{
      name:'Angular',
      porcentaje:80 
    },{
      name:'git',
      porcentaje:80
    },{
      name:'JAVA',
      porcentaje: 70
    },{
      name:'Node',
      porcentaje:50
    },{
      name:'patrones de diseño',
      porcentaje:76
    },{
      name:'MYSQL',
      porcentaje:65
    },{
      name:'HTML5',
      porcentaje:74
    },{
      name:'bootstrap',
      porcentaje:84
    },{
      name:'javascript',
      porcentaje: '81'
    }, {
      name:'MVC',
      porcentaje: 82
    },{
      name:'scrum',
      porcentaje:40
    }
  ]
  }

  getStyleBar( porcentaje ){
    return {'width': porcentaje + '%'};
  }

}
