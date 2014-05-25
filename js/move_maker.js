var NORTH = 0,
    EAST  = 1,
    SOUTH = 2,
    WEST  = 3;

function moveInDirection(direction) {
	gameManager.inputManager.emit("move", direction);
}

function moveNorth() {
	moveInDirection(NORTH);
}
function moveSouth() {
	moveInDirection(SOUTH);
}
function moveEast() {
	moveInDirection(EAST);
}
function moveWest() {
	moveInDirection(WEST);
}

var randomIntervalObj;
function playRandomly(millis) {
  var timePerMoveInMilliseconds = millis || 125;
  randomIntervalObj = setInterval(function() {
    var move = Math.floor(Math.random() * 3);
    moveInDirection(move);
  }, timePerMoveInMilliseconds);
}

function stopPlayingRandomly() {
  clearInterval(randomIntervalObj);
}