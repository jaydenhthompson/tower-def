////////////////////////////////////
// Variables for menu interaction //
////////////////////////////////////

let currentSelection = undefined;

//////////////////////////////
//                          //
//    Main Game function    //
//                          //
//////////////////////////////

Game.main = (function (graphics, pathfinder, particles) {

    ////////////////////////////////
    // Game Main "global" objects //
    ////////////////////////////////

    // VARIABLES
    let previousTime = performance.now();
    let currentMousePos = undefined;
    let selectionMode = false;
    let selectedTurret = undefined;
    let run = true;

    // IN-GAME VARIABLES
    let money = 10000;
    let lives = 10;
    let level = 1;
    let score = 0;

    // CONSTANTS

    // ARRAYS
    let gameGrid = [];
    let creeps = [];
    let projectiles = [];
    let creepScore = [];
    let leftPath = [];
    let topPath = [];

    // OBJECTS

    // LISTENERS
    canvas.addEventListener('mousemove', function (e) {
        mousePosition(e);
    }, false);

    canvas.addEventListener('click', function (e) {
        clickSelection(e);
    }, false);

    document.addEventListener('keydown', keyPress);
    document.addEventListener('keyup', keyRelease);

    let keyInput = {
        keys: {},
        handlers: {}
    }

    ////////////////////////////////////
    // Functions for collecting input //
    ////////////////////////////////////

    function keyPress(e) {
        keyInput.keys[e.key] = e.timeStamp;
    }

    function keyRelease(e) {
        delete keyInput.keys[e.key];
    }

    function clickSelection(e) {
        // Check if tower placement is valid
        if (currentSelection === undefined) {
            selectTurret();
            return;
        }
        if (currentMousePos.x < 1 || currentMousePos.x >= COLS - 1 ||
            currentMousePos.y < 1 || currentMousePos.y >= ROWS - 1) return;
        if (gameGrid[currentMousePos.x][currentMousePos.y] !== undefined) return;

        // Check the type of tower selected
        if (currentSelection === 'ground1') placeGroundUnit1(currentMousePos);
        else if (currentSelection === 'ground2') placeGroundUnit2(currentMousePos);
        else if (currentSelection === 'air1') placeAirUnit1(currentMousePos);
        else if (currentSelection === 'air2') placeAirUnit2(currentMousePos);
    }

    function mousePosition(e) {
        var window = canvas.getBoundingClientRect();
        currentMousePos = {
            x: Math.floor((e.clientX - window.left) / 50),
            y: Math.floor((e.clientY - window.top) / 50)
        };
    }

    ///////////////////////////////////////////
    // Functions for placing creeps on board //
    ///////////////////////////////////////////

    function placeGroundCreep1(pos) {
        creeps.push(ground_creep_1(pos));
    }

    function placeGroundCreep2(pos) {
        creeps.push(ground_creep_2(pos));
    }

    function placeAirCreep(pos) {
        creeps.push(air_creep(pos));
    }

    /////////////////////////////////
    // Functions for placing units //
    /////////////////////////////////

    function checkAndUpdatePaths(pos){
        tempLeftPath = pathfinder.findPath(gameGrid, { x: 0, y: 8 }, { x: COLS - 1, y: 8 });
        tempRightPath = pathfinder.findPath(gameGrid, { x: 8, y: 0 }, { x: 8, y: ROWS - 1 });
        if(tempLeftPath.isPath && tempRightPath.isPath){
            leftPath = tempLeftPath.path;
            rightPath = tempRightPath.path;
        }else{
            gameGrid[pos.x][pos.y] = undefined;
            alert("CANNOT BLOCK PATH!!!");
        }
    }

    function placeGroundUnit1(pos) {
        if (money < 5) return;
        money -= 5;
        score += 5;
        gameGrid[pos.x][pos.y] = ground_1(pos);
        currentSelection = undefined;
        selectionMode = false;
        checkAndUpdatePaths(pos);
    }

    function placeGroundUnit2(pos) {
        if (money < 15) return;
        money -= 15;
        score += 15;
        gameGrid[pos.x][pos.y] = ground_2(pos);
        currentSelection = undefined;
        selectionMode = false;
        checkAndUpdatePaths(pos);
    }

    function placeAirUnit1(pos) {
        if (money < 10) return;
        money -= 10;
        score += 10;
        gameGrid[pos.x][pos.y] = air_1(pos);
        currentSelection = undefined;
        selectionMode = false;
        checkAndUpdatePaths(pos);
    }

    function placeAirUnit2(pos) {
        if (money < 25) return;
        money -= 25;
        score += 25;
        gameGrid[pos.x][pos.y] = air_2(pos);
        currentSelection = undefined;
        selectionMode = false;
        checkAndUpdatePaths(pos);
    }

    ////////////////////////////////////
    // Functions for processing input //
    ////////////////////////////////////
    function selectTurret() {
        if (gameGrid[currentMousePos.x][currentMousePos.y] == undefined) return;
        if (selectedTurret == gameGrid[currentMousePos.x][currentMousePos.y]) {
            selectedTurret = undefined;
        } else {
            selectedTurret = gameGrid[currentMousePos.x][currentMousePos.y];
        }
    }

    function checkTowerSelection() {
        if (currentSelection === undefined) {
            selectionMode = false;
            return;
        }
        selectedTurret = undefined;
        selectionMode = true;
    }

    function upgradeSelected() {
        if (selectedTurret === undefined) return;
        if (selectedTurret.level >= 3) return;
        if (money < 10 * selectedTurret.level) return;
        money -= 10 * selectedTurret.level;
        score += 10 * selectedTurret.level;
        selectedTurret.value += 10 * selectedTurret.level;
        selectedTurret.level += 1;
        selectedTurret.image = selectedTurret.baseImg + selectedTurret.level + ".png";
        selectedTurret.damage += selectedTurret.level * 10;
        selectedTurret = undefined;
    }

    function sellSelected() {
        if (selectedTurret === undefined) return;
        money += selectedTurret.value;
        score -= selectedTurret.value;
        particles.explosion(selectedTurret.center, 'gray');
        gameGrid[selectedTurret.pos.x][selectedTurret.pos.y] = undefined;
        selectedTurret = undefined;
    }

    function startNextLevel() {

    }

    /////////////////////////////////////
    //                                 //
    // Functions for updating the game //
    //                                 //
    /////////////////////////////////////

    ///////////////////
    // Update Creeps //
    ///////////////////

    function updateCreepImages(sec) {
        for (let i = 0; i < creeps.length; i++) {
            im = creeps[i].image;
            im.time += sec;
            if (im.time >= im.timings[im.current]) {
                im.time = 0.0;
                im.current++;
                if (im.current >= im.number) im.current = 0;
                im.render = im.base + (im.current + 1) + ".png";
            }
        }
    }

    function checkCreeps() {
        for (let i = 0; i < creeps.length; i++) {
            if (creeps[i].life <= 0) {
                if (sounds) {
                    let audio = new Audio();
                    audio.src = "resources/sounds/explosion.wav"
                    audio.type = "audio/wav";
                    audio.play();
                    particles.explosion(creeps[i].pos, 'green');
                }
                score += 10;
                money += 10;
                creepScore.push({
                    time: 1,
                    pos: creeps[i].pos,
                    score: 10
                });
                creeps.splice(i, 1);
            } else if (creeps[i].pos.x >= WIDTH || creeps[i].pos.y >= HEIGHT) {
                lives--;
                creeps.splice(i, 1);
            }
        }
    }

    ////////////////////////
    // Update Projectiles //
    ////////////////////////

    function shootProjectiles(turret, distance, creep) {
        if (sounds) {
            let audio = new Audio();
            if (turret.projectile_type === 'lazer') {
                audio.src = "resources/sounds/lazer.wav";
            } else if (turret.projectile_type === 'bomb') {
                audio.src = "resources/sounds/bomb.wav";
            } else {
                audio.src = "resources/sounds/rocket.wav";
            }
            audio.type = "audio/wav";
            audio.play();
        }
        projectiles.push({
            pos: {
                x: turret.center.x,
                y: turret.center.y
            },
            angle: turret.degree,
            type: turret.projectile_type,
            distance: 0,
            max_distance: distance,
            speed: 500,
            damage: turret.damage,
            creep: creep
        });
    }

    function updateProjectiles(sec) {
        for (let i = 0; i < projectiles.length; i++) {
            let cur = projectiles[i];
            let x_comp = cur.speed * Math.cos(cur.angle) * sec;
            let y_comp = cur.speed * Math.sin(cur.angle) * sec;
            cur.distance += Math.sqrt(Math.pow(x_comp, 2) + Math.pow(y_comp, 2));
            cur.pos.x += x_comp;
            cur.pos.y -= y_comp;
            if (cur.type === "bomb") {
                particles.trail(cur.pos, 'red', cur.angle);
            } else if (cur.type === "missile") {
                particles.trail(cur.pos, 'blue', cur.angle);
            }
            if (cur.distance >= cur.max_distance) {
                if (cur.type === "bomb") {
                    particles.explosion(cur.pos, 'red');
                } else if (cur.type === "missile") {
                    particles.explosion(cur.pos, 'blue');
                }

                cur.creep.life -= cur.damage;
                projectiles.splice(i, 1);
                i--;
            }
        }
    }

    ////////////////////
    // Update Turrets //
    ////////////////////

    function dist(a, b) {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    }

    function findClosestCreep(turret) {
        if (!creeps.length) return;
        let target = creeps[0];
        let distance = dist(turret.center, target.pos);
        if (turret.type !== target.type) {
            target = undefined;
            distance = WIDTH;
        }
        for (let i = 1; i < creeps.length; i++) {
            let creep = creeps[i];
            if (turret.type !== creep.type) continue;
            let temp = dist(turret.center, creep.pos);
            if (distance > temp) {
                distance = temp;
                target = creep;
            }
        }
        return {
            creep: target,
            distance: distance
        }
    }

    function fireTurret(turret, target, sec) {
        if (turret.reload <= 0) {
            turret.reload = turret.relode_time
            shootProjectiles(turret, target.distance, target.creep);
        }
    }

    function rotateTurret(turret, angle, sec) {
        potential = .75 * Math.PI * sec;
        if (Math.abs(turret.degree - angle) <= potential) {
            turret.degree = angle;
            return;
        }
        if (turret.degree < angle) {
            if (angle - turret.degree > Math.PI) {
                turret.degree -= potential;
            } else {
                turret.degree += potential;
            }
        } else {
            if (turret.degree - angle > Math.PI) {
                turret.degree += potential;
            } else {
                turret.degree -= potential;
            }
        }
        if (turret.degree < 0) turret.degree = (2 * Math.PI) + turret.degree;
        if (turret.degree > 2 * Math.PI) turret.degree = 0 + (turret.degree - (2 * Math.PI));
    }

    function aimTurret(turret, sec) {
        let target = findClosestCreep(turret);
        if (!target) return;
        if (target.creep === undefined) return;
        if (target.distance > turret.radius) return;
        let x_diff = target.creep.pos.x - turret.center.x;
        let y_diff = target.creep.pos.y - turret.center.y;
        let target_angle = Math.atan2(-y_diff, x_diff);
        if (target_angle < 0) target_angle = ((2 * Math.PI) - Math.abs(target_angle));
        if (Math.abs(turret.degree - target_angle) < Math.PI / 16) {
            fireTurret(turret, target, sec);
        }
        turret.reload -= sec;
        rotateTurret(turret, target_angle, sec);
    }

    function updateTurrets(sec) {
        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLS; j++) {
                let turret = gameGrid[i][j];
                if (turret === undefined) continue;
                aimTurret(turret, sec);
            }
        }
    }

    function updateCreepScore(sec) {
        let keep = [];
        for (let i = 0; i < creepScore.length; i++) {
            let c = creepScore[i];
            c.pos.y -= 50 * sec;
            c.time -= sec;
            if (c.time > 0) {
                keep.push(c);
            }
        }
        creepScore = keep;
    }

    ////////////////////////////
    // General game functions //
    ////////////////////////////

    function checkLives() {
        if (lives <= 0) run = false;
    }

    function recordHighScores(name) {
        let scores = [{
            name: name,
            score: score
        }];

        let previousScores = localStorage.getItem('TowerHighScores');
        if (previousScores !== null) {
            let highScores = JSON.parse(previousScores);
            for (let i = 0; i < highScores.length; i++) {
                scores.push(highScores[i]);
            }
        }

        scores.sort(function (a, b) { return a.score - b.score });
        scores.reverse();
        scores = scores.slice(0, 10);
        localStorage['TowerHighScores'] = JSON.stringify(scores);
    }

    function gameOver() {
        let name = prompt("GAME OVER...  Enter Your Name", "NAME");
        recordHighScores(name);
        showMainMenu();
    }

    /////////////////////////
    // Main Game Functions //
    /////////////////////////

    function processInput() {
        checkTowerSelection();
        for (let key in keyInput.keys) {
            if (keyInput.handlers[key]) {
                keyInput.handlers[key]();
            }
        }
    }

    function update(elapsedTime) {
        updateTurrets(elapsedTime / 1000);
        updateProjectiles(elapsedTime / 1000);
        particles.update(elapsedTime / 1000);
        updateCreepScore(elapsedTime / 1000);
        checkLives();

        if (creeps.length) {
            updateCreepImages(elapsedTime / 1000);
            checkCreeps();
        }
    }

    function render() {
        graphics.render({
            gameGrid: gameGrid,
            mouse: currentMousePos,
            select: selectionMode,
            money: money,
            creeps: creeps,
            selectedTurret: selectedTurret,
            projectiles: projectiles,
            lives: lives,
            level: level,
            score: score,
            creepPoints: creepScore,
            path: rightPath
        });
        particles.render();
    }

    function gameLoop() {
        let currentTime = performance.now();
        let elapsedTime = currentTime - previousTime;
        previousTime = currentTime;

        processInput();
        update(elapsedTime);
        render();

        if (run) {
            requestAnimationFrame(gameLoop);
        } else {
            gameOver();
        }
    }

    ///////////////////////////////////
    // Initialize all game variables //
    ///////////////////////////////////

    function initializeGameGrid() {
        for (let i = 0; i < ROWS; i++) {
            gameGrid.push([]);
            for (let j = 0; j < COLS; j++) {
                gameGrid[i].push(undefined);
            }
        }
    }

    function initializeKeys() {
        let controls = localStorage.getItem('options');
        if (controls) options = JSON.parse(controls);
        keyInput.handlers[options[0]] = upgradeSelected;
        keyInput.handlers[options[1]] = sellSelected;
        keyInput.handlers[options[2]] = startNextLevel;
    }

    ////////////////////////////////
    // Initialize Helper Function //
    ////////////////////////////////

    function initialize() {
        initializeGameGrid();
        initializeKeys();
        leftPath = pathfinder.findPath(gameGrid, { x: 0, y: 8 }, { x: COLS - 1, y: 8 }).path;
        rightPath = pathfinder.findPath(gameGrid, { x: 8, y: 0 }, { x: 8, y: ROWS - 1 }).path;
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

function changeSelection(tower) {
    if (currentSelection === tower) {
        currentSelection = undefined;
        return;
    }
    currentSelection = tower;
}