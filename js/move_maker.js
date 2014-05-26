var NORTH = 0,
    EAST  = 1,
    SOUTH = 2,
    WEST  = 3;

function moveInDirection(direction) {
	gameManager.inputManager.emit("move", direction);
}

function restartGame() {
  moves = 0;
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

function logRun (type, score, moves, largestNumber) {
  var run = {};
  run.run_type = type;
  run.score = score;
  run.moves = moves;
  run.largest_number = largestNumber;

  console.log("LOGGING RUN!!!");

  $.ajax({
    url: "/runs.json",
    method : "POST",
    dataType : "json",
    data : { "run" : run },
    success : function () {
      console.log("success!!");
    },
    error : function () {
      console.log("error!!!");
    }
  });
}
// It performed much better when
// you could not move west!
var randomIntervalObj;
var moves = 0;
function playRandomly(millis) {
  playRandomlyWithoutDirection(null);
}

function playRandomlyWithoutDirection(direction, millis) {
  var timePerMoveInMilliseconds = millis || 125;
  randomIntervalObj = setInterval(function() {
    if (gameManager.over) {
      logRun("random", gameManager.score, moves, gameManager.grid.largestNumber());
      console.log("score : " + gameManager.score 
            + " ; moves : " + moves + " ; largestNumber : " + gameManager.grid.largestNumber());
      restartGame();
    }

    var move = Math.floor(Math.random() * 4);
    while (move == direction) move = Math.floor(Math.random() * 4);
    moveInDirection(move);
    // TODO: Only increment move if it is a valid move!
    moves++;
  }, timePerMoveInMilliseconds);
}

function stopPlayingRandomly() {
  clearInterval(randomIntervalObj);
}