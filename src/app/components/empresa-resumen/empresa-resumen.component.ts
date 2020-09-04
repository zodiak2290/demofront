import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmpresaService } from '../../services/empresa/empresa.service';

@Component({
  selector: 'app-empresa-resumen',
  templateUrl: './empresa-resumen.component.html',
  styleUrls: ['./empresa-resumen.component.css']
})
export class EmpresaResumenComponent implements OnInit {

  private param:string;
  private empresas: Array<any> = [];
  public empresa;

  constructor(
    private route: ActivatedRoute,
    private empresaService: EmpresaService
  ) {
    this.empresas = this.empresaService.getEmpresas();
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
