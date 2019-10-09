
// $npm install plotly.js plotly.js
// import plot from plotly.js


var data = [{
    
        values: ['Global_Salaes', 'NA_Sales', 'PAL_Sales', 'jp_Sales', 'Other_Sales'],
        labels: [693, 489, 250, 308, 529],
        type: 'pie'

    }];
  

  var layout = {
    height: 400,
    width:500
  };


var data_1 = [{
    values: [489, 250, 308,],
    labels: ['NA_Sales', 'PAL_Sales', 'jp_Sales',],
    type: 'pie'
  }];
  
  var layout = {
    height: 400,
    width: 500
  };
  
  Plotly.newPlot('pie-plot', data_1, layout);
  





