import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { DataItem } from '@amcharts/amcharts4/core';
import { TreeMapDataItem, TreeMapSeriesDataItem } from '@amcharts/amcharts4/charts';
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-seccion-habilidades',
  templateUrl: './seccion-habilidades.component.html',
  styleUrls: ['./seccion-habilidades.component.css']
})
export class SeccionHabilidadesComponent implements OnInit {

  public data = {
    "BackEnd": { "SPRING BOOT": 6000, "Laravel": 3000, "Ruby on Rails": 2000, "Flask": 500, "Node":360 },
    "FrontEnd": { "Angular": 9500, "Vue": 3100, "HTML": 780, "Bootstrap": 3890  },
    "Control de versiones": { "GIT": 8000 },
    "Base de datos": { "MySQL": 1080, "Postgresql":"750", "SQL Server":570,  "MongoDB":439},
    "Otros": { "Patrones de diseño": 5078, "SCRUM": 5060, },
  }

 processData(data) {
  let treeData = [];

  let smallBrands = { name: "Other", children: [] };

  for (var brand in data) {
    let brandData = { name: brand, children: [] }
    let brandTotal = 0;
    for (var model in data[brand]) {
      brandTotal += data[brand][model];
    }

    for (var model in data[brand]) {
      // do not add very small
      if (data[brand][model] > 0) {
        brandData.children.push({ name: model, count: data[brand][model] });
      }
    }

    // add to small brands if total number less than
    if (brandTotal > 0) {
      treeData.push(brandData);
    }
    else {
      smallBrands.children.push(brandData)
    }

  }
  treeData.push(smallBrands);
  return treeData;
}


  constructor() {}

  
  ngOnInit() {
  
    let chart = am4core.create("chartdiv", am4charts.TreeMap);
    chart.hiddenState.properties.opacity = 0;



    // only one level visible initially
    chart.maxLevels = 1;
    // define data fields
    chart.dataFields.value = "count";
    chart.dataFields.name = "name";
    chart.dataFields.children = "children";
    //chart.homeText = "Skills";

    // enable navigation
    chart.navigationBar = new am4charts.NavigationBar();

    // level 0 series template
    let level0SeriesTemplate = chart.seriesTemplates.create("0");
    level0SeriesTemplate.strokeWidth = 2;

    // by default only current level series bullets are visible, but as we need brand bullets to be visible all the time, we modify it's hidden state
    level0SeriesTemplate.bulletsContainer.hiddenState.properties.opacity = 1;
    level0SeriesTemplate.bulletsContainer.hiddenState.properties.visible = true;
    // create hover state
    let columnTemplate = level0SeriesTemplate.columns.template;
    let hoverState = columnTemplate.states.create("hover");

    // darken
    hoverState.adapter.add("fill", function (fill, target) {
      if (fill instanceof am4core.Color) {
        return am4core.color(am4core.colors.brighten(fill.rgb, -0.2));
      }
      return fill;
    })

    let label = columnTemplate.createChild(am4core.Label);
    label.align = "center";
    label.valign = "middle";
    label.opacity = 0.25;
    label.adapter.add("text", function (text, target) {
      let dataItem: TreeMapSeriesDataItem = target.parent.dataItem as TreeMapSeriesDataItem ;
      if (!target.dataItem) {
        return "Otro";
      }
      return dataItem.treeMapDataItem.name;
    });

    // level1 series template
    let level1SeriesTemplate = chart.seriesTemplates.create("1");
    level1SeriesTemplate.columns.template.fillOpacity = 0;

    let bullet1 = level1SeriesTemplate.bullets.push(new am4charts.LabelBullet());
    bullet1.locationX = 0.5;
    bullet1.locationY = 0.5;
    bullet1.label.text = "{name}";
    bullet1.label.fill = am4core.color("#ffffff");

    // level2 series template
    let level2SeriesTemplate = chart.seriesTemplates.create("2");
    level2SeriesTemplate.columns.template.fillOpacity = 0;

    let bullet2 = level2SeriesTemplate.bullets.push(new am4charts.LabelBullet());
    bullet2.locationX = 0.5;
    bullet2.locationY = 0.5;
    bullet2.label.text = "{name}";
    bullet2.label.fill = am4core.color("#ffffff");
    chart.data = this.processData(this.data);
  }

  getStyleBar( porcentaje ){
    return {'width': porcentaje + '%'};
  }

}
