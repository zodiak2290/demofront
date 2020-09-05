import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor() { }

  getEmpresas() {
    return [{
      id: 7,
      nombre: 'Famsa',
      fechaInicial: '2020-01-16',
      fechaFin: '2020-08-01',
      descripcionEmpleo: 'Desarrollo SCV, con spring y angularjs',
      tecnologias: ['JAVA', 'JQuery', 'Bootstrap', 'GIT', 'Docker', 'Angular'],
      situacion: [{
        reto: '',
        accion: '',
        resultado: ''
      }]
    }, {
      id: 6,
      nombre: 'Sistemas aKubica',
      fechaInicial: '2008-05-15',
      descripcionEmpleo: 'Soporte sistema SOFT (FAMSA).',
      fechaFin: '2020-01-15',
      tecnologias: ['JAVA', 'JQuery', 'Bootstrap', 'GIT', 'Docker', 'Angular', 'SCRUM'],
      situacion: [{
        reto: '',
        accion: '',
        resultado: ''
      }]
    }, {
      id: 5,
      nombre: 'FipaSofp',
      fechaInicial: '2017-03-15',
      fechaFin: '2018-05-15',
      descripcionEmpleo: 'Desarrollo para Grupo Vidanta, se desarrollaron componentes utilizando la version 1.5 de angularjs, se utilizo el template clipTwo el cual proporcinaba multiple plugins (chartjs, ckeditor, select2, sweetalert, moment)',
      tecnologias: ['Angular', 'JQuery', 'Bootstrap', 'GIT', 'SCRUM'],
      actividades: [{
        id: 1,
        reto: 'Código duplicado',
        accion: 'Creación de componentes, que hicieron posible reducir considerablemente la cantidad de codigo',
        resultado: 'Reucción en el tiempo de implementacion'
      }, {
        id: 2,
        reto: 'Archivos en la raiz del proyecto',
        accion: 'Estructuracion del código, en carpetas que encapsulaban cada componente, su html,js y css.',
        resultado: 'Código mejor organizado, facilidad de reutilizar código'
      }]
    }, {
      id: 4,
      nombre: 'UXIErp',
      fechaInicial: '2016-06-01',
      fechaFin: '2017-03-15',
      descripcionEmpleo: 'Desarrollo web, actualización de sistema de facturación electrónica realizado en php.',
      tecnologias: ['Angular', 'JQuery', 'Bootstrap', 'GIT', 'PHP']
    }, {
      id: 3,
      nombre: 'Biblioteca pública central “Margarita Maza de Juárez”',
      fechaInicial: '2015-02-01',
      fechaFin: '2015-09-01',
      descripcionEmpleo: 'Desarrollo web. Análisis y diseño de base de datos, codificación del sistema para control del acervo bibliográfico.',
      tecnologias: ['Angular', 'JQuery', 'Bootstrap', 'GIT', 'PHP']
    }, {
      id: 2,
      nombre: 'Volkswagen Bonn Oaxaca',
      fechaInicial: '2014-01-10',
      fechaFin: '2014-12-15',
      descripcionEmpleo: 'Auxiliar de sistemas. Mantenimiento y reparación de equipos de computo.'
    }, {
      id: 1,
      nombre: 'Despacho Jurídico ',
      fechaInicial: '2011-11-01',
      fechaFin: '2013-10-01',
      descripcionEmpleo: 'Soporte técnico. Mantenimiento y reparación de equipos de computo.'
    }];
  }
}
