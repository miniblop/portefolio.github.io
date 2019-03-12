// Exercice 2 Q2

var margin = {top: 30, right: 20, bottom: 70, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var parseTime = d3.time.format("%Y").parse;

var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);
var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);

var line = d3.svg.line()	
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.fertility); });

// Exercice 2 Q3

var svg = d3.select("article")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");

d3.csv("Data/fertility.csv", function(error, data) {
    data.forEach(function(d) {
	d.year = parseTime(d.year);
	d.fertility = +d.fertility;
    });

    x.domain(d3.extent(data, function(d) { return d.year; }));
    y.domain([0, d3.max(data, function(d) { return d.fertility; })]).nice();

    var dataNest = d3.nest()
        .key(function(d) {return d.location;})
        .entries(data);

    var color = d3.scale.category10(); 

    legendSpace = width/dataNest.length; 

    dataNest.forEach(function(d,i) { 
        svg.append("path")
            .attr("class", "line")
            .style("stroke", function() { 
                return d.color = color(d.key); })
	    .attr("id", 'tag'+d.key.replace(/\s+/g, ''))
            .attr("d", line(d.values));            

        svg.append("text")
            .attr("x", (legendSpace/2)+i*legendSpace)
            .attr("y", height + (margin.bottom/2)+ 5)
            .attr("class", "legend")
            .style("fill", function() {
                return d.color = color(d.key); })
	    .on("click", function(){
                var active   = d.active ? false : true,
                newOpacity = active ? 0 : 1; 
                d3.select("#tag"+d.key.replace(/\s+/g, ''))
                    .transition().duration(100) 
                    .style("opacity", newOpacity); 
                d.active = active;
                })  
            .text(d.key); 
    });

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);  
            
});

