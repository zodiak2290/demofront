import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../services/empresa/empresa.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  empresas: any[];
  constructor(private empresaService: EmpresaService) {
    
  }

  ngOnInit() {
    this.empresas = this.empresaService.getEmpresas();
  }

  openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
  closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
  }
}
