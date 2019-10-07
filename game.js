var data = [
    {
        x: ['Global_Salaes', 'NA_Sales', 'PAL_Sales', 'jp_Sales', 'Other_Sales'],
        y: [693, 489, 250, 308, 529],
        type: 'bar'

    }
];



var data = [{
    values: [693, 489, 250, 308, 529],
    labels: ['Global_Salaes', 'NA_Sales', 'PAL_Sales', 'jp_Sales', 'Other_Sales'],
    type: 'pie'
  }];
  
  var layout = {
    height: 400,
    width: 500
  };
  
  Plotly.newPlot('myDiv', data, layout);



