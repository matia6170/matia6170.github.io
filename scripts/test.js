var canvas = document.getElementById("screen");
var ctx = canvas.getContext("2d"),angleA = Math.random() * 360,                                // start angle (for HSL)
angleB = Math.random() * 360,
stepA = 1.2, stepB = 0.7;  ;
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

var yChange = 2;
var xChange = 1;
this.gravity = 0.2;
this.gravitySpeed = 0;

var rainPosX = [];
var rainPosY = [];

var Run = function(){

    function init(){
        // Start the first frame request
        window.requestAnimationFrame(gameLoop);
    }


    function draw(){
    
    
        if(gravitySpeed>9.8){
            gravitySpeed=9.8;
        }
    
       
    
        drawRains(rainPosX, rainPosY);
        updateRainPos();
    
    
        addRain(Math.floor(Math.random() * (canvas.width+200))-300, 0);
    }
    
    let secondsPassed;
    let oldTimeStamp;
    let fps;
//#FFB582
    let colorInc =0;
    function gameLoop(timeStamp) {


  ctx.fillRect(0, 0, canvas.width, canvas.height);//clear display
 


        //ctx.fillStyle = `#${colorInc.toString(16)}`; 
        
    
    
/*         // Calculate the number of seconds passed since the last frame
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
    
     */
    
        // Perform the drawing operation
        draw();
    
        // The loop function has reached it's end. Keep requesting new frames
        window.requestAnimationFrame(gameLoop);
    }

    
    function drawRains(posArrX, posArrY) {
        ctx.beginPath();
        ctx.strokeStyle = "#FFFFFF"
        for(i = 0; i < posArrX.length; i++){
            ctx.moveTo(posArrX[i], posArrY[i]);
            ctx.lineTo(posArrX[i] + 10*xChange, posArrY[i] + 10*yChange);
            //console.log(i)
        }
        ctx.stroke();
    }

    function addRain(posX,posY) {
        rainPosX.push(posX);
        rainPosY.push(posY);
    }

    function updateRainPos() {

        this.gravitySpeed += this.gravity;
    
        for(i = 0; i < rainPosX.length; i++){
            rainPosY[i]+=gravitySpeed*yChange;
            rainPosX[i]+=gravitySpeed*xChange;
    
            if(rainPosY[i] > canvas.height){
                
                rainPosY.splice(i, 1);
                rainPosX.splice(i, 1);
            }
        }
    }

    init();

}

new Run();
