import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-empresa-resumen',
  templateUrl: './empresa-resumen.component.html',
  styleUrls: ['./empresa-resumen.component.css']
})
export class EmpresaResumenComponent implements OnInit {

  private param:string;
  private empresas: Array<any> = [];
  private empresa;

  constructor(
    private route: ActivatedRoute
  ) {
    this.empresas = [{
      id:6,
      nombre: 'Sistemas aKubica',
      fechaInicial:'15-05-2018',
      descripcionEmpleo:'Soporte sistema SOFT (FAMSA).',
      fechaFin: moment().format('DD-MM-YYYY'),
      tecnologias: ['JAVA', 'JQuery', 'Bootstrap', 'GIT', 'Docker', 'Angular', 'SCRUM'],
      situacion:[{
        reto:'',
        accion:'',
        resultado:''
      }]
    },{
      id:5,
      nombre: 'FipaSofp',
      fechaInicial:'15-03-2017',
      fechaFin: '15-05-2018',
      descripcionEmpleo:'Desarrollo para Grupo Vidanta, se desarrollaron componentes utilizando la version 1.5 de angularjs, se utilizo el template clipTwo el cual proporcinaba multiple plugins (chartjs, ckeditor, select2, sweetalert, moment)',
      tecnologias: ['Angular', 'JQuery', 'Bootstrap', 'GIT', 'SCRUM'],
      actividades:[{
        id:1,
        reto:'Código duplicado',
        accion:'Creación de componentes, que hicieron posible reducir considerablemente la cantidad de codigo',
        resultado:'Reucción en el tiempo de implementacion'
      },{
        id:2,
        reto:'Archivos en la raiz del proyecto',
        accion:'Estructuracion del código, en carpetas que encapsulaban cada componente, su html,js y css.',
        resultado:'Código mejor organizado, facilidad de reutilizar código'
      }]
    },{
      id:4,
      nombre: 'UXIErp',
      fechaInicial:'01-06-2016',
      fechaFin: '15-03-2017',
      descripcionEmpleo:'Desarrollo web, actualización de sistema de facturación electrónica realizado en php.',
      tecnologias: ['Angular', 'JQuery', 'Bootstrap', 'GIT','PHP']
    },{
      id:3,
      nombre: 'Biblioteca pública central “Margarita Maza de Juárez”',
      fechaInicial:'01-02-2015',
      fechaFin: '01-09-2015',
      descripcionEmpleo:'Desarrollo web. Análisis y diseño de base de datos, codificación del sistema para control del acervo bibliográfico.',
      tecnologias: ['Angular', 'JQuery', 'Bootstrap', 'GIT','PHP']
    },{
      id:2,
      nombre: 'Volkswagen Bonn Oaxaca',
      fechaInicial:'10-01-2014',
      fechaFin: '15-12-2014',
      descripcionEmpleo:'Auxiliar de sistemas. Mantenimiento y reparación de equipos de computo.'
    },{
      id:1,
      nombre: 'Despacho Jurídico ',
      fechaInicial:'01-11-2011',
      fechaFin: '01-10-2013',
      descripcionEmpleo:'Soporte técnico. Mantenimiento y reparación de equipos de computo.'
    }]
   }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.param = params['id'];
      this.getEmpresa( this.param );
  });

  }

  getEmpresa( idEmpresa ){
    if( idEmpresa){
      this.empresa = this.empresas.find(function(empresa) {
        return empresa.id == idEmpresa;
      });
    }
    //this.empresa = this.empresas.find( (empresa) => { return empresa.id === idEmpresa } );
    //console.log( this.empresa );
  }  

}
