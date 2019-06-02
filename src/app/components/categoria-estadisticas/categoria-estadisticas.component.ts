import { Component, OnInit, Input } from '@angular/core';
import { Categoria } from 'src/app/modelos/categoria';

import { NgZone } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { DataService } from '../../services/data/data.service';
import { Observable } from 'rxjs/Observable';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-categoria-estadisticas',
  templateUrl: './categoria-estadisticas.component.html',
  styleUrls: ['./categoria-estadisticas.component.css']
})
export class CategoriaEstadisticasComponent implements OnInit {

  @Input() categorias: Array<Categoria>;
  private chart: am4charts.XYChart;

  private data:any;

  constructor(private zone: NgZone,
    private _dataService: DataService
  ) {}

  ngOnInit() {
    let catComponet = this;
    catComponet.data = [];
    
    catComponet.getData( );

  }

  findCategoriaById(idCategoria:String){
    return this.categorias.find(categoria => categoria._id == idCategoria);
  }

  getData(){
    let catComponet = this;
    catComponet.data = [];
    let self = this;
    this._dataService.requestDataFromMultipleSources(this.categorias)
    .subscribe(
      response => {
        response.forEach(function (peticion:any, index:Number) {
          peticion.data.forEach(function (doc:any, indice:Number) {
            let categoria = self.findCategoriaById( doc.categoria_id );
            let key = categoria.nombre;
            let value = key + "valor";
            let obj = {};
            obj[key] = doc.fecha;
            obj[value] = doc.valor;

            catComponet.data.push(obj);
          });
        });
        
        /*
        response.data.docs.forEach(function (doc:any, index:Number) {
          let key = categoria.nombre;
          let value = key + "valor";
          let obj = {};
          obj[key] = doc.fecha;
          obj[value] = doc.valor;
          catComponet.data.push(obj);
            //data[categoria.nombre] = doc.fecha;
            //data['valor' + index] = doc.valor;
         });*/
         //console.log(data);
         //data = data;
      }, error => {
          console.log(error);
      }).add(() => {
        this.showGrafica()
      });;
  }

  showGrafica() {
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("chartdiv", am4charts.XYChart);

      /*let data = [];
      let price1 = 1000, price2 = 1200;
      let quantity = 30000;
      for (var i = 0; i < 360; i++) {
        price1 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 100);
        data.push({ date1: new Date(2015, 0, i), price1: price1 });
      }
      for (var i = 0; i < 360; i++) {
        price2 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 100);
        data.push({ date2: new Date(2017, 0, i), price2: price2 });
      }
      console.log( data );*/
      chart.data = this.data;
      console.log(this.data);
      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.renderer.labels.template.fill = am4core.color("#e59165");
      
      let dateAxis2 = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis2.renderer.grid.template.location = 0;
      dateAxis2.renderer.labels.template.fill = am4core.color("#dfcc64");
      
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.labels.template.fill = am4core.color("#e59165");
      
      valueAxis.renderer.minWidth = 60;
      
      let valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis2.tooltip.disabled = true;
      valueAxis2.renderer.grid.template.strokeDasharray = "2,3";
      valueAxis2.renderer.labels.template.fill = am4core.color("#dfcc64");
      valueAxis2.renderer.minWidth = 60;
      
      let series = chart.series.push(new am4charts.LineSeries());
      series.name = "V1";
      series.dataFields.dateX = "v1";
      series.dataFields.valueY = "v1valor";
      series.tooltipText = "{valueY.value}";
      series.fill = am4core.color("#e59165");
      series.stroke = am4core.color("#e59165");
      //series.strokeWidth = 3;
      
      let series2 = chart.series.push(new am4charts.LineSeries());
      series2.name = "V2";
      series2.dataFields.dateX = "v2";
      series2.dataFields.valueY = "v2valor";
      series2.yAxis = valueAxis2;
      series2.xAxis = dateAxis2;
      series2.tooltipText = "{valueY.value}";
      series2.fill = am4core.color("#dfcc64");
      series2.stroke = am4core.color("#dfcc64");
      //series2.strokeWidth = 3;
      
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.xAxis = dateAxis2;
      
      let scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      chart.scrollbarX = scrollbarX;
      
      chart.legend = new am4charts.Legend();
      chart.legend.parent = chart.plotContainer;
      chart.legend.zIndex = 100;
      
      valueAxis2.renderer.grid.template.strokeOpacity = 0.07;
      dateAxis2.renderer.grid.template.strokeOpacity = 0.07;
      dateAxis.renderer.grid.template.strokeOpacity = 0.07;
      valueAxis.renderer.grid.template.strokeOpacity = 0.07;

    });
  }


  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

}