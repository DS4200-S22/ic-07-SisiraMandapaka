/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your scatterplot in this file 

// Append svg object to the body of the page to house Scatterplot1
const svg3 = d3
    .select("#csv-scatter")
    .append("svg")
    .attr("width", width - margin.left - margin.right)
    .attr("height", height - margin.top - margin.bottom)
    .attr("viewBox", [0, 0, width, height]); 

// Plotting 
d3.csv("data/scatter.csv").then((data) => {
  
      // Find max y 
      let maxY3 = d3.max(data, (d) => { return d.score; });
    
      // Create Y scale
      let yScale3 = d3.scaleLinear()
                  .domain([0, maxY3])
                  .range([height - margin.bottom, margin.top]); 
     // Create X scale
     let xScale3 = d3.scaleBand()
                    .domain(d3.range(data.length))
                    .range([margin.left, width-margin.right])
                    .padding(0.1); 

    // Add y axis 
    svg3.append("g")
        .attr("transform", `translate(${margin.left}, 0)`) 
        .call(d3.axisLeft(yScale3))   
        .attr("font-size", '20px');

     // Add x axis 
     svg3.append("g")
     .attr("transform", `translate(0,${height - margin.bottom})`) 
     .call(d3.axisBottom(xScale3)
           .tickFormat(i=> data[i].day))   
     .attr("font-size", '20px');
      // Add points

    /* 

  Tooltip Set-up  

    */

    // selects the hard-coded bar chart 
    const tooltip3 = d3.select("#csv-scatter") 
    //adds a div to hold the tooltip
    .append("div") 
    //gets the id of the tooltip
    .attr('id', "tooltip1") 
    //sets the opacity of the tool tip, totally transparent
    .style("opacity", 0) 
    //selects all tooltips
    .attr("class", "tooltip"); 

    // displays the tooltip w/ 0 transparency + the text when the bar is mousedover
    const mouseover3 = function(event, d) {
        tooltip3.html("Day: " + d.day + "<br> Score: " + d.score + "<br>") 
        .style("opacity", 1);  
    }

    // displays the tooltip in relation to the mouse's location
    const mousemove3 = function(event, d) {
        tooltip3.style("left", (event.pageX)+"px") 
        .style("top", (event.pageY + yTooltipOffset) +"px"); 
    }

    //hides the tooltip when the mouse doesn't hover
        const mouseleave3 = function(event, d) { 
        tooltip3.style("opacity", 0); 
    }

    svg3.selectAll(".bar") 
    .data(data)
    .enter()  
    .append("circle")
        .attr("cx", (d, i) => xScale3(i) + margin.left) 
        .attr("cy", (d) => yScale3(d.score)) 
        .attr("r", 10) 
        .attr("class", "bar")
        .on("mouseover", mouseover3) 
        .on("mousemove", mousemove3)
        .on("mouseleave", mouseleave3);

});
