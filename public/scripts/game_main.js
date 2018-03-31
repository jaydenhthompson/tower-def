//////////////////////////////
//                          //
//    Main Game function    //
//                          //
//////////////////////////////

Game.main = (function(graphics){

    ////////////////////////////////
    // Game Main "global" objects //
    ////////////////////////////////

    // CONSTANTS
    const COLS = 16;
    const ROWS = 9;
    const HEIGHT = document.getElementById('canvas-main').height;
    const WIDTH = document.getElementById('canvas-main').width;
    const CELL_WIDTH = WIDTH / COLS;
    const CELL_HEIGHT = HEIGHT / ROWS;

    // VARIABLES
    let previousTime = performance.now();

    // ARRAYS
    let gameGrid = [];

    // OBJECTS

    ////////////////////////////////////
    // Functions for processing input //
    ////////////////////////////////////

    

    /////////////////////////////////////
    // Functions for updating the game //
    /////////////////////////////////////

    //TODO

    /////////////////////////
    // Main Game Functions //
    /////////////////////////

    function processInput(){
        //TODO
    }

    function update(elapsedTime){
        //TODO
    }

    function render(){
        graphics.render({
            // Insert objects to be drawn
        });
    }

    function gameLoop(){
        let currentTime = performance.now();
        let elapsedTime = currentTime - previousTime;

        processInput();
        update(elapsedTime);
        render();

        requestAnimationFrame(gameLoop);
    }

    ///////////////////////////////////
    // Initialize all game variables //
    ///////////////////////////////////

    function initialize(){
        initializeGameGrid();
    }

    /////////////////////////////////
    // Initialize Helper Functions //
    /////////////////////////////////

    function initializeGameGrid(){

    }

    ////////////////////////////
    // Get the party started! //
    ////////////////////////////

    initialize();
    requestAnimationFrame(gameLoop);
});