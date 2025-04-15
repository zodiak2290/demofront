import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { EmpresaService } from '../../services/empresa/empresa.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  @ViewChildren('timelineEl') timelineEls!: QueryList<ElementRef>;
  visibleItems: boolean[] = [];

  public empresas: Array<any> = [];
  constructor(
    private empresaService: EmpresaService
  ) {}

  ngOnInit(): void {
    this.getEmpresas();
  }

  async getEmpresas(){
    let querySnapshot = await this.empresaService.getEmpresasAsync();
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      this.empresas.push(data);
      this.visibleItems = new Array(this.empresas.length).fill(false);
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
      setTimeout(() => this.setupIntersectionObserver(), 0);
    });
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const index = this.timelineEls.toArray().findIndex(
          el => el.nativeElement === entry.target
        );
        if (index !== -1) {
          this.visibleItems[index] = entry.isIntersecting;
        }
      });
    }, { threshold: 0.1 });

    this.timelineEls.forEach(el => observer.observe(el.nativeElement));
  }
}
