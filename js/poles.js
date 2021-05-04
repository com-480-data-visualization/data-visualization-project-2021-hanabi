  
/* Radar chart design created by Nadieh Bremer - VisualCinnamon.com */

////////////////////////////////////////////////////////////// 
//////////////////////// Set-Up ////////////////////////////// 
////////////////////////////////////////////////////////////// 
var margin = {top: 100, right: window.innerWidth/2 - 200, bottom: 100, left: window.innerWidth/2 - 200}
var width = 400
var height = 400
		
////////////////////////////////////////////////////////////// 
////////////////////////// Data ////////////////////////////// 
////////////////////////////////////////////////////////////// 
var data = [
		  [
			{axis:"Economic",value:22},
			{axis:"Education",value:28},
			{axis:"Health",value:29},
			{axis:"Political",value:67}	
		  ]
		];
////////////////////////////////////////////////////////////// 
//////////////////// Draw the Chart ////////////////////////// 
////////////////////////////////////////////////////////////// 
var color = d3.scale.ordinal()
	.range(["#04AA6D"]);
	
var radarChartOptions = {
  w: width,
  h: height,
  margin: margin,
  maxValue: 100,
  levels: 5,
  roundStrokes: true,
  color: color
};

//Call function to draw the Radar chart
RadarChart(".radarChart", data, radarChartOptions);

//make the svg container 
var svgContainer = d3.select("body").append("svg")
.attr("width",window.innerWidth*0.8)
.attr("height",60); 

//make the rectangle 
var country_num = 100;
var width = window.innerWidth*0.8 / country_num;

for( var i = 0 ; i < country_num ; i++ ){
	svgContainer.append("rect")
	.attr("x",i*width)
	.attr("y",10)
	.attr("width", width)
	.attr("height",40)
    .attr('stroke', '#2378ae')
	.attr("classed", "country")
	.style("fill", "#fff8ee");

	svgContainer_timeline.append("text")
	.attr("x", i*c_width + c_width/6)
	.attr("y", c_width + 20)
    .text(String(i+2006));
}

d3.selectAll('rect').classed('country', true)
.on('mouseover', function(d, i) {

	d3.select(this)
	  .transition()
	  .attr("y",0)
	  .attr("height", 60);
	
})
.on('mouseout', function(d, i) {

	d3.select(this)
	  .transition()
	  .attr("y",10)
	  .attr("height", 40);
})
.on('click', function(d, i) {

	var data = [
		[
		  {axis:"Economic",value: Math.random()*100},
		  {axis:"Education",value: Math.random()*100},
		  {axis:"Health",value: Math.random()*100},
		  {axis:"Political",value: Math.random()*100}	
		]
	];
	RadarChart(".radarChart", data, radarChartOptions);

	d3.selectAll(".country")
	  .transition()
	  .style('fill', '#fff8ee');

	d3.select(this)
	  .transition()
	  .style('fill', '#04AA6D');
})