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