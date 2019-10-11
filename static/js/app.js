function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
d3.json(`/metadata/${sample}`).then(metadata => {

    var panel = d3.select("#sample-metadata")
    // Use `.html("") to clear any existing metadata
    panel.html("");
    
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    Object.entries(metadata).forEach(([key,value]) => {
      panel.append("p")
      .html(`<b>${key}</b>: ${value}`);
    })



})
  
   
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
d3.json(`/samples/${sample}`).then(data =>{

// @TODO: Build a Bubble Chart using the sample data
  var bubbleInfo = [{
    x: data.otu_ids,
    y: data.sample_values,
    marker: {
      size: data.sample_values,
      color: data.otu_ids
    },
    text: data.otu_labels,
    mode: "markers"
  
  }];
var bubbleLayout = {
  margin: {
    t: 0
  }
}

Plotly.newPlot("bubble", bubbleInfo, bubbleLayout);


    

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).

    var pieInfo = [{
      values:  data.sample_values.slice(0,10),
      labels:  data.otu_ids.slice(0,10),
      hovertext: data.otu_labels.slice(0,10),
      type: 'pie'
    }];

    var pieLayout = {
      height: 500,
      width:  450,
      margin:  {
        l: 0,
        t: 0,
        r: 0
      }
    }
    Plotly.newPlot("pie", pieInfo, pieLayout)
});


}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
