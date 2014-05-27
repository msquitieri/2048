var NORTH = 0,
    EAST  = 1,
    SOUTH = 2,
    WEST  = 3;

function moveInDirection(direction) {
	gameManager.inputManager.emit("move", direction);
}

function playBasedOnUtilityFunction () {
  randomIntervalObj = setInterval(moveBasedOnNextMove, 200);
}


function moveBasedOnNextMove () {
  var north, south, east, west;

  if (gameManager.over) return;

  north = gameManager.getUtilityForDirection(NORTH);
  south = gameManager.getUtilityForDirection(SOUTH);
  east = gameManager.getUtilityForDirection(EAST);
  west = gameManager.getUtilityForDirection(WEST);

  var map = {};

  map[north] = NORTH;
  map[south] = SOUTH;
  map[east]  = EAST;
  map[west]  = WEST;

  // console.log("map : ");
  // console.log(map);

  var keys = Object.keys(map);
  var max  = -1;
  for (var i = 0; i < keys.length; i++) {
    if (max < keys[i]) max = keys[i];
  }

  var direction = map[max];
  // If it can't move in that direction, that means
  // they all have utility 0. Pick a random direction
  // to go.
  while (!gameManager.canMoveInDirection(direction) && !gameManager.isOver) {
    // console.log("picking random move");
    direction = Math.floor(Math.random() * 4);  
  }

  // console.log("going in direction: " + map[max]);
  moveInDirection(direction);
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
  var run = {
    run_type : type,
    score : score,
    moves : moves,
    largest_number : largestNumber
  };

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
  playRandomlyWithoutDirection(null, millis);
}

function playRandomlyWithoutDirection(direction, millis) {
  var timePerMoveInMilliseconds = millis || 125;
  randomIntervalObj = setInterval(function() {
    if (gameManager.over) {
      // logRun("random", gameManager.score, moves, gameManager.grid.largestNumber());
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

function stopPlaying() {
  clearInterval(randomIntervalObj);
}
