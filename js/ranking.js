var dataset;

fetch('data/ranking.json')
.then(res => res.json())
.then(data=> {
   console.log(data)
   const totalCovidDataState = data.rank
   console.log(totalCovidDataState)
   const groupedData = processData(totalCovidDataState);
   console.log(groupedData); 
   dataset = groupedData;
   //plotChart(groupedData);
   plotChart_year(dataset);
})

// play-stop button
var state = 'stop';

const sliderValue = document.getElementById("slVal");
const inputSlider = document.getElementById("slIn");
const scoreVal = document.getElementById("scoreVal");
inputSlider.oninput = (()=>{
    let value= inputSlider.value;
    //console.log(value);
    sliderValue.textContent = value;
    //sliderValue.style.left = (value/2) + "%";
    if(state =='pause'||state == 'stop'){
        //alert('hi');
        plotChart_year(dataset);
    }
    //d3.selectAll("rect").remove();
    //d3.selectAll("text").remove();
    //plotChart(data);

})


function buttonPlayPress() {
    if(state=='stop'){
      state='play';
      var button = d3.select("#button_play").classed('btn-success', true); 
      button.select("i").attr('class', "fa fa-pause");  
      plotChart(dataset);
    }
    else if(state=='pause'){
      state = 'resume';
      d3.select("#button_play i").attr('class', "fa fa-pause");  
      plotChart(dataset);      
    }
    console.log("button play pressed, play was "+state);
}

// still
function plotChart_year(data) {
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
   const rectProperties = {height: 20, padding: 10}
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
           .attr("x", d => widthScale(d.value1)/2+ fontSize +300)
           .attr("y", (d,i) => sortedRange.findIndex(e => e.key === d.key) * (rectProperties.height + rectProperties.padding) + fontSize) 

       container
           .selectAll("rect")
           .data(presentData)
           .enter()
           .append("rect")
           .style("fill", d=> findColor(d.value2))
           .on("click", function() {
            location="poles.html"
            })
        
       container
           .selectAll("rect")
           .attr("x", 10+300)
           //.transition()
           //.delay(500)
           .attr("y", (d,i) => sortedRange.findIndex(e => e.key === d.key) * (rectProperties.height + rectProperties.padding))
           .attr("width", d => d.value1*10 <= 0? 0 : widthScale(d.value1)/2)
           .attr("height", 20)
           .on("mouseover", mouseOver)
            .on("mouseout", mouseOut)

   }


   svg
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


    });


   var year = parseInt(inputSlider.value);
    //alert(year);
    var diff = year-2006;
    var ccount = 0;
    //while(flag==1){
        
   for (const date of dateList) {
       //console.log(date);
       if(ccount!=diff){
           ccount+=1;

           continue;
       };

      update(date);
        //await new Promise(done => setTimeout(() => done(), 500));
        //alert(year);
      break;
   } 
    //}

}


//animation 
async function plotChart(data) {
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
   const rectProperties = {height: 20, padding: 10}
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
           .transition()
           .delay(500)
           .attr("x", d => widthScale(d.value1)/2+ fontSize +300)
           .attr("y", (d,i) => sortedRange.findIndex(e => e.key === d.key) * (rectProperties.height + rectProperties.padding) + fontSize) 
         
       container
           .selectAll("rect")
           .data(presentData)
           .enter()
           .append("rect")
           .style("fill", d=> findColor(d.value2))
           .on("click", function() {
            location="poles.html"
            })
        
       container
           .selectAll("rect")
           .attr("x", 10+300)
           .transition()
           .delay(500)
           .attr("y", (d,i) => sortedRange.findIndex(e => e.key === d.key) * (rectProperties.height + rectProperties.padding))
           .attr("width", d => d.value1*10 <= 0? 0 : widthScale(d.value1)/2)
           .attr("height", 20)

   }


   container
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


    });


   var year = parseInt(inputSlider.value);
    //alert(year);
    var diff = year-2006;
    var ccount = 0;
    //while(flag==1){
        
   for (const date of dateList) {
       //console.log(date);
       if(ccount!=diff){
           ccount+=1;

           continue;
       };

      update(date);
        await new Promise(done => setTimeout(() => done(), 500));
        //alert(year);
        sliderValue.textContent = String(year);
        inputSlider.value = String(year);
      year=year+1;
   } 
    //}
    state = 'pause';
    d3.select("#button_play i").attr('class', "fa fa-play"); 

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
    .style("fill", "yellow")
    
  }
function mouseOut() {
    d3.select(this)
    .style("fill", d=> findColor(d.value2))
}