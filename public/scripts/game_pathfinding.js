//////////////////////////////
//                          //
//   Pathfinding Function   //
//                          //
//////////////////////////////

Game.pathfinding = (function () {
    let pathGrid = [];

    function distance(start, end) {
        return Math.abs(start.x - end.x) + Math.abs(start.y - end.y);
    }

    function initializePath(gameGrid) {
        pathGrid = [];
        for (let i = 0; i < ROWS; i++) {
            pathGrid.push([]);
            for (let j = 0; j < COLS; j++) {
                pathGrid[i].push(undefined);
            }
        }
        for (let i = 1; i < ROWS - 1; i++) {
            for (let j = 1; j < COLS - 1; j++) {
                pathGrid[i][j] = {
                    visited: false,
                    distance: ROWS * COLS,
                    pos: {
                        x: i,
                        y: j
                    }
                };
                if(gameGrid[i][j] !== undefined){
                    pathGrid[i][j] = undefined;
                }
            }
        }
        for (let i = 0; i < ROWS; i += (ROWS - 1)) {
            for (let j = 0; j < ROWS; j++) {
                if (j > 5 && j < 12) {
                    pathGrid[i][j] = {
                        visited: false,
                        distance: ROWS * COLS,
                        pos: {
                            x: i,
                            y: j
                        }
                    };
                    pathGrid[j][i] = {
                        visited: false,
                        distance: ROWS * COLS,
                        pos: {
                            x: j,
                            y: i
                        }
                    };
                }
            }
        }
    }

    function findPath(gameGrid, start, end) {
        let isPath = false;
        let visit = [];
        initializePath(gameGrid);
        let temp = pathGrid[end.x][end.y];
        temp.visited = true;
        temp.distance = 0;
        visit.push(temp);

        while (visit.length) {
            let cur = visit.shift();
            if (cur.pos.y > 0 && pathGrid[cur.pos.x][cur.pos.y - 1] !== undefined) {
                if (!pathGrid[cur.pos.x][cur.pos.y - 1].visited) {
                    pathGrid[cur.pos.x][cur.pos.y - 1].visited = true;
                    pathGrid[cur.pos.x][cur.pos.y - 1].distance = cur.distance + 1;
                    visit.push(pathGrid[cur.pos.x][cur.pos.y - 1]);
                }
            }
            if (cur.pos.y < ROWS - 1 && pathGrid[cur.pos.x][cur.pos.y + 1] !== undefined) {
                if (!pathGrid[cur.pos.x][cur.pos.y + 1].visited) {
                    pathGrid[cur.pos.x][cur.pos.y + 1].visited = true;
                    pathGrid[cur.pos.x][cur.pos.y + 1].distance = cur.distance + 1;
                    visit.push(pathGrid[cur.pos.x][cur.pos.y + 1]);
                }
            }
            if (cur.pos.x < ROWS - 1 && pathGrid[cur.pos.x + 1][cur.pos.y] !== undefined) {
                if (!pathGrid[cur.pos.x + 1][cur.pos.y].visited) {
                    pathGrid[cur.pos.x + 1][cur.pos.y].visited = true;
                    pathGrid[cur.pos.x + 1][cur.pos.y].distance = cur.distance + 1;
                    visit.push(pathGrid[cur.pos.x + 1][cur.pos.y]);
                }
            }
            if (cur.pos.x > 0 && pathGrid[cur.pos.x - 1][cur.pos.y] !== undefined) {
                if (!pathGrid[cur.pos.x - 1][cur.pos.y].visited) {
                    pathGrid[cur.pos.x - 1][cur.pos.y].visited = true;
                    pathGrid[cur.pos.x - 1][cur.pos.y].distance = cur.distance + 1;
                    visit.push(pathGrid[cur.pos.x - 1][cur.pos.y]);
                }
            }
        }

        if (pathGrid[start.x][start.y].visited) {
            isPath = true;
        }
        return {
            isPath: isPath,
            path: pathGrid
        }
    }

    return {
        distance: distance,
        findPath: findPath
    }
}());
