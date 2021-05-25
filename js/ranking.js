var dataset;
let playing = false;

let on_click = false;
let current_click = -1;

fetch('data/ranking.json')
.then(res => res.json())
.then(data=> {
    document.getElementById("button_play").style.backgroundImage = 'url("img/play_button.png")';
    console.log(data)
    const totalDataState = data.rank
    console.log(totalDataState)
    const groupedData = processData(totalDataState);
    console.log(groupedData); 
    dataset = groupedData;
    //plotChart(groupedData);
    plotChart(dataset);
})


let myTimer;
d3.select("#button_play").on("click", function() {
	
	if(playing == false){
		clearInterval (myTimer);
		myTimer = setInterval (function() {
		var b= d3.select("#slIn");
		var t = (+b.property("value") + 1) % (+b.property("max") + 1);
		if (t == 0) { t = +b.property("min"); }
		b.property("value", t);
		changeYear(t);
		}, 1000);
		document.getElementById("button_play").style.backgroundImage = 'url("img/pause_button.png")';
	}
	else{
		clearInterval (myTimer);
		document.getElementById("button_play").style.backgroundImage = 'url("img/play_button.png")';
	}

	playing = !playing
});

function changeYear(year){
    let sliderValue = document.getElementById("slVal");
    let inputSlider = document.getElementById("slIn");
    let value= inputSlider.value;
    if(!isNaN(year)) sliderValue.textContent = value;
    else sliderValue.textContent = value;
    plotChart(dataset)

}

var country_name = "Japan";

// still
function plotChart(data) {

    let sliderValue = document.getElementById("slVal");
    let inputSlider = document.getElementById("slIn");
    d3.selectAll("rect").remove();
    d3.selectAll("image").remove();
    d3.selectAll("text").remove();
    
   const svg = d3.select("#chart")
   //const width = svg.node().clientWidth;
   //const height = svg.node().clientHeight;
   const width = 500;
   const height = 3200;

   const dateList = Array.from(data.keys())
   const fontSize = 16;
   const rectProperties = {height: 4, padding: 2}
   const container = svg.append("g")
                           .classed("container", true)

    
   const update = (date) =>  {
       const presentData = processEachDateData(data.get(date)[0])
       console.log(presentData);

       const widthScale = d3.scaleLinear()
                           .domain([0, d3.max(Object.values(presentData), d => d.value1)])
                           .range([0, width - fontSize - 50])  

       const sortedRange = [...presentData].sort((a,b) => b.value1 - a.value1)
       

       container
           .selectAll("text")
           .data(presentData)
           .enter()
           .append("text")

       container
           .selectAll("text")
           .text((d,i )=> d.key + " "+ "Rank: "+ parseInt(103-parseInt(sortedRange.findIndex(e => e.key === d.key)))+ " ("+d.value3 +")")
           //.text(d =>d.key)
           //.text((d,i) => d.key + " " +sortedRange.findIndex(e => e.key === d.key))
           //.transition()
           //.delay(500)
           .attr("id", (d,i) => "text" + sortedRange.findIndex(e => e.key === d.key))
           .attr("class", (d,i )=> d.key)
           .attr("x", 0)
           .attr("y", 0) 
            .style("opacity",0)
       container
           .selectAll("rect")
           .data(presentData)
           .enter()
           .append("rect")
           .attr("id", (d,i) => "rect" + sortedRange.findIndex(e => e.key === d.key))
           .style("fill", d=> findColor(d.value2))
        
       container
           .selectAll("rect")
           .attr("x", d => d.value1*10 <= 0? 500-0/2 : 500 - (widthScale(d.value1)/2)/2 )
           .attr("y", (d,i) => sortedRange.findIndex(e => e.key === d.key) * (rectProperties.height + rectProperties.padding))
           .attr("width", d => d.value1*10 <= 0? 0 : widthScale(d.value1)/2)
           .attr("height", rectProperties.height)
        
        if( on_click ){
            d3.selectAll("text").style("opacity",0);
            let current = current_click;
            let current_y = d3.select("#rect"+String(current)).attr('y');
            for( let k=0 ; k<=102 ; k++ ){
                
                if ( k < current - 3 ){
                    continue;
                }
                else if ( k >= current - 3 && k < current + 4 ){
                    d3.select("#rect"+String(k))
                    .attr("x", d3.select("#rect"+String(k)).attr('x') - d3.select("#rect"+String(k)).attr('width') * 0.25)
                    .attr("y", current_y - 3 * (rectProperties.height + rectProperties.padding) + 20 * (k-(current-3)))
                    .attr("height", 18)
                    .attr("width", d3.select("#rect"+String(k)).attr('width') * 1.5)

                    d3.select("#text" + String(k))
                    .attr("x", (d3.select("#rect"+String(k)).attr('x') - d3.select("#rect"+String(k)).attr('width') * 0.25)+d3.select("#rect"+String(k)).attr('width') * 1.5 + 10)
                    .attr("y", (current_y - 3 * (rectProperties.height + rectProperties.padding) + 20 * (k-(current-3))+10))
                    .style("opacity", 1)
                }
                else{
                    d3.select("#rect"+String(k))
                    .attr("y", current_y - 3 * (rectProperties.height + rectProperties.padding) + 20 * 7 + (k-(current+4)) * (rectProperties.height + rectProperties.padding) )

                    d3.select("#text" + String(k))
                    .style("opacity", 0)
                }

            }
        }

        container
            .selectAll("rect")
           .on("click", function(d,i){
            d3.selectAll("text").style("opacity",0);


            d3.selectAll("rect")
            .attr("x", d => d.value1*10 <= 0? 500-0/2 : 500 - (widthScale(d.value1)/2)/2 )
            .attr("y", (d,i) => sortedRange.findIndex(e => e.key === d.key) * (rectProperties.height + rectProperties.padding))
            .attr("width", d => d.value1*10 <= 0? 0 : widthScale(d.value1)/2)
            .attr("height", rectProperties.height)
            let current = parseInt(this.id.substring(4));

            if(current >=current_click-3 && current< current_click + 4){
                country_name = d3.select("#text" + String(current)).attr('class')
                location="poles.html?"+country_name;
                return;
            }
            current_click = current;
            
            on_click = true;
            for( let k=0 ; k<=102 ; k++ ){
                
                if ( k < current - 3 ){
                    continue;
                }
                else if ( k >= current - 3 && k < current + 4 ){
                    d3.select("#rect"+String(k))
                    .transition()
                    .delay(10)
                    .attr("x", d3.select("#rect"+String(k)).attr('x') - d3.select("#rect"+String(k)).attr('width') * 0.25)
                    .attr("y", d3.select("#rect"+String(current)).attr('y') - 3 * (rectProperties.height + rectProperties.padding) + 20 * (k-(current-3)))
                    .attr("height", 18)
                    .attr("width", d3.select("#rect"+String(k)).attr('width') * 1.5)

                    d3.select("#text" + String(k))
                    .attr("x", (d3.select("#rect"+String(k)).attr('x') - d3.select("#rect"+String(k)).attr('width') * 0.25)+d3.select("#rect"+String(k)).attr('width') * 1.5 + 10)
                    .attr("y", (d3.select("#rect"+String(current)).attr('y') - 3 * (rectProperties.height + rectProperties.padding) + 20 * (k-(current-3))+10))
                    .style("opacity", 1)
                }
                else{
                    d3.select("#rect"+String(k))
                    .transition()
                    .delay(10)
                    .attr("y", d3.select("#rect"+String(current)).attr('y') - 3 * (rectProperties.height + rectProperties.padding) + 20 * 7 + (k-(current+4)) * (rectProperties.height + rectProperties.padding) )
                    
                    d3.select("#text" + String(k))
                    .style("opacity", 0)
                }

            }
           })
            .on("mouseout",  function(d,i){
                // d3.selectAll("rect")
                // .attr("x", d => d.value1*10 <= 0? 500-0/2 : 500 - (widthScale(d.value1)/2)/2 )
                // .attr("y", (d,i) => sortedRange.findIndex(e => e.key === d.key) * (rectProperties.height + rectProperties.padding))
                // .attr("width", d => d.value1*10 <= 0? 0 : widthScale(d.value1)/2)
                // .attr("height", rectProperties.height)
            })
        
        /*container.selectAll('rect')
        .on("mouseover", mouseOver)
        .on("mouseout", mouseOut)*/
   }


   /*svg
   .on('mousemove', function() {
	y = d3.mouse(this)[1];
	

    container.selectAll("image")
	.remove();

    container.append('image')
    .attr('xlink:href', 'img/left.png')
    .attr('x', 100)
    .attr('y', y)
    .attr('width', 200)
    .attr('height', 200)

    container.append('image')
    .attr('xlink:href', 'img/right.png')
    .attr('x', 650)
    .attr('y', y)
    .attr('width', 200)
    .attr('height', 200)


    });*/


   var year = parseInt(inputSlider.value);
    //alert(year);
    update(dateList[year-2006])

}

function findColor(data){
    const continent = ['Europe', 'Asia', 'South America', 'Oceania', 'Africa', 'North America']
    const color = ['#D87FD4','#86BEEB','#EBAE86','#A186EB','#5BB394','#EB8686']
    var continent_color = 'black';

    for (var i = 0; i < 6; i++) {
        if(continent[i] == data){
            continent_color = color[i];
            break;
        };
    };
    return continent_color;
}

function processData(data) { 
    console.log(data)
   return d3.group(data, d => d.date);
}

function processEachDateData(data) {
   //remove date
   delete data.date
    //normalize
    var mmax = 2.0325203252032518;
    var mmin = 1.1210762331838564;

   return Object.keys(data)
           .map(key => ({key, value1: 0.9*((1/parseFloat(data[key][0])) - mmin)/(mmax-mmin) +0.1 , value2:  data[key][1], value3: d3.format(".3f")(parseFloat(data[key][0])) }))
           // .sort((a,b) => b.value-a.value) 
}
function mouseOver() {
    d3.select(this)
    .attr("height", 20)
    
  }
function mouseOut() {
    d3.select(this)
    .attr("height", 1)
    //.style("fill", d=> findColor(d.value2))
}