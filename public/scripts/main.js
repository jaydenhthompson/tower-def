//////////////////////////
// Global HTML elements //
//////////////////////////

let mainMenuScreen = null;
let optionsScreen = null;
let creditsScreen = null;
let gameScreen = null;
let highScoreScreen = null;

////////////////////
// Menu Functions //
////////////////////

function showMainMenu() {
    mainMenuScreen.style.display = 'block';
    optionsScreen.style.display = 'none';
    gameScreen.style.display = 'none';
    creditsScreen.style.display = 'none';
    highScoreScreen.style.display = 'none';
}

function showOptionScreen() {
    mainMenuScreen.style.display = 'none';
    optionsScreen.style.display = 'block';

    let upgrade = document.getElementById('upgrade-control');
    let sell = document.getElementById('sell-control');
    let go = document.getElementById('go-control');
    let oldOptions = localStorage.getItem("options");

    if (oldOptions) {
        options = JSON.parse(oldOptions);
    }

    upgrade.value = options[0];
    sell.value = options[1];
    go.value = options[2];
}

function saveOptions() {
    let temp_options = []
    let upgrade = document.getElementById('upgrade-control');
    let sell = document.getElementById('sell-control');
    let go = document.getElementById('go-control');
    if (upgrade.value.length > 1 || sell.value.length > 1 || go.value.length > 1 || !upgrade.value || !sell.value || !go.value) {
        alert("Incorrect Input");
        return;
    }
    temp_options.push(upgrade.value);
    temp_options.push(sell.value);
    temp_options.push(go.value);
    localStorage["options"] = JSON.stringify(temp_options);
    showMainMenu();
}

function showCreditsScreen() {
    mainMenuScreen.style.display = 'none';
    creditsScreen.style.display = 'block';
}

function showHighScoresScreen() {
    mainMenuScreen.style.display = 'none';
    highScoreScreen.style.display = 'block';

    let disArray = document.getElementById('HSArray');

    disArray.innerHTML = '';
    let oldScores = localStorage.getItem("TowerHighScores");
    if (oldScores) {
        highScores = JSON.parse(oldScores);
    } else {
        return;
    }

    for (let i = 0; i < highScores.length; i++) {
        disArray.innerHTML += ('Name: ' + highScores[i].name + ' Score: ' + highScores[i].score + '<br>');
    }
}

function startGame() {
    mainMenuScreen.style.display = 'none';
    gameScreen.style.display = 'block';

    // Start the game
    Game.main(Game.graphics, Game.pathfinding, Game.particles);
}

function toggleSound() {
    sounds ? sounds = false : sounds = true;
}

function toggleGrid() {
    show_grid ? show_grid = false : show_grid = true;
}

function toggleBounds() {
    show_bounds ? show_bounds = false : show_bounds = true;
}
///////////////////////////////////////////////////
// Main function to control menus and start game //
///////////////////////////////////////////////////

function Main() {
    mainMenuScreen = document.getElementById('mainMenu');
    optionsScreen = document.getElementById('options');
    creditsScreen = document.getElementById('credits');
    gameScreen = document.getElementById('game');
    highScoreScreen = document.getElementById('highScores');

    showMainMenu();
}
