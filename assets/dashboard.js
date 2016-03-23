
var portfolio=[
  {
    type:0,//bond
    T:1//maturity in years
  },
  {
    type:1, //EURODOLLARFUTURE
    T:1,//maturity in years
    delta:0.25//tenor
  },
  {
    type:3, //bond call (zero coupon)
    T:1,//maturity in years
    k:0.97,//strike,
    Tm:1.25//underlying Maturity
  },
  {
    type:4, //bond Put (zero coupon)
    T:1,//maturity in years
    k:0.97,//strike,
    Tm:1.25//underlying Maturity
  },
  {
    type:7, //caplet
    T:1,//maturity in years
    k:0.02,//strike,
    delta:0.25//tenor
  },
  {
    type:8, //swap
    T:1,//maturity in years
    k:0.02,//strike,
    delta:0.25//tenor
  },
  {
    type:9, //swaption
    T:1,//maturity in years
    k:0.03,//strike,
    delta:0.25,//tenor
    Tm:6//underlying Maturity
  },
  {
    type:10, //american swaption
    T:1,//maturity in years
    k:0.03,//strike,
    delta:0.25,//tenor
    Tm:6//underlying Maturity
  }
];
var assetNames={
  0:'Bond',
  1:'Euro Dollar Future',
  3:'Bond Call',
  4:'Bond Put',
  7:'Caplet',
  8:'Swap',
  9:'Swaption',
  10:'American Swaption'
};
var socket = io();
//var connection=new WebSocket('ws://192.241.163.28:9002');
//var connection=new WebSocket('ws://localhost:9002');
$('.marketRisk').on('submit', function(e) {
  e.preventDefault();
  //console.log(e);
  var elem=e.target.getElementsByTagName("input");
  var n=elem.length;
  var submissionArray={};
  for(var i=0; i<n; ++i){
    var doubleVal=parseFloat(elem[i].value);
    if(!doubleVal){
      doubleVal=parseFloat(elem[i].placeholder);
    }
    submissionArray[elem[i].id]=doubleVal;//||elem[i].value;
  }
  socket.emit('parameters', {portfolio:portfolio, global:submissionArray});
  if(chart){
    chart.destroy();
  }
  $('#progress').html(Template.progressbar({style:'display:block;', progress:0}));
  $('#showValues').html("");
  $('#riskContributions').html("");
});

socket.on('progress', function (data) {
    $('#progress').html(Template.progressbar({style:'display:block;', progress:data.percent*100}));
});
socket.on('bins', function (data) {
  if(histChart){
    histChart.destroy();
  }
  $('#progress').html(Template.progressbar({style:'display:none;', progress:0}));
  createHistogram(data, "Histogram");
  chart="";
});
socket.on('RC', function (data) {
  if(riskChart){
    riskChart.destroy();
  }
  var n=data.length;
  var categories=[];
  var values=[];
  for(var i=0; i<n; ++i){
    categories.push(assetNames[data[i].Asset]);
    values.push(data[i].Contribution);
  }
  createRiskChart(categories, values);
});
socket.on('Overview', function (data) {
  $('#showValues').html(Template.showValues({overview:data}));
  //console.log(data);
  //socket.emit('my other event', { my: 'data' });
});
socket.on('Error', function (data) {
  console.log(data);
  //socket.emit('my other event', { my: 'data' });
});
socket.on('Fred', function (data) {
  if(histChart){
    histChart.destroy();
  }
  var keys=Object.keys(data)[0];
  createChart(data[keys], keys);
});
