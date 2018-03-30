//////////////////////////
// Global HTML elements //
//////////////////////////

let mainMenuScreen = null;
let optionsScreen = null;
let gameScreen = null;

////////////////////
// Menu Functions //
////////////////////

function showMainMenu(){
    mainMenuScreen.style.display = 'block';
    optionsScreen.style.display = 'none';
    gameScreen.style.display = 'none';
}

function showOptionScreen(){
    mainMenuScreen.style.display = 'none';
    optionsScreen.style.display = 'block';
    gameScreen.style.display = 'none';
}

function startgame(){
    mainMenuScreen.style.display = 'none';
    optionsScreen.style.display = 'none';
    gameScreen.style.display = 'block';

    // Start the game

    Game.main(Game.graphics);

    // return to main menu after game
    showMainMenu();
}

///////////////////////////////////////////////////
// Main function to control menus and start game //
///////////////////////////////////////////////////

function Main(){
    mainMenuScreen = document.getElementById('mainMenu');
    optionsScreen = document.getElementById('options');
    gameScreen = document.getElementById('game');

    showMainMenu();
}