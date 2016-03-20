
$(function() {
    $( "#tabs" ).tabs();
  });



$(function () {
    $('#month_graph').highcharts({
        title: {
            text: 'Monthly Average Temperature',
            x: -20 //center
        },
        subtitle: {
            text: 'Source: WorldClimate.com',
            x: -20
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            title: {
                text: 'Temperature (°C)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '°C'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: '2016',
            data: [by_month['1'],by_month['2']
            ,by_month['3'],by_month['4'],by_month['5'],
            by_month['6'],by_month['7'],by_month['8'],
            by_month['9'],by_month['10'],by_month['11'],by_month['12']]
        }]
    });
});

//january
$(function () {
    var stores = Object.keys(janurary);
    var data = [];
    for(i in stores){
        console.log(i);
        store = {};
        store['name'] = stores[i];
        store['data'] = [janurary[stores[i]]];
        data.push(store);
    }
    console.log(data);
    $('#janurary_graph').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Column chart with negative values'
        },
        xAxis: {
            categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        credits: {
            enabled: false
        },
        series: data    });
});

//february
$(function () {
    var stores = Object.keys(february);
    var data = [];
    for(i in stores){
        console.log(i);
        store = {};
        store['name'] = stores[i];
        store['data'] = [february[stores[i]]];
        data.push(store);
    }
    console.log(data);
    $('#february_graph').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Column chart with negative values'
        },
        xAxis: {
            categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        credits: {
            enabled: false
        },
        series: data    });
});


//march
$(function () {
    var stores = Object.keys(march);
    var data = [];
    for(i in stores){
        console.log(i);
        store = {};
        store['name'] = stores[i];
        store['data'] = [march[stores[i]]];
        data.push(store);
    }
    console.log(data);
    $('#march_graph').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Column chart with negative values'
        },
        xAxis: {
            categories: ['Money', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        credits: {
            enabled: false
        },
        series: data    });
});




//april
$(function () {
    var stores = Object.keys(april);
    var data = [];
    for(i in stores){
        console.log(i);
        store = {};
        store['name'] = stores[i];
        store['data'] = [april[stores[i]]];
        data.push(store);
    }
    console.log(data);
    $('#april_graph').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Column chart with negative values'
        },
        xAxis: {
            categories: ['Money', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        credits: {
            enabled: false
        },
        series: data    });
});






//may
$(function () {
    var stores = Object.keys(may);
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
        $('#may_graph').highcharts({
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





//june
$(function () {
    var stores = Object.keys(june);
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
        $('#june_graph').highcharts({
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





//july
$(function () {
    var stores = Object.keys(july);
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
        $('#july_graph').highcharts({
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





//august
$(function () {
    var stores = Object.keys(august);
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
        $('#august_graph').highcharts({
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




//sept
$(function () {
    var stores = Object.keys(step);
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
        $('#sept_graph').highcharts({
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





//oct
$(function () {
    var stores = Object.keys(oct);
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
        $('#oct_graph').highcharts({
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




//nov
$(function () {
    var stores = Object.keys(nov);
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
        $('#nov_graph').highcharts({
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




//dec
$(function () {
    var stores = Object.keys(dec);
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
        $('#dec_graph').highcharts({
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