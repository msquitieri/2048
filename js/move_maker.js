var NORTH = 0,
    EAST  = 1,
    SOUTH = 2,
    WEST  = 3;

function moveInDirection(direction) {
	gameManager.inputManager.emit("move", direction);
}

function restartGame() {
  gameManager.inputManager.emit("restart");
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

// It performed much better when
// you could not move west!
var randomIntervalObj;
function playRandomly(millis) {
  var timePerMoveInMilliseconds = millis || 125;
  randomIntervalObj = setInterval(function() {
    // if (gameManager.over) restartGame();

    var move = Math.floor(Math.random() * 4);
    moveInDirection(move);
  }, timePerMoveInMilliseconds);
}

function stopPlayingRandomly() {
  clearInterval(randomIntervalObj);
}
