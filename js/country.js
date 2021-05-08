var country_num = 100;

// radarchart option
var radarChartOptions = {
	w: width,
	h: height,
	margin: margin,
	maxValue: 100,
	levels: 5,
	roundStrokes: true,
	color: d3.scaleOrdinal().range(["#26AF32", "#762712"]),
	format: '.0f'
};

// subindex

// console.log(document.getElementById("subindex1").offsetWidth)
// console.log(document.getElementById("subindex1").offsetHeight)

// var subindex_width = document.getElementById("subindex1").offsetWidth
// var subindex_height = document.getElementById("subindex1").offsetHeight

// for( var sub = 0 ; sub<4 ; sub++ ){
//     var svgContainer_subindex = d3.select("#subindex"+String(sub+1)).append("svg")
//     .attr("width",subindex_width)
//     .attr("height",subindex_height);

//     var bar_height = subindex_height * 0.8 / country_num
//     var bar_width = subindex_width * 0.6

//     for( var i = 0 ; i < country_num ; i++ ){
//         svgContainer_subindex.append("rect")
//         .attr("x", subindex_width*0.2)
//         .attr("y",subindex_height*0.1 + i*bar_height)
//         .attr("width",bar_width)
//         .attr("height",bar_height)
//         .attr('stroke', '#2378ae')
//         .style("fill", "#fff8ee");
//     }
// }

//make the svg container 
var svgContainer = d3.select("body").append("svg")
.attr("width",window.innerWidth*0.8)
.attr("height",60); 

//make the rectangle 
var width = window.innerWidth*0.8 / country_num;

for( var i = 0 ; i < country_num ; i++ ){
	svgContainer.append("rect")
	.attr("x",i*width)
	.attr("y",10)
	.attr("width", width)
	.attr("height",40)
    .attr('stroke', '#2378ae')
	.attr("class", "index")
	.style("fill", "#fff8ee");
}

var previous_data = [
    { name: "Index2",
        axes:[
      {axis:"Economic",value: Math.random()*100},
      {axis:"Education",value: Math.random()*100},
      {axis:"Health",value: Math.random()*100},
      {axis:"Political",value: Math.random()*100}	
    ]},
];

d3.selectAll('.index')
.on('mouseover', function() {

    var data = [
        { name: "Index",
            axes:[
          {axis:"Economic",value: Math.random()*100},
          {axis:"Education",value: Math.random()*100},
          {axis:"Health",value: Math.random()*100},
          {axis:"Political",value: Math.random()*100}	
        ]},
    ];

	RadarChart(".radarChart", data.concat(previous_data), radarChartOptions);

	d3.select(this)
	  .transition()
	  .attr("y",0)
	  .attr("height", 60);
	
})
.on('mouseout', function() {

	d3.select(this)
	  .transition()
	  .attr("y",10)
	  .attr("height", 40);
})
.on('click', function() {

	var data = [
        { name: "Index2",
            axes:[
          {axis:"Economic",value: Math.random()*100},
          {axis:"Education",value: Math.random()*100},
          {axis:"Health",value: Math.random()*100},
          {axis:"Political",value: Math.random()*100}	
        ]}
    ];
    previous_data = data;
	RadarChart(".radarChart", data, radarChartOptions);

	d3.selectAll(".index")
	  .transition()
	  .style('fill', '#fff8ee');

	d3.select(this)
	  .transition()
	  .style('fill', '#04AA6D');
})