import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../services/empresa/empresa.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  private empresas: Array<any> = [];
  constructor(
    private empresaService: EmpresaService
  ) {
    this.empresas = this.empresaService.getEmpresas();
    console.log(this.empresas);
  }

  ngOnInit(): void {
  }

}
