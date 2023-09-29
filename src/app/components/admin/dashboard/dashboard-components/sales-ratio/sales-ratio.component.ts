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
  ApexPlotOptions
} from 'ng-apexcharts';
import { MonthRevenue } from 'src/app/models/revenue';
import { Revenue } from 'src/app/models/revenue';
import { MonthrevenueService } from 'src/app/services/revenue/monthrevenue.service';

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
  templateUrl: './sales-ratio.component.html'
})
export class SalesRatioComponent implements OnInit {
  public monthrevenue!: MonthRevenue[];

  @ViewChild("chart") chart: ChartComponent = Object.create(null);
  public salesChartOptions: Partial<salesChartOptions>;
  constructor(private monthrevenueService: MonthrevenueService) {
    this.salesChartOptions = {
      series: [
        {
          name: "Tour",
          data: [0, 31, 40, 28, 51, 42, 109, 100, 105, 111, 150, 230],
        },
        {
          name: "Khách Sạn",
          data: [0, 11, 32, 45, 32, 34, 52, 41, 55, 81, 100, 150],
        },
        {
          name: "Máy Bay",
          data: [0, 71, 75, 94, 102, 134, 152, 141, 125, 181, 220, 140],
        }
      ],
      chart: {
        fontFamily: 'Rubik,sans-serif',
        height: 390,
        type: 'area',
        toolbar: {
          show: false
        },
      },
      dataLabels: {
        enabled: false
      },
      colors: ["red", "yellow", "blue"],
      stroke: {
        curve: "smooth",
        width: 1,
      },
      grid: {
        strokeDashArray: 3,
      },
      markers: {
        size: 3
      },
      xaxis: {
        categories: [
          "Tháng 1",
          "Tháng 2",
          "Tháng 3",
          "Tháng 4",
          "Tháng 5",
          "Tháng 6",
          "Tháng 7",
          "Tháng 8",
          "Tháng 9",
          "Tháng 10",
          "Tháng 11",
          "Tháng 12"
        ],
      },
      tooltip: {
        theme: 'dark'
      }
    };
  }

  ngOnInit(): void {
      this.getMonthRevenue();
  }
  private getMonthRevenue(){
    this.monthrevenueService.getMonthRevenue().subscribe((data) =>{
      this.monthrevenue = data;
      console.log('Month Doanh thu: ', this.monthrevenue);
    });
  }
}
