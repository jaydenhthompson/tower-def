//////////////////////////////
//                          //
//    Main Game function    //
//                          //
//////////////////////////////

Game.main = (function(graphics){

    //////////////////////////////////
    // Game Main "global" variables //
    //////////////////////////////////

    //TODO

    ////////////////////////////////////
    // Functions for processing input //
    ////////////////////////////////////

    function processInput(){
        //TODO
    }

    /////////////////////////////////////
    // Functions for updating the game //
    /////////////////////////////////////

    function update(elapsedTime){
        //TODO
    }

    /////////////////////
    // Render Function //
    /////////////////////

    function render(){
        graphics.render({
            // Insert objects to be drawn
        });
    }

    ////////////////////
    // Main Functions //
    ////////////////////

    function gameLoop(){
        processInput();
        update();
        render();
    }

    function initialize(){
        //TODO
    }

    ///////////////////////////////////
    // Initialize all game variables //
    ///////////////////////////////////

    initialize();

    ////////////////////////////
    // Get the party started! //
    ////////////////////////////

    requestAnimationFrame(gameLoop);
});