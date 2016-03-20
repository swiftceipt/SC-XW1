
$(function() {
    $( "#tabs" ).tabs();
  });
$(function () {
    $('#month_graph').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Monthly Spendings of 2016'
        },
        subtitle: {
            text: 'Source: SwiftCeipt'
        },
        xAxis: {
            categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Spendings ($)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} $</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Spending',
            data: [by_month['1'],by_month['2']
            ,by_month['3'],by_month['4'],by_month['5'],by_month['6'],by_month['7'],by_month['8'],by_month['9'],by_month['10'],by_month['11'],by_month['12']]
        }]
    });
});
//janurary
$(function () {
    var stores = Object.keys(janurary);
    var data = [];
    for(i in stores){
        console.log(i);
        store = {};
        store['name'] = stores[i];
        store['y'] = janurary[stores[i]];
        data.push(store);
    }
    console.log(data);

    $(document).ready(function () {

        // Build the chart
        $('#janurary_graph').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Monthly Spending, 2016 January'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: data
            }]
        });
    });
});


//february
$(function () {
    var stores = Object.keys(february);
    var data = [];
    for(i in stores){
        console.log(i);
        store = {};
        store['name'] = stores[i];
        store['y'] = february[stores[i]];
        data.push(store);
    }
    console.log(data);

    $(document).ready(function () {

        // Build the chart
        $('#february_graph').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Monthly Spending, 2016 February'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: data
            }]
        });
    });
});



//march
$(function () {
    var stores = Object.keys(march);
    var data = [];
    for(i in stores){
        console.log(i);
        store = {};
        store['name'] = stores[i];
        store['y'] = march[stores[i]];
        data.push(store);
    }
    console.log(data);

    $(document).ready(function () {

        // Build the chart
        $('#march_graph').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Monthly Spending, 2016 March'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: data
            }]
        });
    });
});



//april
$(function () {
    var stores = Object.keys(april);
    var data = [];
    for(i in stores){
        console.log(i);
        store = {};
        store['name'] = stores[i];
        store['y'] = april[stores[i]];
        data.push(store);
    }
    console.log(data);

    $(document).ready(function () {

        // Build the chart
        $('#april_graph').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Monthly Spending, 2016 April'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: data
            }]
        });
    });
});