var svgContainer_timeline = d3.select("body").append("svg")
.attr("width",window.innerWidth*0.5);

var country_num = 15;
var c_width = window.innerWidth*0.5 / country_num;
svgContainer_timeline.attr("height", c_width+20); 
//make the rectangle 

for( var i = 0 ; i < country_num ; i++ ){
 	svgContainer_timeline.append("circle")
	.attr("cx", i*c_width + c_width/2)
	.attr("cy", c_width/2)
	.attr("r", c_width/2)
    .attr("classed", "timeline")
    .attr('stroke', '#2378ae')
	.style("fill", "#fff8ee");

    svgContainer_timeline.append("text")
	.attr("x", i*c_width + c_width/6)
	.attr("y", c_width + 20)
    .text(String(i+2006));
}


d3.selectAll('circle').classed('timeline', true)
.on('mouseover', function() {

	var data = [
		[
		  {axis:"Economic",value: Math.random()*100},
		  {axis:"Education",value: Math.random()*100},
		  {axis:"Health",value: Math.random()*100},
		  {axis:"Political",value: Math.random()*100}	
		]
	];
	RadarChart(".radarChart", data, radarChartOptions);

    d3.selectAll(".timeline")
    .transition()
    .attr("r", c_width/2)
    .style('fill', '#fff8ee');

	d3.select(this)
	.transition()
    .attr("r", c_width/4)
	.style('fill', '#04AA6D');
});