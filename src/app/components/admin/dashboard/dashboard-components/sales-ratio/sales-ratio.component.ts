import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
import { DateRevenue, MonthRevenue } from 'src/app/models/revenue';
import { RevenueService } from 'src/app/services/revenue/revenue.service';

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
  public monthrevenue!: MonthRevenue[];
  public startDate: string = '2023-01-01'; // Ngày bắt đầu
  public endDate: string = '2023-12-31';   // Ngày kết thúc


  @ViewChild("chart") chart: ChartComponent = Object.create(null);
  public salesChartOptions: Partial<salesChartOptions>;
  constructor(private router: Router, private route: ActivatedRoute, private monthrevenueService: RevenueService) {
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
      yaxis: [
        {
          labels: {
            formatter: function (value: number) {
              const formattedValue = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(value);
              return formattedValue.replace('₫', '') + 'VNĐ';
            },
          },
        },
      ],
      tooltip: {
        theme: 'dark',
        y: {
          formatter: function (value: number) {
            const formattedValue = new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(value);
            return formattedValue.replace('₫', '') +'VNĐ';
          }
        }
      }
   }
}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this['startDate'] = params['startDate'] || '2023-01-01';
      this['endDate'] = params['endDate'] || '2023-12-31';
      // Thực hiện việc lọc dữ liệu dựa trên startDate và endDate ở đây
      this.getMonthRevenue();
    });
  }

  private getMonthRevenue() {
    const dateRange: DateRevenue = {
      startDate: this.startDate,
      endDate: this.endDate,
    };

    this.monthrevenueService.getMonthRevenueBody(dateRange).subscribe((data) => {
      this.monthrevenue = data;
      console.log('Month Doanh thu: ', this.monthrevenue);

      const tourData: number[] = Array(12).fill(0);
      const hotelData: number[] = Array(12).fill(0);
      const transportData: number[] = Array(12).fill(0);
      this.monthrevenue.forEach((item) => {
        const monthFromDatabase = item.month; // Lấy giá trị month từ cơ sở dữ liệu
        const parts = monthFromDatabase.split("-");

        const month = parseInt(parts[1]); // month sẽ là 1
        console.log("Tháng:", month);

        tourData[month -1] = item.total_tour_revenue;
        hotelData[month -1] = item.total_hotel_revenue;
        transportData[month -1] = item.total_transport_revenue;
      });
      // Cập nhật lại biểu đồ
      this.salesChartOptions.series = [
        {
          name: "Tour",
          data: tourData,
        },
        {
          name: "Khách Sạn",
          data: hotelData,
        },
        {
          name: "Vận chuyển",
          data: transportData,
        },
      ];
    });
  }
}
