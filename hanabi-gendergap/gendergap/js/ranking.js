let dataset;
let playing = false;

let on_click = false;
let current_click = -100;
let continent_tmp = "world";
let country_name = "Japan";

fetch('data/ranking.json')
    .then(res => res.json())
    .then(data => {
        //document.getElementById("button_play1").innerHTML = '<i class="fa fa-play"></i>';// pause icon
        console.log(data)
        const totalDataState = data.rank
        console.log(totalDataState)
        const groupedData = processData(totalDataState);
        console.log(groupedData);
        dataset = groupedData;
        plotChart(dataset, "world");
    })

function changeIcon(){
    if(!playing){
        document.getElementById("button_play1").innerHTML = '<i class="fa fa-pause"></i>';
    }
    else
        document.getElementById("button_play1").innerHTML = '<i class="fa fa-play"></i>';

}
//btn
function con_world() {
    on_click = false
    continent_tmp = "world"
    current_click = -100;
    plotChart(dataset, "world");
};

function con_eu() {
    on_click = false
    continent_tmp = "Europe"
    current_click = -100;
    plotChart(dataset, "Europe");
};

function con_asia() {
    on_click = false
    continent_tmp = "Asia"
    current_click = -100;
    plotChart(dataset, "Asia");
};

function con_ocean() {
    on_click = false
    continent_tmp = "Oceania"
    current_click = -100;
    plotChart(dataset, "Oceania");
};

function con_north() {
    on_click = false
    continent_tmp = "North America"
    current_click = -100;
    plotChart(dataset, "North America");
};

function con_south() {
    on_click = false
    continent_tmp = "South America"
    current_click = -100;
    plotChart(dataset, "South America");
};

function con_afri() {
    on_click = false
    continent_tmp = "Africa"
    current_click = -100;
    plotChart(dataset, "Africa");
};

//slider
let myTimer;
d3.select("#button_play1").on("click", function () {

    if (playing == false) {
        clearInterval(myTimer);
        myTimer = setInterval(function () {
            let b = d3.select("#slIn1");
            let t = (+b.property("value") + 1) % (+b.property("max") + 1);
            if (t == 0) { t = +b.property("min"); }
            b.property("value", t);
            changeYearRank(t);
        }, 1500);
        //document.getElementById("button_play1").innerHTML = '<i class="fa fa-pause"></i>';// pause icon
    }
    else {
        clearInterval(myTimer);
        //document.getElementById("button_play1").innerHTML = '<i class="fa fa-play"></i>';// pause icon
    }

    playing = !playing
});

function changeYearRank(year) {
    let sliderValue = document.getElementById("slVal1");
    let inputSlider = document.getElementById("slIn1");
    let value = inputSlider.value;
    if (!isNaN(year)) sliderValue.textContent = value;
    else sliderValue.textContent = value;
    plotChart(dataset, continent_tmp)

}

// main func
function plotChart(data, continent) {

    let sliderValue = document.getElementById("slVal1");
    let inputSlider = document.getElementById("slIn1");
    d3.selectAll("rect").remove();
    //d3.selectAll("image").remove();
    d3.selectAll("text").remove();

    const svg = d3.select("#chart")
    const width = 500;
    const height = 3200;

    const dateList = Array.from(data.keys())
    const fontSize = 16;
    const rectProperties = { height: 3.8, padding: 0.2 }
    const container = svg.append("g")
        .classed("container", true)


    const update = (date) => {
        const presentData = processEachDateData(data.get(date)[0], continent)
        console.log(presentData);

        const widthScale = d3.scaleLinear()
            .domain([0, d3.max(Object.values(presentData), d => d.value1)])
            .range([0, width - fontSize - 50])

        const sortedRange = [...presentData].sort((a, b) => b.value1 - a.value1)


        container
            .selectAll("text")
            .data(presentData)
            .enter()
            .append("text")

        container
            .selectAll("text")
            .text((d, i) => d.key + " " + parseInt(103 - parseInt(sortedRange.findIndex(e => e.key === d.key))) + "°" + " (" + d.value3 + ")")
            .attr("id", (d, i) => "text" + sortedRange.findIndex(e => e.key === d.key))
            .attr("class", (d, i) => d.key)
            .attr("x", 0)
            .attr("y", 0)
            .style("opacity", 0)
            
        container
            .selectAll("rect")
            .data(presentData)
            .enter()
            .append("rect")
            .attr("id", (d, i) => "rect" + sortedRange.findIndex(e => e.key === d.key))
            .style("fill", d => findColor(d.value2))
            .style("opacity", 0.95)



        container
            .selectAll("rect")
            .attr("x", d => d.value1 * 10 <= 0 ? 500 - 0 / 2 : 500 - (widthScale(d.value1) / 2) / 2 * 1.6)
            .attr("y", (d, i) => sortedRange.findIndex(e => e.key === d.key) * (rectProperties.height + rectProperties.padding))
            .attr("width", d => d.value1 * 10 <= 0 ? 0 : widthScale(d.value1) / 2 * 1.6)
            .attr("height", rectProperties.height)

        if (on_click) {
            d3.selectAll("text").style("opacity", 0);
            let current = current_click;
            let current_y = d3.select("#rect" + String(current)).attr('y');
            let move = 3;
            if (current < 3) {
                move = current;
            }
            for (let k = 0; k <= 102; k++) {

                if (k < current - 3) {
                    continue;
                }
                else if (k >= current - 3 && k < current + 4) {

                    d3.select("#text" + String(k))
                        .attr("x", (d3.select("#rect" + String(k)).attr('x') - d3.select("#rect" + String(k)).attr('width') * 0.25) + d3.select("#rect" + String(k)).attr('width') * 1.5 + 10)
                        .attr("y", (current_y - move * (rectProperties.height + rectProperties.padding) + 20 * (k - (current - move)) + 15))
                        .style("opacity", 1)
                        

                    d3.select("#rect" + String(k))
                        .attr("x", d3.select("#rect" + String(k)).attr('x') - d3.select("#rect" + String(k)).attr('width') * 0.25)
                        .attr("y", current_y - move * (rectProperties.height + rectProperties.padding) + 20 * (k - (current - move)))
                        .attr("height", 18)
                        .attr("width", d3.select("#rect" + String(k)).attr('width') * 1.5)


                }
                else {
                    d3.select("#rect" + String(k))
                        .attr("y", current_y - move * (rectProperties.height + rectProperties.padding) + 20 * (7 - (3 - move)) + (k - (current + 4)) * (rectProperties.height + rectProperties.padding))

                    d3.select("#text" + String(k))
                        .style("opacity", 0)
                }

            }
        }

        container
            .selectAll("rect")
            .on("mouseover", function (d, i) {
                d3.select(this).style("opacity", 1)
            })
            .on("mouseout", function (d, i) {
                d3.select(this).style("opacity", 0.7)
            })
            .on("click", function (d, i) {
                d3.selectAll("text").style("opacity", 0);


                d3.selectAll("rect")
                    .attr("x", d => d.value1 * 10 <= 0 ? 500 - 0 / 2 : 500 - (widthScale(d.value1) / 2) / 2 * 1.6)
                    .attr("y", (d, i) => sortedRange.findIndex(e => e.key === d.key) * (rectProperties.height + rectProperties.padding))
                    .attr("width", d => d.value1 * 10 <= 0 ? 0 : widthScale(d.value1) / 2 * 1.6)
                    .attr("height", rectProperties.height)
                let current = parseInt(this.id.substring(4));

                if (current >= current_click - 3 && current < current_click + 4) {
                    country_name = d3.select("#text" + String(current)).attr('class');
                    plot_radar(country_name, 'Italy', 2020);
                    change_country1(country_name);
                    change_country2('Italy');
                    fullpage_api.moveSectionDown();
                    //location = "poles.html?" + country_name;
                    //return;
                }
                current_click = current;
                on_click = true;
                let move = 3;
                if (current < 3) {
                    move = current;
                }
                for (let k = 0; k <= 102; k++) {

                    if (k < current - 3) {
                        continue;
                    }
                    else if (k >= current - 3 && k < current + 4) {

                        d3.select("#text" + String(k))
                            .attr("x", (d3.select("#rect" + String(k)).attr('x') - d3.select("#rect" + String(k)).attr('width') * 0.25) + d3.select("#rect" + String(k)).attr('width') * 1.5 + 10)
                            .attr("y", (d3.select("#rect" + String(current)).attr('y') - move * (rectProperties.height + rectProperties.padding) + 20 * (k - (current - move)) + 15))
                            .style("opacity", 1)

                        d3.select("#rect" + String(k))
                            .transition()
                            .delay(10)
                            .attr("x", d3.select("#rect" + String(k)).attr('x') - d3.select("#rect" + String(k)).attr('width') * 0.25)
                            .attr("y", d3.select("#rect" + String(current)).attr('y') - move * (rectProperties.height + rectProperties.padding) + 20 * (k - (current - move)))
                            .attr("height", 18)
                            .attr("width", d3.select("#rect" + String(k)).attr('width') * 1.5)

                    }
                    else {
                        d3.select("#rect" + String(k))
                            .transition()
                            .delay(10)
                            .attr("y", d3.select("#rect" + String(current)).attr('y') - move * (rectProperties.height + rectProperties.padding) + 20 * (7 - (3 - move)) + (k - (current + 4)) * (rectProperties.height + rectProperties.padding))

                        d3.select("#text" + String(k))
                            .style("opacity", 0)
                    }

                }
            })
    }

    let year = parseInt(inputSlider.value);
    update(dateList[year - 2006])

}

function findColor(data) {
    const continent = ['Europe', 'Asia', 'Oceania', 'Africa', 'North America','South America']
    const color = ['#3C1642', '#613950', '#875D5E', '#AC806C', '#D2A47A', '#F7C788']
    let continent_color = 'black';

    for (let i = 0; i < 6; i++) {
        if (continent[i] == data) {
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

function processEachDateData(data, continent) {
    //remove date
    delete data.date
    //normalize
    let mmax = 2.0325203252032518;
    let mmin = 1.1210762331838564;

    if (continent == "world") {
        return Object.keys(data)
            .map(key => ({ key, value1: 0.9 * ((1 / parseFloat(data[key][0])) - mmin) / (mmax - mmin) + 0.1, value2: data[key][1], value3: d3.format(".3f")(parseFloat(data[key][0])) }))

    }
    return Object.keys(data)
        .filter(function (key) {
            if (data[key][1] == continent) {
                return key
            }
        })
        .map(key => ({ key, value1: 0.9 * ((1 / parseFloat(data[key][0])) - mmin) / (mmax - mmin) + 0.1, value2: data[key][1], value3: d3.format(".3f")(parseFloat(data[key][0])) }))
}
function mouseOver() {
    d3.select(this)
        .attr("height", 20)

}
function mouseOut() {
    d3.select(this).style("opacity", 0.7)
}