var chart="";
var histChart="";
function createChart(chartData, name){
  if(chart){
    chart.addSeries({
      type: 'spline',
      data:chartData,
      name:name
    });
  }
  else{
    chart=new Highcharts.Chart('chart', {
      title:{
        text:'Spot and Forward Libor Curves'
      },
      credits:{
        enabled:false
      },
      yAxis:{
        labels:{
          formatter:function(){
            return 100*this.value+'%';
          }
        },
        title:{
          text:''
        }
      },
      xAxis:{
        title:{
          text:'Years to Maturity'
        }
      },
      series: [{
        type: 'spline',
        data: chartData,
        name:name
      }]
    });
  }
}
function createHistogram(chartData, name){
  histChart=new Highcharts.Chart('hist', {
    title:{
      text:'Histogram of Prices'
    },
    credits:{
      enabled:false
    },
    plotOptions: {
      series: {
        pointPadding: 0, // Defaults to 0.1
        groupPadding: 0.0 // Defaults to 0.2
      }
    },
    yAxis:{
      title:{
        text:'Frequency'
      }
    },
    legend:{
      enabled:false
    },
    xAxis:{
      title:{
        text:'Prices'
      },
      categories:chartData.bins
    },
    series: [{
      type: 'column',
      data: chartData.count,
      name:name
    }]
  });
}
var riskChart="";
function createRiskChart(categories, values){
  riskChart=new Highcharts.Chart('riskContributions', {
    title:{
      text:'Risk Contributions'
    },
    credits:{
      enabled:false
    },
    yAxis:{
      title:{
        text:'Contribution to VaR'
      }
    },
    legend:{
      enabled:false
    },
    xAxis:{
      /*title:{
        text:'Prices'
      },*/
      categories:categories
    },
    series: [{
      type: 'column',
      data: values,
      name:'Risk Contributions'
    }]
  });
}
