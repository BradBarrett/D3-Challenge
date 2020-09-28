// @TODO: YOUR CODE HERE!


let svgWidth = 900;
let svgHeight = 400;

let margin = {
    top: 30,
    right: 40,
    bottom: 40,
    left: 20,
};

let width = svgWidth - margin.left - margin.right;
let height = svgHeight - margin.top - margin.bottom;

// set the div space on the space to hold the chart.
let svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

let chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)




csvPath = "assets/data/data.csv"

d3.csv(csvPath).then(function(liveData, err) {
    if (err) throw err;
    console.log(liveData);

    liveData.forEach(function(data) {
        data.poverty = +data.poverty;
        
        data.povertyMoe = +data.povertyMoe;
        data.age = +data.age;
        data.ageMoe = +data.ageMoe;
        data.income = +data.income;
        data.incomeMoe = +data.incomeMoe;
        data.healthcare = +data.healthcare;
        data.healthcareLow = +data.healthcareLow;
        data.healthcareHigh = +data.healthcareHigh;
        data.obesity = +data.obesity;
        data.obesityLow = +data.obesityLow;
        data.obesityHigh = +data.obesityHigh;
        data.smokes = +data.smokes;
        data.smokesLow = +data.smokesLow;
        data.smokesHigh = +data.smokesHigh;

    });


        //Set axis domain based on data element
        var xLinearScale = d3.scaleLinear()
            .domain([d3.min(liveData, d => d.income), d3.max(liveData, d => d.income)])
            .range([0, width]);

        var yLinearScale = d3.scaleLinear()
            .domain([d3.min(liveData, d => d.obesity), d3.max(liveData, d => d.obesity)])
            .range([0, height]);


        //assign axis variabels
        var yAxis = d3.axisLeft(yLinearScale);
        var xAxis = d3.axisBottom(xLinearScale);
        // call axis varables to append graph
        chartGroup.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis);

        chartGroup.append("g")
            .call(yAxis);
        //add circles to chart
        let circlesGroup = chartGroup.selectAll("circle")
            .data(liveData)
            .enter()
            .append("circle")
            .attr("cx", d => xLinearScale(d.income))
            .attr("cy", d => yLinearScale(d.obesity))
            .attr("r", "12")
            .attr("fill", "grey")
            .attr("opacity", "0.4");

        let stateAbber = chartGroup.selectAll("abbr")
            .data(liveData)
            .enter()
            .append("text")
            .text(d => d.abbr)
            .attr("x", d => xLinearScale(d.income))
            .attr("y", d => yLinearScale(d.obesity))
            .attr("font-size", "10px")
            .style("text-anchor", "middle");

        chartGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 40)
            .attr("x", 0 - (height / 1.5))
            .attr("dy", "1em")
            .attr("class", "axisText")
            .text("Obesity Rate");
            //chart titles
        chartGroup.append("text")
            .attr("transform", `translate(${width / 2.5}, ${height + margin.top+ 10})`)
            .attr("class", "axisText")
            .text("Average Income");

        var toolTip = d3.tip()
            .attr("class", "d3-tip")
            .offset([60 , -40])
            .html(function(d) {
                return (`${d.state}<br>Average Income: ${d.income}<br>Average Obesity Rate: ${d.obesity}`)
            });

        chartGroup.call(toolTip);

        circlesGroup.on("mouseover", function(data) {
            toolTip.show(data, this);
        })





       
});

 






    
