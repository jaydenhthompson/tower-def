/////////////////////////////////
//                             //
// Initializes the Game object //
//                             //
/////////////////////////////////

let Game = {}

//////////////////////////////////////////
//                                      //
// Creates game rendering functionality //
//                                      //
//////////////////////////////////////////

Game.graphics = (function(){

    ////////////////////////
    // Function variables //
    ////////////////////////

    let canvas = document.getElementById('canvas-main');
    let ctx = canvas.getContext('2d');
    let particles = [];

    /////////////////////////////////////////
    // Functions to render dynamic objects //
    /////////////////////////////////////////

    //TODO

    ////////////////////////////////////////////////////
    // Functions to render static objects and scenery //
    ////////////////////////////////////////////////////

    function drawBackground(){
        let background = new Image();
        background.src = "resources/backgroundSpace_01.1.png";

        background.onload = function(){
            ctx.drawImage(
                background, 0, 0, background.width, background.height, 0, 0, canvas.width, canvas.height
            );
        }
    }

    function drawBounds(){
        // Top Left
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(canvas.width * (3/8), 0);
        ctx.lineTo(canvas.width * (3/8), canvas.height / 9);
        ctx.lineTo(canvas.width / 16, canvas.height / 9);
        ctx.lineTo(canvas.width / 16, canvas.height / 3);
        ctx.lineTo(0, canvas.height / 3);
        ctx.closePath();
        ctx.fillStyle = 'grey';
        ctx.fill();
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'black';
        ctx.stroke();

        //Top Right
        ctx.beginPath();
        ctx.moveTo(canvas.width - 1, 0);
        ctx.lineTo(canvas.width - (canvas.width * (3/8)), 0);
        ctx.lineTo(canvas.width - (canvas.width * (3/8)), canvas.height / 9);
        ctx.lineTo(canvas.width - (canvas.width / 16), canvas.height / 9);
        ctx.lineTo(canvas.width - (canvas.width / 16), canvas.height / 3);
        ctx.lineTo(canvas.width - 1, canvas.height / 3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        //Bottom Left
        ctx.beginPath();
        ctx.moveTo(0, canvas.height - 1);
        ctx.lineTo(canvas.width * (3/8), canvas.height - 1);
        ctx.lineTo(canvas.width * (3/8), canvas.height - (canvas.height / 9));
        ctx.lineTo(canvas.width / 16, canvas.height - (canvas.height / 9));
        ctx.lineTo(canvas.width / 16, canvas.height - (canvas.height / 3));
        ctx.lineTo(0, canvas.height - (canvas.height / 3));
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        //Bottom Right
        ctx.beginPath();
        ctx.moveTo(canvas.width - 1, canvas.height - 1);
        ctx.lineTo(canvas.width - (canvas.width * (3/8)), canvas.height - 1);
        ctx.lineTo(canvas.width - (canvas.width * (3/8)), canvas.height - (canvas.height / 9));
        ctx.lineTo(canvas.width - (canvas.width / 16), canvas.height - (canvas.height / 9));
        ctx.lineTo(canvas.width - (canvas.width / 16), canvas.height - (canvas.height / 3));
        ctx.lineTo(canvas.width - 1, canvas.height - (canvas.height / 3));
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    // FOR DEBUGGIN ONLY!!!
    function drawGrid(){
        ctx.beginPath();
        //draw vertical lines
        for(let i = 1; i < 16; i++){
            ctx.moveTo(canvas.width * (i / 16), 0);
            ctx.lineTo(canvas.width * (i / 16), canvas.height - 1);
        }

        //draw horizontal lines
        for (let i = 1; i < 9; i++){
            ctx.moveTo(0, canvas.height * (i / 9));
            ctx.lineTo(canvas.width - 1, canvas.height * (i / 9));
        }

        ctx.lineWidth = 2;
        ctx.strokeStyle = 'red';
        ctx.stroke();
    }

    //////////////////////////
    // Main render function //
    //////////////////////////

    function render(objects){
        drawBackground();
        drawBounds();
        //Function for debugging purposes, delete after completion.
        drawGrid();
    }

    ////////////////////////////////////////////
    // Functions to make externally available //
    ////////////////////////////////////////////
    return {
        render: render
    }
}());