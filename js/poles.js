  
/* Radar chart design created by Nadieh Bremer - VisualCinnamon.com */

// data

d3.csv("./data/data_clean.csv", function(data){
	
});


////////////////////////////////////////////////////////////// 
//////////////////////// Set-Up ////////////////////////////// 
////////////////////////////////////////////////////////////// 
var margin = {top: 100, right: 100, bottom: 100, left: 100}
var width = 400
var height = 300;

////////////////////////////////////////////////////////////// 
////////////////////////// Data ////////////////////////////// 
////////////////////////////////////////////////////////////// 
<<<<<<< HEAD
var data = [
		  { name: "Index",
			  axes:[
			{axis:"Economic",value:22},
			{axis:"Education",value:28},
			{axis:"Health",value:29},
			{axis:"Political",value:67}	
		  ]},
		  { name: "Index2",
			  axes:[
			{axis:"Economic",value:32},
			{axis:"Education",value:48},
			{axis:"Health",value:59},
			{axis:"Political",value:17}	
		  ]}
		];
////////////////////////////////////////////////////////////// 
//////////////////// Draw the Chart ////////////////////////// 
////////////////////////////////////////////////////////////// 
	
var radarChartOptions = {
	w: width,
	h: height,
	margin: margin,
	maxValue: 100,
	levels: 5,
	roundStrokes: true,
	color: d3.scaleOrdinal().range([ "#762712", "#26AF32"]),
	format: '.0f'
};

//Call function to draw the Radar chart
RadarChart(".radarChart", data, radarChartOptions);
