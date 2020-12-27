
var canvas      = document.getElementById("screen");
var ctx =      canvas.getContext("2d");

canvas.width  = window.innerWidth-100;
canvas.height = window.innerHeight-100;

var yChange = 2;
var xChange = 1;
this.gravity = 0.1;
this.gravitySpeed = 0;

var rainPosX = [100, 200, 300, 400, 500, 700];
var rainPosY = [100, 100, 100, 100, 100, 200];



function drawRains(posArrX, posArrY) {
    ctx.beginPath();
    for(i = 0; i < posArrX.length; i++){
        ctx.moveTo(posArrX[i], posArrY[i]);
        ctx.lineTo(posArrX[i] + 10*xChange, posArrY[i] + 10*yChange);
        //console.log(i)
    }
    ctx.stroke();
}



function updateRainPos(params) {

    this.gravitySpeed += this.gravity;

    for(i = 0; i < rainPosX.length; i++){
        rainPosY[i]+=gravitySpeed*yChange;
        rainPosX[i]+=gravitySpeed*xChange;

        if(rainPosY[i] > canvas.height){
            
            rainPosY.splice(i, 1);
            rainPosX.splice(i, 1);
        }
    }
    //console.log(rainPosY[0]);
/*     if(rainPosY[0]>600){
        rainPosX = [100, 200, 300, 400, 500, 700];
        rainPosY = [100, 100, 100, 100, 100, 200];
        gravitySpeed=0;
    } */

}
$(document).on("keypress", function (e) {
    //if k was pressed
    if(e.keyCode == 107){
       //gravitySpeed=0;

       
        addRain(Math.floor(Math.random() * canvas.width), 100);
       
    }
});

function addRain(posX,posY) {
    rainPosX.push(posX);
    rainPosY.push(posY);
}



var value =0;

function draw(){
    
    
    if(gravitySpeed>9.8){
        gravitySpeed=9.8;
    }

    ctx.beginPath();
    ctx.arc(value*2, 75, 50, 0, 2 * Math.PI);
    ctx.stroke();

    drawRains(rainPosX, rainPosY);
    updateRainPos();

    value++;
    
    addRain(Math.floor(Math.random() * canvas.width), 100);
}

window.onload = init;

function init(){

    // Start the first frame request
    window.requestAnimationFrame(gameLoop);
}



let secondsPassed;
let oldTimeStamp;
let fps;

function gameLoop(timeStamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height,false);//clear display


    // Calculate the number of seconds passed since the last frame
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;

    // Calculate fps
    fps = Math.round(1 / secondsPassed);

    // Draw number to the screen
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 200, 100);
    ctx.font = '25px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText("FPS: " + fps, 10, 30);



    // Perform the drawing operation
    draw();

    // The loop function has reached it's end. Keep requesting new frames
    window.requestAnimationFrame(gameLoop);
}