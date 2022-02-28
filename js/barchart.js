/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your bar charts in this file 


// Set dimensions and margins for plots 
const width = 900; 
const height = 450; 
const margin = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffset = 15; 


// Creates the shapes involved in the bar chart, with the bars and the box surrounding it
const svg1 = d3
  .select("#hard-coded-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

// Hardcoded barchart data
const data1 = [
  {name: 'A', score: 92},
  {name: 'B', score: 15},
  {name: 'C', score: 67},
  {name: 'D', score: 89},
  {name: 'E', score: 53},
  {name: 'F', score: 91},
  {name: 'G', score: 18}
];

/*

  Axes

*/ 

// Takes the maximum score of each category on the x axis
let maxY1 = d3.max(data1, function(d) { return d.score; });

// Sets a linear scale for the y-axis
let yScale1 = d3.scaleLinear()
            //sets the domain of values on the y-axis
            .domain([0,maxY1])
            //sets the range of values on the y-axis
            .range([height-margin.bottom,margin.top]); 

// Sets a banded scale for the x-axi
let xScale1 = d3.scaleBand()
            .domain(d3.range(data1.length))
            .range([margin.left, width - margin.right])
            //adds padding to the x-axis
            .padding(0.1); 

//appends a placeholder svg/general svg class
svg1.append("g")
    //places the svg on the y-axis
   .attr("transform", `translate(${margin.left}, 0)`) 
   //scales the svg according to the y-scale
   .call(d3.axisLeft(yScale1)) 
   .attr("font-size", '20px'); 

//appends a placeholder svg/general svg class
svg1.append("g")
    //places the svg on the x-axis
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    //scales the svg according to the x-scale
    .call(d3.axisBottom(xScale1) 
            //sets the category names for the bars on the x-axis
            .tickFormat(i => data1[i].name))  
    .attr("font-size", '20px'); 

/* 

  Tooltip Set-up  

*/

// selects the hard-coded bar chart 
const tooltip1 = d3.select("#hard-coded-bar") 
                //adds a div to hold the tooltip
                .append("div") 
                //gets the id of the tooltip
                .attr('id', "tooltip1") 
                //sets the opacity of the tool tip, totally transparent
                .style("opacity", 0) 
                //selects all tooltips
                .attr("class", "tooltip"); 

// displays the tooltip w/ 0 transparency + the text when the bar is mousedover
const mouseover1 = function(event, d) {
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
          .style("opacity", 1);  
}

// displays the tooltip in relation to the mouse's location
const mousemove1 = function(event, d) {
  tooltip1.style("left", (event.pageX)+"px") 
          .style("top", (event.pageY + yTooltipOffset) +"px"); 
}

//hides the tooltip when the mouse doesn't hover
const mouseleave1 = function(event, d) { 
  tooltip1.style("opacity", 0); 
}

/* 

  Bars 

*/

// displays all objects with the class bar, adds the bars to the chart
svg1.selectAll(".bar") 
   .data(data1) 
   .enter()  
   .append("rect") 
     .attr("class", "bar") 
     .attr("x", (d,i) => xScale1(i)) 
     .attr("y", (d) => yScale1(d.score)) 
     .attr("height", (d) => (height - margin.bottom) - yScale1(d.score)) 
     .attr("width", xScale1.bandwidth()) 
     .on("mouseover", mouseover1) 
     .on("mousemove", mousemove1)
     .on("mouseleave", mouseleave1);


//new barchart
// Plotting 
/*

  Axes

*/ 
  const svg2 = d3
    .select("#csv-bar")
    .append("svg")
    .attr("width", width-margin.left-margin.right)
    .attr("height", height - margin.top - margin.bottom)
    .attr("viewBox", [0, 0, width, height]);

  d3.csv("data/barchart.csv").then((data) => {

    let maxY2 = d3.max(data, function(d) { return d.score; });

    let yScale2 = d3.scaleLinear()
                //sets the domain of values on the y-axis
                .domain([0,maxY2])
                //sets the range of values on the y-axis
                .range([height-margin.bottom,margin.top]); 

    let xScale2 = d3.scaleBand()
                .domain(d3.range(data.length))
                .range([margin.left, width - margin.right])
                //adds padding to the y-axis
                .padding(0.1); 

    svg2.append("g")
      .attr("transform", `translate(${margin.left}, 0)`) 
      .call(d3.axisLeft(yScale2)) 
      .attr("font-size", '20px'); 

    svg2.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`) 
        .call(d3.axisBottom(xScale2) 
                .tickFormat(i => data[i].name))  
        .attr("font-size", '20px'); 

    /* 

      Tooltip Set-up  

    */

    let tooltip2 = d3.select("#csv-bar") 
                    .append("div") 
                    .attr('id', "tooltip2") 
                    .style("opacity", 0) 
                    .attr("class", "tooltip"); 

    mouseover2 = function(event, d) {
      tooltip2.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
              .style("opacity", 1);  
    }

    mousemove2 = function(event, d) {
      tooltip2.style("left", (event.pageX)+"px") 
              .style("top", (event.pageY + yTooltipOffset) +"px"); 
    }

    mouseleave2 = function(event, d) { 
      tooltip2.style("opacity", 0); 
    }

    /* 

      Bars 

    */

    // TODO: What does each line of this code do? 
    svg2.selectAll(".bar") 
      .data(data) 
      .enter()  
      .append("rect") 
        .attr("class", "bar") 
        .attr("x", (d,i) => xScale1(i)) 
        .attr("y", (d) => yScale1(d.score)) 
        .attr("height", (d) => (height - margin.bottom) - yScale1(d.score)) 
        .attr("width", xScale1.bandwidth()) 
        .on("mouseover", mouseover2) 
        .on("mousemove", mousemove2)
        .on("mouseleave", mouseleave2);
});
