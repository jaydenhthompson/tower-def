/////////////////////////////////
//                             //
// Initializes the Game object //
//                             //
/////////////////////////////////

let Game = {}

/////////////////////////////////
//                             //
//     Global Game Objects     //
//                             //
/////////////////////////////////

let canvas = document.getElementById('canvas-main');
let ctx = canvas.getContext('2d');
let sounds = true;
let show_bounds = true;
let show_grid = true;
let options = ['u', 's', 'g'];

const HEIGHT = canvas.height;
const WIDTH = canvas.width;
const ROWS = HEIGHT / 50;
const COLS = WIDTH / 50;
const CELL_WIDTH = WIDTH / COLS;
const CELL_HEIGHT = HEIGHT / ROWS;

//////////////////////////////////////////
//                                      //
// Creates game rendering functionality //
//                                      //
//////////////////////////////////////////

Game.graphics = (function () {

    ////////////////////////
    // Function variables //
    ////////////////////////

    /////////////////////////////////////////
    // Functions to render dynamic objects //
    /////////////////////////////////////////

    //TODO

    ////////////////////////////////////////////////////
    // Functions to render static objects and scenery //
    ////////////////////////////////////////////////////

    function drawBackground() {
        let background = new Image();
        background.src = "resources/backgroundSpace_01.1.png";

        background.onload = function () {
            ctx.drawImage(
                background, 0, 0, background.width, background.height, 0, 0, WIDTH, HEIGHT
            );
        }
    }

    function drawBounds() {
        // Top Left
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(WIDTH / 3, 0);
        ctx.lineTo(WIDTH / 3, HEIGHT / 18);
        ctx.lineTo(WIDTH / 18, HEIGHT / 18);
        ctx.lineTo(WIDTH / 18, HEIGHT / 3);
        ctx.lineTo(0, HEIGHT / 3);
        ctx.closePath();
        ctx.fillStyle = 'grey';
        ctx.fill();
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'black';
        ctx.stroke();

        //Top Right
        ctx.beginPath();
        ctx.moveTo(WIDTH - 1, 0);
        ctx.lineTo(WIDTH - (WIDTH / 3), 0);
        ctx.lineTo(WIDTH - (WIDTH / 3), HEIGHT / 18);
        ctx.lineTo(WIDTH - (WIDTH / 18), HEIGHT / 18);
        ctx.lineTo(WIDTH - (WIDTH / 18), HEIGHT / 3);
        ctx.lineTo(WIDTH - 1, HEIGHT / 3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        //Bottom Left
        ctx.beginPath();
        ctx.moveTo(0, HEIGHT - 1);
        ctx.lineTo(WIDTH / 3, HEIGHT - 1);
        ctx.lineTo(WIDTH / 3, HEIGHT - (HEIGHT / 18));
        ctx.lineTo(WIDTH / 18, HEIGHT - (HEIGHT / 18));
        ctx.lineTo(WIDTH / 18, HEIGHT - (HEIGHT / 3));
        ctx.lineTo(0, HEIGHT - (HEIGHT / 3));
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        //Bottom Right
        ctx.beginPath();
        ctx.moveTo(WIDTH - 1, HEIGHT - 1);
        ctx.lineTo(WIDTH - (WIDTH / 3), HEIGHT - 1);
        ctx.lineTo(WIDTH - (WIDTH / 3), HEIGHT - (HEIGHT / 18));
        ctx.lineTo(WIDTH - (WIDTH / 18), HEIGHT - (HEIGHT / 18));
        ctx.lineTo(WIDTH - (WIDTH / 18), HEIGHT - (HEIGHT / 3));
        ctx.lineTo(WIDTH - 1, HEIGHT - (HEIGHT / 3));
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    function drawSelectedTurret(turret) {
        if (turret == undefined) return;
        ctx.beginPath();
        ctx.strokeStyle = 'rgb(0, 255, 17)';
        ctx.lineWidth = 3;
        ctx.fillStyle = 'rgba(0, 255, 17, 0.1)';
        ctx.arc(turret.center.x, turret.center.y, turret.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }

    function drawBases(matrix) {
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] === undefined) continue;
                let base = new Image();
                base.src = "resources/tower-defense-turrets/turret-base.gif";
                base.onload = function () {
                    ctx.drawImage(base, 7.5, 7.5, base.width - 15, base.height - 15,
                        i * (WIDTH / COLS), j * (HEIGHT / ROWS), WIDTH / COLS, HEIGHT / ROWS);
                }
            }
        }
    }

    function drawProjectiles(projectiles) {
        for (let i = 0; i < projectiles.length; i++) {
            let cur = projectiles[i]
            let rad = 3;
            ctx.beginPath();
            ctx.lineWidth = 1;
            if (cur.type === "lazer") {
                ctx.fillStyle = 'green';
                ctx.strokeStyle = 'blue';
            } else if (cur.type === "bomb") {
                ctx.fillStyle = 'red'
                rad = 5
                ctx.strokeStyle = 'orange';
                ctx.lineWidth = 2;
            } else {
                ctx.fillStyle = 'orange';
                ctx.strokeStyle = 'red';
            }
            ctx.arc(cur.pos.x, cur.pos.y, 3, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
        }
    }

    function drawUnits(matrix) {
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] === undefined) continue;
                let turret = new Image();
                turret.src = matrix[i][j].image;
                turret.onload = function () {
                    ctx.save();
                    ctx.translate(matrix[i][j].center.x, matrix[i][j].center.y);
                    ctx.rotate((Math.PI / 2) - matrix[i][j].degree);
                    ctx.translate(-matrix[i][j].center.x, -matrix[i][j].center.y);
                    ctx.drawImage(turret, (i * (WIDTH / COLS)) + 2, (j * (HEIGHT / ROWS)) + 2,
                        (WIDTH / COLS) - 4, (HEIGHT / ROWS) - 4);
                    ctx.restore();
                }
            }
        }
    }

    function drawCreep(creep) {
        // Draw Actual Creep
        let npc = new Image();
        npc.src = creep.image.render;
        let x = creep.pos.x - (CELL_WIDTH / 2);
        let y = creep.pos.y - (CELL_HEIGHT / 2);
        npc.onload = function () {
            ctx.save();
            ctx.translate(creep.pos.x, creep.pos.y);
            ctx.rotate((Math.PI * 2) - creep.degree);
            ctx.translate(-creep.pos.x, -creep.pos.y);
            ctx.drawImage(npc, x, y);
            ctx.restore();
        }

        // Draw health bar
        let percent = creep.life / creep.maxLife;
        ctx.fillStyle = 'rgb(81, 81, 81)';
        ctx.fillRect(x, y - 7, CELL_WIDTH, 5);
        ctx.fillStyle = 'rgb(61, 135, 255)';
        ctx.fillRect(x, y - 7, CELL_WIDTH * percent, 5);
    }

    function drawCreeps(creeps) {
        for (let i = 0; i < creeps.length; i++) {
            drawCreep(creeps[i]);
        }
    }

    function drawCreepScore(scores) {
        for (let i = 0; i < scores.length; i++) {
            ctx.font = "20px Ariel";
            ctx.fillStyle = 'yellow';
            ctx.textAlign = 'center';
            ctx.fillText(scores[i].score.toString(), scores[i].pos.x, scores[i].pos.y);
        }
    }

    function drawLevel(level) {
        let levelGui = document.getElementById('level');
        levelGui.innerHTML = "Level: " + level;
    }

    function drawMoney(money) {
        let moneyGui = document.getElementById('money');
        moneyGui.innerHTML = "Money: " + money;
    }

    function drawLives(lives) {
        let livesGui = document.getElementById('lives');
        livesGui.innerHTML = "Lives: " + lives;
    }

    function drawScore(score) {
        let scoreGui = document.getElementById('score');
        scoreGui.innerHTML = "Score: " + score;
    }

    function drawControls() {
        let optionsGui = document.getElementById('cont');
        optionsGui.innerHTML = "Upgrade: " + options[0] + "<br>";
        optionsGui.innerHTML += "Sell: " + options[1] + "<br>";
        optionsGui.innerHTML += "Next Level: " + options[2] + "<br>";
    }

    function drawGrid() {
        if (!show_grid) return;
        ctx.beginPath();
        //draw vertical lines
        for (let i = 1; i < COLS; i++) {
            ctx.moveTo(WIDTH * (i / COLS), 0);
            ctx.lineTo(WIDTH * (i / COLS), HEIGHT - 1);
        }

        //draw horizontal lines
        for (let i = 1; i < ROWS; i++) {
            ctx.moveTo(0, HEIGHT * (i / ROWS));
            ctx.lineTo(WIDTH - 1, HEIGHT * (i / ROWS));
        }

        ctx.lineWidth = 2;
        ctx.strokeStyle = 'red';
        ctx.stroke();
    }

    // Helper function to determine fire radii
    function findRadius() {
        if (currentSelection === 'ground1') return 100;
        if (currentSelection === 'ground2') return 150;
        if (currentSelection === 'air1') return 175;
        if (currentSelection === 'air2') return 200;
    }

    function highlightSquare(mouse, grid) {
        if (!mouse || !currentSelection) return;
        if (mouse.x < 1 || mouse.x >= (WIDTH / 50) - 1 || mouse.y < 1 || mouse.y >= (HEIGHT / 50) - 1) return;
        if (grid[mouse.x][mouse.y] !== undefined) return;
        x = mouse.x * 50;
        y = mouse.y * 50;
        ctx.fillStyle = 'rgba(255, 0, 0, .4)';
        ctx.fillRect(x, y, WIDTH / COLS, HEIGHT / ROWS);

        if (show_bounds) {
            ctx.beginPath();
            ctx.strokeStyle = 'rgb(0, 255, 17)';
            ctx.lineWidth = 3;
            ctx.arc(x + ((WIDTH / COLS) / 2), y + ((HEIGHT / ROWS) / 2), findRadius(), 0, 2 * Math.PI);
            ctx.stroke();
        }
    }

    function drawPath(path) {
        for (let i = 0; i < path.length; i++) {
            for (let j = 0; j < path[i].length; j++) {
                if (path[i][j] === undefined) continue;
                ctx.font = "20px Ariel";
                ctx.fillStyle = 'white';
                ctx.textAlign = 'center';
                ctx.fillText(path[i][j].distance.toString(), (50 * i) + 25, (50 * j) + 25)
            }
        }
    }

    //////////////////////////
    // Main render function //
    //////////////////////////

    function render(objects) {
        drawBackground();
        drawBounds();
        drawSelectedTurret(objects.selectedTurret);
        drawBases(objects.gameGrid);
        drawProjectiles(objects.projectiles);
        drawUnits(objects.gameGrid);
        drawCreeps(objects.creeps);
        drawCreepScore(objects.creepPoints);
        drawLevel(objects.level);
        drawMoney(objects.money);
        drawLives(objects.lives);
        drawScore(objects.score);
        drawControls();

        // SHOW PATH NUMBERS FOR DEBUG
        //drawPath(objects.path);

        // Draw only if selecting spot for tower
        if (objects.select) {
            drawGrid();
            highlightSquare(objects.mouse, objects.gameGrid);
        }
    }

    ////////////////////////////////////////////
    // Functions to make externally available //
    ////////////////////////////////////////////
    return {
        render: render
    }
}());