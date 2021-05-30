  
/* Radar chart design created by Nadieh Bremer - VisualCinnamon.com */
//alert(country_name);

//get couontry name
let url = window.location;

// current value
let current_country1 = url.toString().split("?")[1].replaceAll('%20', ' ');
let current_country2 = url.toString().split("?")[1].replaceAll('%20', ' ');
let current_year = "2006";
let data_full;
let playing = false;

// data
fetch('data/poles.json')
.then(res => res.json())
.then(data => {
	data_full = data;
	document.getElementById("button_play").style.backgroundImage = 'url("img/play_button.png")';

	console.log(data);
	add_flag(data);
	plot_radar(current_country1, current_country2, '2006');
	change_country1(current_country1);
	change_country2(current_country2);

})

function add_flag(data){
	let glide_flag = document.getElementById('glider');
	for( let key in data ){
		glide_flag.innerHTML += "<div id='" + key +"'> <span class=\"flag-icon flag-icon-"+data[key]['iso2'].toLowerCase()+"\" style=\"width:100%;height:80px;\"></span> </div>";
	}

	new Glider(document.querySelector('.glider'), {
		slidesToShow: 5,
		slidesToScroll: 1,
		dots: '.dots',
		draggable: true,
		arrows: {
			prev: '.glider-prev',
			next: '.glider-next',
		}
	});

	for( let key in data ){

		$("[id='"+key+"']").on('click', function() {
			current_country1 = key
			plot_radar(current_country1, current_country2, current_year);
			change_country1(current_country1);
		});

		$("[id='"+key+"']").hover(function() {
			current_country2 = key
			plot_radar(current_country1, current_country2, current_year);
			change_country2(current_country2);
		});

	}
}


function change_country1(country){
	let flag = document.getElementById('flag1');
	flag.innerHTML = "<div id='" + country +"'> <span class=\"flag-icon flag-icon-"+data_full[country]['iso2'].toLowerCase()+"\" style=\"width:100%;height:80px; background-color: #8cc9f0;\"></span> </div>";
	let country_name = document.getElementById("country_name1");
	country_name.textContent = country;
	let education = document.getElementById("education1");
	education.textContent = "Education Rank: " + data_full[country]["Global Gender Gap Educational Attainment Subindex:Rank"][current_year];
	let economy = document.getElementById("economy1");
	economy.textContent = "Economy Rank: " + data_full[country]["Global Gender Gap Economic Participation and Opportunity Subindex:Rank"][current_year];
	let health = document.getElementById("health1");
	health.textContent = "Health Rank: " + data_full[country]["Global Gender Gap Health and Survival Subindex:Rank"][current_year];
	let politic = document.getElementById("politic1");
	politic.textContent = "Political Rank: " + data_full[country]["Global Gender Gap Political Empowerment subindex:Rank"][current_year];
}
function change_country2(country){
	let flag = document.getElementById('flag2');
	flag.innerHTML = "<div id='" + country +"'> <span class=\"flag-icon flag-icon-"+data_full[country]['iso2'].toLowerCase()+"\" style=\"width:100%;height:80px; background-color: #efa8b0\"></span> </div>";
	let country_name = document.getElementById("country_name2");
	country_name.textContent = country;
	let education = document.getElementById("education2");
	education.textContent = "Education Rank: " + data_full[country]["Global Gender Gap Educational Attainment Subindex:Rank"][current_year];
	let economy = document.getElementById("economy2");
	economy.textContent = "Economy Rank: " + data_full[country]["Global Gender Gap Economic Participation and Opportunity Subindex:Rank"][current_year];
	let health = document.getElementById("health2");
	health.textContent = "Health Rank: " + data_full[country]["Global Gender Gap Health and Survival Subindex:Rank"][current_year];
	let politic = document.getElementById("politic2");
	politic.textContent = "Political Rank: " + data_full[country]["Global Gender Gap Political Empowerment subindex:Rank"][current_year];
}



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
    
	current_year = String(value)
	plot_radar(current_country1, current_country2, current_year)
	change_country1(current_country1)
	change_country2(current_country2)

}


function plot_radar(country1, country2, year){
	////////////////////////////////////////////////////////////// 
	//////////////////////// Set-Up ////////////////////////////// 
	////////////////////////////////////////////////////////////// 
	var margin = {top: 100, right: 100, bottom: 100, left: 100}
	var width = 300
	var height = 300
			
	////////////////////////////////////////////////////////////// 
	////////////////////////// Data ////////////////////////////// 
	////////////////////////////////////////////////////////////// 
	var data = [
			{ name: "Index",
				axes:[
				{axis:"Economic",value: data_full[country1]["Global Gender Gap Economic Participation and Opportunity Subindex:Index"][year]},
				{axis:"Education",value: data_full[country1]["Global Gender Gap Educational Attainment Subindex:Index"][year]},
				{axis:"Health",value: data_full[country1]["Global Gender Gap Health and Survival Subindex:Index"][year]},
				{axis:"Political",value: data_full[country1]["Global Gender Gap Political Empowerment subindex:Index"][year]}	
			]},
			{ name: "Index2",
				axes:[
				{axis:"Economic",value: data_full[country2]["Global Gender Gap Economic Participation and Opportunity Subindex:Index"][year]},
				{axis:"Education",value: data_full[country2]["Global Gender Gap Educational Attainment Subindex:Index"][year]},
				{axis:"Health",value: data_full[country2]["Global Gender Gap Health and Survival Subindex:Index"][year]},
				{axis:"Political",value: data_full[country2]["Global Gender Gap Political Empowerment subindex:Index"][year]}	
			]}
			];
	////////////////////////////////////////////////////////////// 
	//////////////////// Draw the Chart ////////////////////////// 
	////////////////////////////////////////////////////////////// 
		
	var radarChartOptions = {
		w: width,
		h: height,
		margin: margin,
		maxValue: 1,
		levels: 5,
		roundStrokes: true,
		color: d3.scaleOrdinal().range([ "#8cc9f0", "#efa8b0"]),
		format: '.2f'
	};

	//Call function to draw the Radar chart
	RadarChart(".radarChart", data, radarChartOptions);
}
