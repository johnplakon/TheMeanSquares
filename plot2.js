function init() {
    var data = [{
      values: [489, 250, 308, 529],
      labels: ["NA_Sales", "PAL_Sales", "JP_Sales", "Other_Sales"],
      type: "pie"
    }];
  
    var layout = {
      height: 600,
      width: 800
    };
  
    Plotly.plot("pie", data, layout);
  }
  
  function updatePlotly(newdata) {
    var PIE = document.getElementById("pie");
    Plotly.restyle(PIE, "values", [newdata]);
  }
  
  
  
  init();