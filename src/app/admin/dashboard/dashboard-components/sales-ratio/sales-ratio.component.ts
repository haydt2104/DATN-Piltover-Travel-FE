import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexYAxis,
  ApexLegend,
  ApexXAxis,
  ApexTooltip,
  ApexTheme,
  ApexGrid,
  ApexPlotOptions,
} from 'ng-apexcharts';

export type salesChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  yaxis: ApexYAxis | any;
  stroke: any;
  theme: ApexTheme | any;
  tooltip: ApexTooltip | any;
  dataLabels: ApexDataLabels | any;
  legend: ApexLegend | any;
  colors: string[] | any;
  markers: any;
  grid: ApexGrid | any;
  plotOptions: ApexPlotOptions | any;
};

@Component({
  selector: 'app-sales-ratio',
  templateUrl: './sales-ratio.component.html',
})
export class SalesRatioComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public salesChartOptions: Partial<salesChartOptions>;
  constructor() {
    this.salesChartOptions = {
      series: [
        {
          name: 'Tour',
          data: [1000, 31, 40, 28, 51, 42, 109, 100, 105, 111, 150, 1000],
        },
        {
          name: 'Khách Sạn',
          data: [0, 11, 32, 45, 32, 34, 52, 41, 55, 81, 100, 150],
        },
        {
          name: 'Máy Bay',
          data: [0, 71, 75, 94, 102, 134, 152, 141, 125, 181, 220, 140],
        },
        {
          name: 'Test',
          data: [0, 71, 75, 94, 102, 134, 152, 141, 125, 181, 220, 1340],
        },
      ],
      chart: {
        fontFamily: 'Rubik,sans-serif',
        height: 390,
        type: 'area',
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ['red', 'yellow', 'blue', 'black'],
      stroke: {
        curve: 'smooth',
        width: 1,
      },
      grid: {
        strokeDashArray: 3,
      },
      markers: {
        size: 3,
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'March',
          'April',
          'May',
          'June',
          'July',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },
      tooltip: {
        theme: 'dark',
      },
    };
  }

  ngOnInit(): void {}
}
