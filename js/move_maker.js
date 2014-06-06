var NORTH = 0,
    EAST  = 1,
    SOUTH = 2,
    WEST  = 3;

var allDirections = [NORTH, SOUTH, EAST, WEST];

// Returns random integer in range [first, last);
function getRandomIntegerBetween(first, last) {
  return (Math.floor(Math.random() * last) + first);
}

function moveInDirection(direction) {
	gameManager.inputManager.emit("move", direction);
}

function play(name, moveFunction, millis) {
  var timePerMoveInMilliseconds = millis || 125;

  intervalObj = setInterval(function() {
    if (gameManager.over) {
      // logRun(name, gameManager.score, moves, gameManager.grid.largestNumber());
      console.log("score : " + gameManager.score 
            + " ; moves : " + moves + " ; largestNumber : " + gameManager.grid.largestNumber());
      restartGame();
    }

    var move = moveFunction();
    moveInDirection(move);
    moves++;
  }, timePerMoveInMilliseconds);
}

function getRandomMove() {
  console.log("GETTING RANDOM MOVE!!");

  var move = getRandomIntegerBetween(0, allDirections.length);
  
  while (!gameManager.canMoveInDirection(move)) 
    move = getRandomIntegerBetween(0, allDirections.length);

  return move;
}

function getKeyWithHighestValue (map) {
  var keys = Object.keys(map);
  var max  = -1;
  var keyInt;

  for (var i = 0; i < keys.length; i++) {
    keyInt = parseInt(keys[i]);
    if (max < keyInt) max = keyInt;
  }

  return max;
}

function getValueFromHighestKey (map) {
  var max = getKeyWithHighestValue(map);

  return map[max];
}

function getUtilityMap (utilityFunction) {
  var north, south, east, west;
  var map = {};

  north = utilityFunction(NORTH);
  south = utilityFunction(SOUTH);
  east = utilityFunction(EAST);
  west = utilityFunction(WEST);

  map[north] = NORTH;
  map[south] = SOUTH;
  map[east]  = EAST;
  map[west]  = WEST;

  return map;
}

function getDirectionFromMap (map) {
  var keys = Object.keys(map);

  if (keys.length != 1) {
    direction = getValueFromHighestKey(map);
  } else {
    // Return false to designate that there is no
    // move with highest utility.
    direction = false;
  }

  return direction;
}

function getDirectionFromUtilityFunction (utilityFunction) {
  var map = getUtilityMap(utilityFunction);

  var direction = getDirectionFromMap(map);

  return direction;
}

function getMoveBasedOnUtilityAndAdjacency () {
  var direction;

  if (gameManager.over) return;

  direction = getDirectionFromUtilityFunction(function (direction) {
    var utilityWeight   = 1;
    var adjacencyWeight = 0.5;

    return (utilityWeight * gameManager.getUtilityForDirection(direction)
      + adjacencyWeight * gameManager.getAdjacencyUtilityForDirection(direction));
  });

  if (!direction) direction = getRandomMove();

  return direction;
}

function getBestMoveByAdjacency () {
  var direction;

  if (gameManager.over) return;

  direction = getDirectionFromUtilityFunction(function (direction) {
    return gameManager.getAdjacencyUtilityForDirection(direction);
  });

  if (!direction) direction = getRandomMove();

  return direction;
}

function getBestNextMoveOrBestAdjacency () {
  var direction;

  if (gameManager.over) return;

  direction = getBestNextMove();
  if (!direction) {
    direction = getBestMoveByAdjacency();
    if (!direction) direction = getRandomMove();
  }

  return direction;
}

function getBestNextMove() {
  var direction;

  if (gameManager.over) return;

  direction = getDirectionFromUtilityFunction(function(direction) {
    return gameManager.getUtilityForDirection(direction);
  });

  if (!direction) direction = getRandomMove();

  return direction;
}

function moveBasedOnNextMove () {
  var direction = getBestNextMove();
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
var intervalObj;
var moves = 0;
function playRandomly(millis) {
  playRandomlyWithoutDirection(null, millis);
}

function playRandomlyWithoutDirection(direction, millis) {
  var timePerMoveInMilliseconds = millis || 125;
  intervalObj = setInterval(function() {
    if (gameManager.over) {
      // logRun("random", gameManager.score, moves, gameManager.grid.largestNumber());
      console.log("score : " + gameManager.score 
            + " ; moves : " + moves + " ; largestNumber : " + gameManager.grid.largestNumber());
      restartGame();
    }

    var move = getRandomIntegerBetween(0, allDirections.length);
    while (move == direction) move = getRandomIntegerBetwee(0, allDirections.length);
    moveInDirection(move);

    moves++;
  }, timePerMoveInMilliseconds);
}

function stopPlaying() {
  clearInterval(intervalObj);
}
