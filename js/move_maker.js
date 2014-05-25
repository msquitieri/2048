function swipeInDirection(direction) {
	gameManager.inputManager.emit("move", direction);
}

function swipeNorth() {
	swipeInDirection(0);
}
function swipeSouth() {
	swipeInDirection(2);
}
function swipeEast() {
	swipeInDirection(1);
}
function swipeWest() {
	swipeInDirection(3);
}

var randomIntervalObj;
function playRandomly(millis) {
  var timePerMoveInMilliseconds = millis || 125;
  randomIntervalObj = setInterval(function() {
    var move = Math.floor(Math.random() * 3);
    swipeInDirection(move);
  }, timePerMoveInMilliseconds);
}

function stopPlayingRandomly() {
  clearInterval(randomIntervalObj);
}