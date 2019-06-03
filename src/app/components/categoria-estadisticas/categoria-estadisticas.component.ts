import { Component, OnInit, Input } from '@angular/core';
import { Categoria } from 'src/app/modelos/categoria';

import { NgZone } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { DataService } from '../../services/data/data.service';

import { interval } from 'rxjs/observable/interval';
am4core.useTheme(am4themes_animated);

//emit value in sequence every 1 second
const source = interval(2000);
 

@Component({
  selector: 'app-categoria-estadisticas',
  templateUrl: './categoria-estadisticas.component.html',
  styleUrls: ['./categoria-estadisticas.component.css']
})
export class CategoriaEstadisticasComponent implements OnInit {

  @Input() categorias: Array<Categoria>;
  private chart: am4charts.XYChart;
  

  private data:any;
  private mostrada:Boolean;

  constructor(private zone: NgZone,
    private _dataService: DataService
  ) {}

  ngOnInit() {
    let catComponet = this;
    catComponet.data = [];

    catComponet.getData();
    //source.subscribe(val => catComponet.getData());
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
      }, error => {
          console.log(error);
      }).add(() => {
        this.showGrafica();
      });;
  }

  getDateAxis(chart, color){
    
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.labels.template.fill = am4core.color(color);
    dateAxis.renderer.grid.template.strokeOpacity = 0.07;
    return dateAxis;
  }

  getValueAxis(chart, color){
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.labels.template.fill = am4core.color("#e59165");
    valueAxis.renderer.minWidth = 60;
    valueAxis.renderer.grid.template.strokeOpacity = 0.07;
    return valueAxis;
  }

  getSeries(chart, name, dateX, valueY, color, addXYAxis){
    let dateAxis = this.getDateAxis(chart, color);
    

    let valueAxis = this.getValueAxis(chart, color);

    let series = chart.series.push(new am4charts.LineSeries());
    series.name = name;
    series.dataFields.dateX = dateX;
    series.dataFields.valueY = valueY;
    series.tooltipText = "{valueY.value}";
    series.fill = am4core.color(color);
    series.stroke = am4core.color(color);
    
    if(addXYAxis){
      //let valueAxis = this.getValueAxis(chart, color);
      valueAxis.renderer.grid.template.strokeDasharray = "2,3";
      //let dateAxis2 = this.getDateAxis(chart, color);
      series.yAxis = valueAxis;
      series.xAxis = dateAxis;
    }

    return series;
  }

  showGrafica() {
    let chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.data = this.data;
console.log(this.data)
    let self = this;
   
    /*
    let series = this.getSeries(chart, "V1", "v1", "v1valor", '#dfcc64', false);
    let series2 = this.getSeries(chart, "V2", "v2", "v2valor", '#'+(Math.random()*0xFFFFFF<<0).toString(16), false);
  
    let series3 = this.getSeries(chart, "V3", "v3", "v3valor", '#'+(Math.random()*0xFFFFFF<<0).toString(16), false);
    */
    let total  =this.categorias.length;
    this.categorias.forEach(function (categoria:Categoria, indice:Number) {
      let color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
      let nombre = categoria.nombre;
      
      let series = self.getSeries(chart, nombre.toUpperCase(), nombre, nombre + "valor", color, false);
      if( indice == 0){
        let scrollbarX = new am4charts.XYChartScrollbar();
        scrollbarX.series.push(series);
        chart.scrollbarX = scrollbarX;
      }

    });

    chart.cursor = new am4charts.XYCursor();
     // chart.cursor.xAxis = dateAxis2;
    chart.legend = new am4charts.Legend();
    chart.legend.parent = chart.plotContainer;
    chart.legend.zIndex = 100;

  }


  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

}