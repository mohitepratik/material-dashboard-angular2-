import { Component, OnInit } from "@angular/core";
import axios from "axios";
import * as Chartist from "chartist";
import * as moment from "moment";
import { ApiService } from "../api-service/api.service";
import Papa from "papaparse";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  constructor(private api: ApiService) {}

  allCastData: any;
  exportCsv() {

    axios
      .get("https://datacastbackend.herokuapp.com/api/datacast")
      .then((res: any) => {
        let products: any = [];
        res.data.filter((ele: any) => {
          const {
            partNumber,
            section,
            defects,
            workerId,
            reason,
            _id: partId,
            created_at,
          } = ele;
          const date = moment(created_at).format("DD/MM/YYYY h:mm A");
          products.push({
            partId,
            partNumber,
            section,
            defects,
            workerId,
            reason,
            date,
          });
        });

        const csv = Papa.unparse(JSON.stringify(products));
        const csvData = new Blob([csv], { type: "text/cvs;charset=utf-8;" });

        const csvURL = window.URL.createObjectURL(csvData);

        var tempLink = document.createElement("a");
        tempLink.href = csvURL;
        tempLink.setAttribute("download", "Products.csv");
        tempLink.click();
      });
  }

  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on("draw", function (data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint,
          },
        });
      } else if (data.type === "point") {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    });

    seq = 0;
  }
  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on("draw", function (data) {
      if (data.type === "bar") {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    });

    seq2 = 0;
  }
  async ngOnInit() {
    //   getAllData() {
    //     this.api.getDatacast().subscribe((res) => {
    //       this.allCastData = res;
    //     });
    //  };
    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */
    let generateSeries = {
      A:0,
      B:0,
      C:0,
      D:0,
      E:0,
      F:0,
      G:0
    }
    
     await axios.get('https://datacastbackend.herokuapp.com/api/datacast/date').then((res:any)=>{
      let newRecord:any = []
      res.data.map((ele)=>{
      const date = moment(ele.created_at).date();
      const day = moment(ele.created_at).format('ddd');
      newRecord.push({...ele, date, day})
      })

      newRecord.map(entry=>{
        if(entry.day === 'Mon'){
          generateSeries = {...generateSeries, A:generateSeries.A + +entry.defects}
        }
        if(entry.day === 'Tue'){
          generateSeries = {...generateSeries, B:generateSeries.B + +entry.defects}
        }
        if(entry.day === 'Wed'){
          generateSeries = {...generateSeries, C:generateSeries.C + +entry.defects}
        }
        if(entry.day === 'Thu'){
          generateSeries = {...generateSeries, D:generateSeries.D + +entry.defects}
        }
        if(entry.day === 'Fri'){
          generateSeries = {...generateSeries,E:generateSeries.E + +entry.defects}
        }
        if(entry.day === 'Sat'){
          generateSeries = {...generateSeries, F:generateSeries.F + +entry.defects}
        }
        if(entry.day === 'Sun'){
          generateSeries = {...generateSeries, G:generateSeries.G + entry.defects}
        }

      })
      
    })

    const dataDailySalesChart: any = {
      labels: ["M", "T", "W", "T", "F", "S","S"],
      series: [[...Object.values(generateSeries)]],
    };

    let maxDefects = Math.max(...Object.values(generateSeries))
  

    const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0,
      }),
      low: 0,
      high: maxDefects + 10, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    };

    var dailySalesChart = new Chartist.Line(
      "#dailySalesChart",
      dataDailySalesChart,
      optionsDailySalesChart
    );

    this.startAnimationForLineChart(dailySalesChart);

    /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

    const dataCompletedTasksChart: any = {
      labels: ["12p", "3p", "6p", "9p", "12p", "3a", "6a", "9a"],
      series: [[230, 750, 450, 300, 280, 240, 200, 190]],
    };

    const optionsCompletedTasksChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0,
      }),
      low: 0,
      high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    };

    var completedTasksChart = new Chartist.Line(
      "#completedTasksChart",
      dataCompletedTasksChart,
      optionsCompletedTasksChart
    );

    // start animation for the Completed Tasks Chart - Line Chart
    this.startAnimationForLineChart(completedTasksChart);

    /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

    var datawebsiteViewsChart = {
      labels: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
      series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]],
    };
    var optionswebsiteViewsChart = {
      axisX: {
        showGrid: false,
      },
      low: 0,
      high: 1000,
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0 },
    };
    var responsiveOptions: any[] = [
      [
        "screen and (max-width: 640px)",
        {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            },
          },
        },
      ],
    ];
    var websiteViewsChart = new Chartist.Bar(
      "#websiteViewsChart",
      datawebsiteViewsChart,
      optionswebsiteViewsChart,
      responsiveOptions
    );

    //start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(websiteViewsChart);
  }
}
function getAllData() {
  throw new Error("Function not implemented.");
}
