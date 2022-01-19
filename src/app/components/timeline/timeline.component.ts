import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../services/empresa/empresa.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  public empresas: Array<any> = [];
  constructor(
    private empresaService: EmpresaService
  ) {
    //this.empresas = this.empresaService.getEmpresas();
    //console.log(this.empresas);

    
  }

  ngOnInit(): void {
    this.getEmpresas();
  }

  async getEmpresas(){
    let querySnapshot = await this.empresaService.getEmpresasAsync();
    console.log("las emrpesas")
    console.log(querySnapshot)
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      console.log(data)
      this.empresas.push(data);
      this.empresas = this.empresas.sort(function (a, b) {
          if (a.id > b.id) {
            return -1;
          }
          if (a.id < b.id) {
            return 1;
          }
          // a must be equal to b
          return 0;
        });
      //this.empresas =  data;
    }); 
  }

}
