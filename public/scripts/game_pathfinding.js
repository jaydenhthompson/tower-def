//////////////////////////////
//                          //
//   Pathfinding Function   //
//                          //
//////////////////////////////

Game.pathfinding = (function(){
    function distance(start, end){
        return abs(start.x - end.x) + abs(start.y - end.y);
    }

    function findNeighbors(pos){
        // Possible neighbors
        let up    = pos.y - 1;
        let down  = pos.y + 1;
        let left  = pos.x - 1;
        let right = pos.x + 1;
    }

    function findPath(gameGrid, start, end){

    }

    return{
        distance: distance,
        findPath: findPath
    }
}());
