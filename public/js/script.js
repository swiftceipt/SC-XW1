
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
        x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug','Sep','Oct','Nov','Dec'],
        y: y,
        type: 'scatter',
        text: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug','Sep','Oct','Nov','Dec']
        };
    var data = [trace1];
    var layout = {
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


var createDataMonth = function(x, y, xtitle, ytitle,title,domElement,domMsgElement){
    if (x.length==0 && y.length==0){
        //display message saying there is no spendings for this month
        console.log("empty");
         document.getElementById(domMsgElement).innerHTML = "You did not spend any money this month";
    }
    else{
        var data = [
        {
            x: x,
            y: y,
            text: x,
            type: 'bar'
        }
        ];
        layout = {
            xaxis: {
                title: xtitle
            },
            yaxis: {
                title: ytitle
            }
        };
        Plotly.newPlot(domElement, data,layout);
    }
}

//create monthly graph
createDataYear(month,value,"Month","Spendings in dollars($)","Monthly Spendings",'monthly');


//create January Graph
axis1 = createAxisData(janurary);
createDataMonth(axis1["xaxis"],axis1["yaxis"],
    "Stores","Spendings in dollars($)","Janurary's Spendings",'jan','jan-message')
//create February Graph
axis2 = createAxisData(february);
createDataMonth(axis2["xaxis"],axis2["yaxis"],
    "Stores","Spendings in dollars($)","February's Spendings",'feb','feb-message')
//create March Graph
axis3 = createAxisData(march);
createDataMonth(axis3["xaxis"],axis3["yaxis"],
    "Stores","Spendings in dollars($)","March's Spendings",'mar','mar-message')
//create April Graph
axis4 = createAxisData(april);
createDataMonth(axis4["xaxis"],axis4["yaxis"],
    "Stores","Spendings in dollars($)","April's Spendings",'apr','apr-message')
//create May Graph
axis5 = createAxisData(may);
createDataMonth(axis5["xaxis"],axis5["yaxis"],
    "Stores","Spendings in dollars($)","May's Spendings",'may','may-message')
//Create June Graph
axis6 = createAxisData(june);
createDataMonth(axis6["xaxis"],axis6["yaxis"],
    "Stores","Spendings in dollars($)","June's Spendings",'jun','jun-message')
//create July Graph
axis7 = createAxisData(july);
createDataMonth(axis7["xaxis"],axis7["yaxis"],
    "Stores","Spendings in dollars($)","July's Spendings",'jul','jul-message')
//create August graph
axis8 = createAxisData(august);
createDataMonth(axis8["xaxis"],axis8["yaxis"],
    "Stores","Spendings in dollars($)","August's Spendings",'aug','aug-message')
//create september graph
axis9 = createAxisData(september);
createDataMonth(axis9["xaxis"],axis9["yaxis"],
    "Stores","Spendings in dollars($)","September's Spendings",'sep','sep-message')
//create october graph
axis10 = createAxisData(october);
createDataMonth(axis10["xaxis"],axis10["yaxis"],
    "Stores","Spendings in dollars($)","October's Spendings",'oct','oct-message')
//create november graph
axis11 = createAxisData(november);
createDataMonth(axis11["xaxis"],axis11["yaxis"],
    "Stores","Spendings in dollars($)","November's Spendings",'nov','nov-message')
//create december graph
axis12 = createAxisData(december);
createDataMonth(axis12["xaxis"],axis12["yaxis"],
    "Stores","Spendings in dollars($)","December's Spendings",'dec','dec-message')




