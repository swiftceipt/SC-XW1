
$(function() {
    $( "#tabs" ).tabs();
  });

//fill the y axis data using the parsed data
var month = [1,2,3,4,5,6,7,8,9,10,11,12]
var value = []
for (var i in by_month){
    value.push(by_month[i])
}
var createDataYear = function(x,y,xtitle,ytitle,title,domElement){
    var trace1 = {
        x: x,
        y: y,
        type: 'scatter',
        text: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug','Sep','Oct','Nov','Dec']
        };
    var data = [trace1];
    var layout = {
        title: title,
        xaxis: {
            title: xtitle
        },
        yaxis: {
            title: ytitle
        }
    };
    Plotly.newPlot(domElement, data,layout);

}

var createAxisData = function(data){
    var xaxis = Object.keys(data)
    var yaxis = []
    for (var i in data){
        yaxis.push(data[i])
    }
    return {"xaxis":xaxis,"yaxis":yaxis}
}

var createDataMonth = function(x, y, xtitle, ytitle,title,domElement){
    var data = [
    {
        x: x,
        y: y,
        text: x,
        type: 'bar'
    }
    ];
    layout = {
        title: title,
        xaxis: {
            title: xtitle
        },
        yaxis: {
            title: ytitle
        }
    };
    Plotly.newPlot(domElement, data,layout);
}

//create monthly graph
createDataYear(month,value,"Month","Spendings in dollars","Monthly Spendings",'monthly');
//create January Graph
axis = createAxisData(janurary);
createDataMonth(axis["xaxis"],axis["yaxis"],"Stores","Spendings","Janurary's Spendings",'jan')


