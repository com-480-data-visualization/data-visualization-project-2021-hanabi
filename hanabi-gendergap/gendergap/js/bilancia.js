async function setup(){
    await getData();
    balanceSetup();
    changeYearScale();
    buttonPlayPress(true);
}

function bodyResize(){
    balanceSetup();

}

//////////////////////////////
//                          //
//    BALANCE ANIMATION     //
//           &              //
//        UPDATE            //
//                          //
//////////////////////////////
//rescale balance elements
function setBalanceScale(fac){
    elements = document.getElementsByClassName("bilancia");
    for(el of elements){
        original = el.height;
        newScale = original*fac;
        el.style.height = newScale+"px";
    }
}
//move balance
function setBalancePosition(x, y){
    elements = document.getElementsByClassName("bilancia");
    for(el of elements){
        el.style.left = x + "px";
        el.style.top = y + "px";
    }
}
//rotate the scale arm using the rotate css property
function rotateArm(angle){
    anime({
        targets: "#braccio",
        rotate: angle,
        easing: ease,
        duration: animationDuration,
    })
}
//translate plate according to angle
function setPlate(which, x, y){
    if(which == "L") t = "#piattoL";
    if(which == "R") t = "#piattoR";
    //anime library parameters
    anime({
        targets: t,
        translateX: x,
        translateY: y,
        easing: ease,
        duration: animationDuration,
    })
}
//updates balance position
function setBalanceValue(x){
    // x value between [0 1];
    if(isNaN(x) || !(x === +x && x !== (x|0)) ){
        console.log("ERROR! Type of value is bad!");
        return;
    }
    if(x > 1 || x < 0){
        console.log("ERROR! value out of range!");
        return;
    }

    // complete real angles
    //normalization of interval 0-1(the score values range) over the MAXANGLE variable

    thetaDeg = (x - 0.8) * MAXANGLE; // GGGI evaluation and compute angle

    thetaRad = thetaDeg * Math.PI / 180;

    rotateArm(thetaDeg);

    //compute translation
    let newPosYl = offsetY - radius *  Math.sin(thetaRad) + littleOff.y;
    let newPosXl = offsetX - radius *  Math.cos(thetaRad);
    let newPosYr = offsetY + radius *  Math.sin(thetaRad) + littleOff.y;
    let newPosXr = offsetX + radius *  Math.cos(thetaRad);

    //move plates
    setPlate("L", middleX.L, middleY);
    setPlate("R", middleX.R, middleY);

    setPlate("L", newPosXl, newPosYl);
    setPlate("R", newPosXr, newPosYr);
}

function centerBalance(){
    w = window.innerWidth;
    h = window.innerHeight;

    newX = w / 2 - BraccioImageWidth / 2;

    newY = TroncoImageHeight;
    X = newX;
    Y = newY;



    setBalancePosition(newX, newY - 40);
}

firstYear = 2006;
lastYear = 2020;
animationDuration = 450;
intervallBeforeChange = 1500; // ms
cifreDopoLaVirgola = 3; //numbers to display in the score
posizionePunteggio = 1.6; // score position

// center the weight scale and position elements correctly
//the positioning uses css properties
function balanceSetup(){


    MAXANGLE = 280; //max scale angle

    X = 0;
    Y = 0;
    //small adjustments to scale position
    littleOff = {
        x: -45,
        y: -7,
    }
    //animation settings
    ease = "spring(1, 90, 6, 0)";

    BraccioImageWidth = document.getElementById("braccio").width;
    BraccioImageHeight = document.getElementById("braccio").height;
    PiattoImageWidth = document.getElementById("piattoL").width;
    PiattoImageHeight = document.getElementById("piattoL").height;
    TroncoImageHeight = document.getElementById("tronco").height;

    offsetY = BraccioImageHeight / 2 ;
    offsetX = BraccioImageWidth / 2 - PiattoImageWidth / 2;
    radius = BraccioImageWidth / 2 + littleOff.x;

    middleX = {R: offsetX + radius + littleOff.x, L: offsetX - radius + littleOff.x};
    middleY = offsetY + littleOff.y;

    tronco = document.getElementById("tronco");
    tx = BraccioImageWidth / 2 - tronco.width / 2;
    ty = - tronco.height * .94;
    tronco.style.transform = "translateX("+ tx+"px) translateY("+ty+"px)" ;

    uguale = document.getElementById("uguale");
    tx = BraccioImageWidth / 2 - uguale.width / 2;
    ty = - tronco.height * .43;
    uguale.style.transform = "translateX("+tx+"px) translateY("+ty+"px)" ;


    centerBalance();
}


//////////////////////////////
//                          //
//                          //
//     DATA MANAGEMENT      //
//                          //
//                          //
//////////////////////////////
//get data and average over all countries
async function getData(){
    data = {};

    for(let i=firstYear; i <= lastYear; i++) data[i] = []

    return d3.csv("data/data_index.csv").then(
        function(line){
            for(let el of line)
                for(let i=firstYear; i <= lastYear; i++) data[i].push(el[i]);
        }
    ).then(
        function(){
            for(let i=firstYear; i <= lastYear; i++){
                data[i] = d3.mean(data[i]);
                }
            }
    );
}
//change score and scale according to year
function changeYearScale(year){
    let sliderValue = document.getElementById("slVal");
    let inputSlider = document.getElementById("slIn");
    let scoreVal = document.getElementById("scoreVal");
    let value= inputSlider.value;
    if(!isNaN(year)) sliderValue.textContent = value;
    else sliderValue.textContent = value;

    scoreVal.textContent = data[value].toFixed(cifreDopoLaVirgola);
    setBalanceValue(data[value]);
}
//anime parameters
balanceAnimation = {
    playing: false,
    state: undefined,
    inc: +1,
    int: undefined,
    animate: () => {
        balanceAnimation.state = parseInt(document.getElementById("slIn").value) + balanceAnimation.inc;
        if(balanceAnimation.state == lastYear){
            document.getElementById("slIn").value = balanceAnimation.state;
            changeYearScale( balanceAnimation.state );
            clearInterval(balanceAnimation.int);
            buttonPlayPress();
            return;
            balanceAnimation.inc = -1;
            balanceAnimation.state -= 2;
        }
        if(balanceAnimation.state < firstYear){
            balanceAnimation.inc = +1;
            balanceAnimation.state += 2;
        }
        changeYearScale( balanceAnimation.state );
        document.getElementById("slIn").value = balanceAnimation.state;
    }
}
//updates play button and starts animation
function buttonPlayPress(state){


    if(!isNaN(state)) balanceAnimation.playing = state;
    if(balanceAnimation.playing){
        balanceAnimation.playing = false;
        clearInterval(balanceAnimation.int);
        document.getElementById("button_play").innerHTML = '<i class="fa fa-play"></i>';// pause icon

    }else{
        document.getElementById("slIn").value = firstYear;
        changeYearScale(data[firstYear]);
        balanceAnimation.int = setInterval(balanceAnimation.animate, intervallBeforeChange);
        balanceAnimation.playing = true;
        document.getElementById("button_play").innerHTML = '<i class="fa fa-pause"></i>';

    }
}
//hover function for visualizing description of the score
function sentence() {

    document.getElementById("expl").style.opacity = 1;
    document.getElementById("scoreVal").style.opacity = 1;

}
function sentenceAway() {
    document.getElementById("expl").style.opacity = 0;
    document.getElementById("scoreVal").style.opacity = 0.7;

}
