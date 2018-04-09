////////////////////////////////////
// Variables for menu interaction //
////////////////////////////////////

let currentSelection = undefined;

//////////////////////////////
//                          //
//    Main Game function    //
//                          //
//////////////////////////////

Game.main = (function(graphics, settings){

    ////////////////////////////////
    // Game Main "global" objects //
    ////////////////////////////////

    // VARIABLES
    let canvas = document.getElementById('canvas-main');
    let previousTime = performance.now();
    let currentMousePos = undefined;
    let selectionMode = false;
    let selectedTurret = undefined;

    // IN-GAME VARIABLES
    let money = 50;
    let round = 1;

    // CONSTANTS
    const HEIGHT = canvas.height;
    const WIDTH = canvas.width;
    const COLS = WIDTH / 50;
    const ROWS = HEIGHT / 50;
    const CELL_WIDTH = WIDTH / COLS;
    const CELL_HEIGHT = HEIGHT / ROWS;

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

    ///////////////////////////////////////////
    // Functions for placing creeps on board //
    ///////////////////////////////////////////

    function placeGroundCreep1(pos){
        creeps.push({
            image:{
                render: "resources/creep/creep-1-red/1.png",
                base: "resources/creep/creep-1-red/",
                current: 0,
                number: 6,
                time: 0.0,
                timings : [1, 0.2, 0.1, 1, 0.1, 0.2]
            },
            pos: pos,
            degree: 0
        });
    }

    function placeGroundCreep2(pos){
        creeps.push({
            image:{
                render: "resources/creep/creep-2-green/1.png",
                base: "resources/creep/creep-2-green/",
                current: 0,
                number: 4,
                time: 0.0,
                timings : [0.2, 1, 0.2, 0.6]
            },
            pos: pos,
            degree: Math.PI / 2
        });
    }

    function placeAirCreep(pos){
        creeps.push({
            image:{
                render: "resources/creep/creep-3-blue/1.png",
                base: "resources/creep/creep-3-blue/",
                current: 0,
                number: 4,
                time: 0.0,
                timings : [1, 0.2, 0.2, 0.2]
            },
            pos: pos,
            degree: Math.PI
        });
    }

    /////////////////////////////////
    // Functions for placing units //
    /////////////////////////////////

    function placeGroundUnit1(pos){
        if(money < 5) return;
        money -= 5;
        gameGrid[pos.x][pos.y] = {
            image: 'resources/tower-defense-turrets/turret-1-1.png',
            center: {
                x: (pos.x * 50) + ((WIDTH / COLS) / 2),
                y: (pos.y * 50) + ((HEIGHT / ROWS) / 2)
            },
            degree: Math.PI / 2,
            damage: 10,
            radius: 100
        }
        currentSelection = undefined;
        selectionMode = false;
    }

    function placeGroundUnit2(pos){
        if(money < 15) return;
        money -= 15;
        gameGrid[pos.x][pos.y] = {
            image: 'resources/tower-defense-turrets/turret-2-1.png',
            center: {
                x: (pos.x * 50) + ((WIDTH / COLS) / 2),
                y: (pos.y * 50) + ((HEIGHT / ROWS) / 2)
            },
            degree: Math.PI / 2,
            damage: 25,
            radius: 150
        }
        currentSelection = undefined;
        selectionMode = false;        
    }

    function placeAirUnit1(pos){
        if(money < 10) return;
        money -= 10;
        gameGrid[pos.x][pos.y] = {
            image: 'resources/tower-defense-turrets/turret-3-1.png',
            center: {
                x: (pos.x * 50) + ((WIDTH / COLS) / 2),
                y: (pos.y * 50) + ((HEIGHT / ROWS) / 2)
            },
            degree: Math.PI / 2,
            damage: 15,
            radius: 175
        }
        currentSelection = undefined;
        selectionMode = false;        
    }

    function placeAirUnit2(pos){
        if(money < 25) return;
        money -= 25;
        gameGrid[pos.x][pos.y] = {
            level: 1,
            baseImg: 'resources/tower-defense-turrets/turret-5-',
            image: 'resources/tower-defense-turrets/turret-5-1.png',
            center: {
                x: (pos.x * 50) + ((WIDTH / COLS) / 2),
                y: (pos.y * 50) + ((HEIGHT / ROWS) / 2)
            },
            degree: Math.PI / 2,
            damage: 35,
            radius: 200
        }
        currentSelection = undefined;
        selectionMode = false;        
    }

    function updateCreepImages(sec){
        for(let i = 0; i < creeps.length; i++){
            im = creeps[i].image;
            im.time += sec;
            if(im.time >= im.timings[im.current]/2){
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

    function initialize(){
        placeGroundCreep1({
            x: 450,
            y: 450
        });
        placeGroundCreep2({
            x: 450,
            y: 350
        });
        placeAirCreep({
            x: 450,
            y: 550
        })
        initializeGameGrid();
    }

    /////////////////////////////////
    // Initialize Helper Functions //
    /////////////////////////////////

    function initializeGameGrid(){
        for(let i = 0; i < ROWS; i++){
            gameGrid.push([]);
            for(let j = 0; j < COLS; j++){
                gameGrid[i].push(undefined);
            }
        }
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