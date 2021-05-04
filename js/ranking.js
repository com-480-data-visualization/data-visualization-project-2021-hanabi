
//make the svg container 
var width = 1000;
var heightt = 1000;

d3.csv("data/data_index.csv", function(data) {
    
    return data;

}).then(function(data){
    var country_rank = new Map();
    for (var i = 0; i < data.length; i++) {
        //console.log(data[i]);
        if(data[i].Indicator == "Overall Global Gender Gap Index"){
            //console.log(data[i]);
            country_rank.set(data[i]['Country Name'], data[i]['2020']);
            //country_rank.push({"country":data[i]['Country Name'], "index":data[i]['2020']});
            
        }
        
    }

//console.log(country_rank.size);

//make the rectangle 
var country_num = country_rank.size;

var height = heightt*0.8 / country_num;

// sort map by index
const mapSort = new Map([...country_rank.entries()].sort((a, b) => a[1] - b[1]));

var index = [];
var country = [];

mapSort.forEach((value, key) => {
    index.push(1/value);
    country.push(key);
});

//normalize
var mmax = 0;
var mmin = 1000000000;
for(var x=0; x<index.length; x++){ 
    mmax = Math.max(mmax, index[x]);
    mmin = Math.min(mmin, index[x]);
};

for(var x=0; x<index.length; x++) index[x] = 0.9*(index[x] - mmin)/( mmax-mmin) + 0.1;

var svg = d3.select("svg")
var svgContainer = svg.selectAll("g")
.data(country)
.enter()
.append("g")
.attr("width",width)
.attr("height",heightt*0.8); 

//console.log(index.length);

for (var i = 0; i < country_num; i++) {
    
    svgContainer
    .append("rect")
	.attr("x",width/2 - 1/2*index[i]*200)
	.attr("y",(i+1)*height*1.2)
	.attr("width", index[i]*200)
	.attr("height",height*1.2)
    .attr('stroke', '#2378ae')
	.style("fill", "#fff8ee")
    .on("mouseover", mouseOver)
    .on("mouseout", mouseOut)
    
    svgContainer
    .append("text")
    .attr("x",width/2 - 1/2*index[i]*200)
	.attr("y",i*height*1.2)
    .attr("font-size","0px")
    .attr("opacity", "0")
    .text(country[i]);
    
}


function mouseOver() {
    d3.select(this)
    .style('fill', '#04AA6D');
    d3.select(this.nextSibling)
    .attr("font-size","12px")
    .attr("opacity", "1");
    
  }
function mouseOut() {
    d3.select(this)
    .style('fill', '#fff8ee');
    d3.select(this.nextSibling)
    .attr("font-size","0px")
            .attr("opacity", "0");
}

svgContainer.on('mousemove', function() {
	y = d3.mouse(this)[1];
	
	svg.selectAll("line")
	.remove();

	svg.append('line')
	.attr("x1",0)
	.attr("y1",y)
	.attr("x2",400)
	.attr("y2",y)
    .attr("stroke", "#aaa")
    .attr("stroke-width", 50);

    svg.append('line')
	.attr("x1",600)
	.attr("y1",y)
	.attr("x2",1000)
	.attr("y2",y)
    .attr("stroke", "#aaa")
    .attr("stroke-width", 50);
});

});


