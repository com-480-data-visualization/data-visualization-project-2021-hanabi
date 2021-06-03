async function setup(){
    await getData();
    balanceSetup();
    changeYearScale();
    buttonPlayPress(true);
}

function bodyResize(){
    balanceSetup();
    /*let w = window.innerWidth;
    let h = window.innerHeight;
    let main = document.getElementsByTagName("main")[0];
    main.style.width = w+"px";
    main.style.height = h+"px";*/
}

//////////////////////////////
//                          //
//    BALANCE ANIMATION     //
//           &              //
//        UPDATE            //
//                          //
//////////////////////////////

function setBalanceScale(fac){
    elements = document.getElementsByClassName("bilancia");
    for(el of elements){
        original = el.height;
        newScale = original*fac;
        el.style.height = newScale+"px";
    }
}
function setBalancePosition(x, y){
    elements = document.getElementsByClassName("bilancia");
    for(el of elements){
        el.style.left = x + "px";
        el.style.top = y + "px";
    }
}

function rotateArm(angle){
    anime({
        targets: "#braccio",
        rotate: angle,
        easing: ease,
        duration: animationDuration,
    })
}

function setPlate(which, x, y){
    if(which == "L") t = "#piattoL";
    if(which == "R") t = "#piattoR";
    anime({
        targets: t,
        translateX: x,
        translateY: y,
        easing: ease,
        duration: animationDuration,
    })
}

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
    //thetaDeg = x * 180 - 90;
    //thetaDeg = (2*x -1) * MAXANGLE;
    thetaDeg = (x - 0.8) * MAXANGLE; // GGI evaluation

    thetaRad = thetaDeg * Math.PI / 180;


    rotateArm(thetaDeg);


    let newPosYl = offsetY - radius *  Math.sin(thetaRad) + littleOff.y;
    let newPosXl = offsetX - radius *  Math.cos(thetaRad);
    let newPosYr = offsetY + radius *  Math.sin(thetaRad) + littleOff.y;
    let newPosXr = offsetX + radius *  Math.cos(thetaRad);

    //console.log(newPosXr);
    setPlate("L", middleX.L, middleY);
    setPlate("R", middleX.R, middleY);

    setPlate("L", newPosXl, newPosYl);
    setPlate("R", newPosXr, newPosYr);
}

function centerBalance(){
    w = window.innerWidth;
    h = window.innerHeight;

    newX = w / 2 - BraccioImageWidth / 2;
    //newY = h * 0.61 - PiattoImageHeight/ 2;
    newY = TroncoImageHeight;
    X = newX;
    Y = newY;



    setBalancePosition(newX, newY - 40);
}

firstYear = 2006;
lastYear = 2020;
animationDuration = 450;
intervallBeforeChange = 1800; // ms
cifreDopoLaVirgola = 3;
posizionePunteggio = 1.6; // Più grande questo numero, più in basso la posizione

function balanceSetup(){


    MAXANGLE = 280;

    X = 0;
    Y = 0;

    littleOff = {
        x: -45,
        y: -7,
    }

    ease = "spring(1, 90, 5, 0)";

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

    /* svgBox = document.getElementById("svgBox");
    svgBox.style.width = 2 * radius;
    svgBox.style.height = 2 * radius;
    tx = littleOff.x;
    ty = -(radius+littleOff.y);
    svgBox.style.transform = "translateX("+tx+"px) translateY("+ty+"px)";
    cerchio = document.getElementById("cerchio");
    for(el of ["cx", "cy", "r"])
        cerchio.setAttribute(el, radius);
    path = anime.path("#cerchio"); */

    centerBalance();
}


//////////////////////////////
//                          //
//                          //
//     DATA MANAGEMENT      //
//                          //
//                          //
//////////////////////////////

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
