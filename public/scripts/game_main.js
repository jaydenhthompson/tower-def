////////////////////////////////////
// Variables for menu interaction //
////////////////////////////////////

let currentSelection = undefined;

//////////////////////////////
//                          //
//    Main Game function    //
//                          //
//////////////////////////////

Game.main = (function(graphics, pathfinder, settings){

    ////////////////////////////////
    // Game Main "global" objects //
    ////////////////////////////////

    // VARIABLES
    let previousTime = performance.now();
    let currentMousePos = undefined;
    let selectionMode = false;
    let selectedTurret = undefined;

    // IN-GAME VARIABLES
    let money = 10000;
    let round = 1;

    // CONSTANTS

    // ARRAYS
    let gameGrid = [];
    let creeps = [];

    // OBJECTS

    // LISTENERS
    canvas.addEventListener('mousemove', function(e){
        mousePosition(e);
    }, false);

    canvas.addEventListener('click', function(e){
        clickSelection(e);
    }, false);

    //canvas.addEventListener('mouseclick', )

    ////////////////////////////////////
    // Functions for collecting input //
    ////////////////////////////////////

    function clickSelection(e){
        // Check if tower placement is valid
        if(currentSelection === undefined){
            selectTurret();
            return;
        }
        if(currentMousePos.x < 2 || currentMousePos.x >= COLS - 2 || 
            currentMousePos.y < 2 || currentMousePos.y >= ROWS - 2) return;
        if(gameGrid[currentMousePos.x][currentMousePos.y] !== undefined) return;

        // Check the type of tower selected
        if(currentSelection === 'ground1') placeGroundUnit1(currentMousePos);
        else if(currentSelection === 'ground2') placeGroundUnit2(currentMousePos);
        else if(currentSelection === 'air1') placeAirUnit1(currentMousePos);
        else if(currentSelection === 'air2') placeAirUnit2(currentMousePos);
    }

    function mousePosition(e){
        var window = canvas.getBoundingClientRect();
        currentMousePos = {
            x: Math.floor((e.clientX - window.left) / 50),
            y: Math.floor((e.clientY - window.top) / 50)
        };
    }

    ///////////////////////////////////////////
    // Functions for placing creeps on board //
    ///////////////////////////////////////////

    function placeGroundCreep1(pos){
        creeps.push(ground_creep_1(pos));
    }

    function placeGroundCreep2(pos){
        creeps.push(ground_creep_2(pos));
    }

    function placeAirCreep(pos){
        creeps.push(air_creep(pos));
    }

    /////////////////////////////////
    // Functions for placing units //
    /////////////////////////////////

    function placeGroundUnit1(pos){
        if(money < 5) return;
        money -= 5;
        gameGrid[pos.x][pos.y] = ground_1(pos);
        currentSelection = undefined;
        selectionMode = false;
    }

    function placeGroundUnit2(pos){
        if(money < 15) return;
        money -= 15;
        gameGrid[pos.x][pos.y] = ground_2(pos);
        currentSelection = undefined;
        selectionMode = false;        
    }

    function placeAirUnit1(pos){
        if(money < 10) return;
        money -= 10;
        gameGrid[pos.x][pos.y] = air_1(pos);
        currentSelection = undefined;
        selectionMode = false;        
    }

    function placeAirUnit2(pos){
        if(money < 25) return;
        money -= 25;
        gameGrid[pos.x][pos.y] = air_2(pos);
        currentSelection = undefined;
        selectionMode = false;        
    }

    ////////////////////////////////////
    // Functions for processing input //
    ////////////////////////////////////
    function selectTurret(){
        if(gameGrid[currentMousePos.x][currentMousePos.y] == undefined) return;
        if(selectedTurret == gameGrid[currentMousePos.x][currentMousePos.y]){
            selectedTurret = undefined;
        }else{
            selectedTurret = gameGrid[currentMousePos.x][currentMousePos.y];
        }
    }

    function checkTowerSelection(){
        if(currentSelection === undefined){
            selectionMode = false;
            return;
        }
        selectionMode = true;
    }

    /////////////////////////////////////
    // Functions for updating the game //
    /////////////////////////////////////

    function updateCreepImages(sec){
        for(let i = 0; i < creeps.length; i++){
            im = creeps[i].image;
            im.time += sec;
            if(im.time >= im.timings[im.current]){
                im.time = 0.0;
                im.current++;
                if(im.current >= im.number) im.current = 0;
                im.render = im.base + (im.current + 1) + ".png";
            }
        }
    }

    /////////////////////////
    // Main Game Functions //
    /////////////////////////

    function processInput(){
        checkTowerSelection();
    }

    function update(elapsedTime){
        updateCreepImages(elapsedTime / 1000);
    }

    function render(){
        graphics.render({
            gameGrid: gameGrid,
            mouse: currentMousePos,
            select: selectionMode,
            money: money,
            creeps: creeps,
            selectedTurret: selectedTurret
        });
    }

    function gameLoop(){
        let currentTime = performance.now();
        let elapsedTime = currentTime - previousTime;
        previousTime = currentTime;

        processInput();
        update(elapsedTime);
        render();

        requestAnimationFrame(gameLoop);
    }

    ///////////////////////////////////
    // Initialize all game variables //
    ///////////////////////////////////

    function initializeGameGrid(){
        for(let i = 0; i < ROWS; i++){
            gameGrid.push([]);
            for(let j = 0; j < COLS; j++){
                gameGrid[i].push(undefined);
            }
        }
    }

    /////////////////////////////////
    // Initialize Helper Functions //
    /////////////////////////////////

    function initialize(){
        placeGroundCreep2({
            x: 450,
            y: 450
        });
        initializeGameGrid();
    }

    ////////////////////////////
    // Get the party started! //
    ////////////////////////////

    initialize();
    requestAnimationFrame(gameLoop);
});

////////////////////////////////////
// Functions for menu interaction //
////////////////////////////////////

function changeSelection(tower){
    if(currentSelection === tower){
        currentSelection = undefined;
        return;
    }
    currentSelection = tower;
}