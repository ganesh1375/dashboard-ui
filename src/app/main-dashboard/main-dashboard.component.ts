import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Data } from '../Data'
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent implements OnInit {


  url = 'http://localhost:4000/results';
  month: any = [];
  price: any = [];
  chart: any = [];
  dataFinal: any = [];
  constructor(private httpClient: HttpClient) { }
  data: Data[];
  users:any;
  //PIE Chart

  pieChartOptions = {
    responsive: true
  }

  pieChartLabels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY'];

  // CHART COLOR.
  pieChartColor: any = [
    {
      backgroundColor: ['rgba(30, 169, 224, 0.8)',
        'rgba(255,165,0,0.9)',
        'rgba(139, 136, 136, 0.9)',
        'rgba(255, 161, 181, 0.9)',
        'rgba(255, 102, 0, 0.9)'
      ]
    }
  ]

  pieChartData: any = [
    {
      data: []
    }
  ];


  pills= [1,2,3,4,5,6,7];

  ngOnInit() {
    this.httpClient.get(this.url).subscribe((res: any) => {
      this.dataFinal = res;
      for (let i = 0; i < this.dataFinal.length; i++) {
        let m = this.dataFinal[i].month;
        console.log(m)
        this.month.push(this.dataFinal[i].month)
        let n = this.dataFinal[i].price;
        this.price.push(n)
      }
    });
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.month,
        datasets: [
          {
            data: this.price,
            borderColor: '#3cba9f',
            fill: true
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            ticks: {
              display: true,
            },
          },
          y: {
            ticks: {
              display: true,
            },
          },
        },
      }
    });


    const myChart = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            ticks: {
              display: true,
            },
          },
          y: {
            ticks: {
              display: true,
            },
          },
        },
      }
    });

    const myChart2 = new Chart("myChart2", {
      type: 'pie',
      data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [{
          label: '# of Votes',
          data: [13, 19, 31],
          backgroundColor: [
            'rgb(240, 222, 26)',
            'rgb(237, 143, 12)',
            'rgb(245, 177, 83)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            ticks: {
              display: true,
            },
          },
          y: {
            ticks: {
              display: true,
            },
          },
        },
      }
    });

    this.httpClient.get('https://api.github.com/search/users?q=lenin').subscribe(data =>{
      this.users=data
      this.users = this.users.items;
      console.log(this.users)
      this.users.length=8;
    })
    
  }
}
