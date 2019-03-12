// Exercice 3 Q2

var weight = 973;
var height = 500;

//Ajouter le curseur
$("#slider").slider({
    value:2012,
    min: 1984,
    max: 2012,
    step: 1,
    slide: function( event, ui ) {
	$("#year").val(ui.value);
	redraw(ui.value.toString());// Animer la carte
    }
});
$("#year").val($("#slider").slider("value") );

var xy = d3.geo.mercator()
    .center([ 13, 50 ]) //Centrer la carte
    .scale(weight/1.5); //Mettre à l'échelle la carte

var path = d3.geo.path()
    .projection(xy);

var svg = d3.select("#graph").append("svg")
    .attr("width", weight)
    .attr("height", height);

var states = svg.append("g")
    .attr("id", "states");

var circles = svg.append("g")
    .attr("id", "circles");

var labels = svg.append("g")
    .attr("id", "labels");

// Exercice 3 Q3

d3.json("Librairie/world-countries.json", function(collection) {
    states.selectAll("path")
	.data(collection.features)
	.enter().append("path")
	.attr("d", path)
});

var scalefactor=2 ; 

d3.csv("Data/etranger.csv", function(csv) {
    circles.selectAll("circle")// Ajouter les cercles
	.data(csv)
	.enter()
	.append("circle")
	.attr("cx", function(d, i) { return xy([+d["longitude"],+d["latitude"]])[0]; })
	.attr("cy", function(d, i) { return xy([+d["longitude"],+d["latitude"]])[1]; })
	.attr("r",  function(d) { return (+d["2012"])*scalefactor; })
	.attr("title",function(d)  { return d["location"]+": "+Math.round(d["2012"])+"%"; })
        .style("fill","#ae2573");

    labels.selectAll("labels")// Ajouter les étiquettes
	.data(csv)
	.enter()
	.append("text")
        .attr("x", function(d, i) { return xy([+d["longitude"],+d["latitude"]])[0]; })
        .attr("y", function(d, i) { return xy([+d["longitude"],+d["latitude"]])[1]; })
        .attr("text-anchor", "middle")
        .text(function(d) { return d["location"]+": "+Math.round(d["2012"])+"%"; });
});

// Exercice 3 Q4
 
function redraw(year) {
    circles.selectAll("circle")// redessine la carte
	.transition()
        .duration(1000).ease("linear")
        .attr("r",  function(d) { return (+d[year])*scalefactor; })
	.attr("title",function(d)  { return d["location"]+": "+Math.round(d[year])+"%"; })
    labels.selectAll("text")// modifie l'étiquette
        .text(function(d)  { return d["location"]+": "+Math.round(d[year])+"%"; });
}
