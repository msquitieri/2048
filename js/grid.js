function Grid(size, previousState) {
  this.size = size;
  this.cells = previousState ? this.fromState(previousState) : this.empty();
}

// Build a grid of the specified size
Grid.prototype.empty = function () {
  var cells = [];

  for (var x = 0; x < this.size; x++) {
    var row = cells[x] = [];

    for (var y = 0; y < this.size; y++) {
      row.push(null);
    }
  }

  return cells;
};

Grid.prototype.fromState = function (state) {
  var cells = [];

  for (var x = 0; x < this.size; x++) {
    var row = cells[x] = [];

    for (var y = 0; y < this.size; y++) {
      var tile = state[x][y];
      row.push(tile ? new Tile(tile.position, tile.value) : null);
    }
  }

  return cells;
};

// Find the first available random position
Grid.prototype.randomAvailableCell = function () {
  var cells = this.availableCells();

  if (cells.length) {
    return cells[Math.floor(Math.random() * cells.length)];
  }
};

Grid.prototype.availableCells = function () {
  var cells = [];

  this.eachCell(function (x, y, tile) {
    if (!tile) {
      cells.push({ x: x, y: y });
    }
  });

  return cells;
};

// Call callback for every cell
Grid.prototype.eachCell = function (callback) {
  for (var x = 0; x < this.size; x++) {
    for (var y = 0; y < this.size; y++) {
      callback(x, y, this.cells[x][y]);
    }
  }
};

Grid.prototype.getTilesFromRowsAndColumns = function(rows, columns) {
  // If not specified, use all rows or columns.
  if (!rows) rows = [0, 1, 2, 3];
  if (!columns) columns = [0, 1, 2, 3];

  var tiles = [];
  for (var i = 0; i < rows.length; i++) {
    for (var j = 0; j < columns.length; j++) {
      if (this.isTileAtPosition(columns[j], rows[i])) {
        tiles.push(this.tileAtPosition(columns[j], rows[i]));
      }
    }
  }
  return tiles;
};

Grid.prototype.getWestTiles = function() {
  var columns = [0, 1];

  return this.getTilesFromRowsAndColumns(null, columns);
};

Grid.prototype.getEastTiles = function() {
  var columns = [2, 3];

  return this.getTilesFromRowsAndColumns(null, columns);
};

Grid.prototype.getNorthTiles = function() {
  var rows = [0, 1];

  return this.getTilesFromRowsAndColumns(rows, null);
};

Grid.prototype.getSouthTiles = function() {
  var rows = [2, 3];

  return this.getTilesFromRowsAndColumns(rows, null);
};

Grid.prototype.isTileAtPosition = function(x, y) {
  return !!this.tileAtPosition(x, y);
};

Grid.prototype.tileAtPosition = function(x, y) {
  var cell = { x : x, y : y };
  return this.cellContent(cell);
};

// Check if there are any cells available
Grid.prototype.cellsAvailable = function () {
  return !!this.availableCells().length;
};

// Check if the specified cell is taken
Grid.prototype.cellAvailable = function (cell) {
  return !this.cellOccupied(cell);
};

Grid.prototype.cellOccupied = function (cell) {
  return !!this.cellContent(cell);
};

Grid.prototype.cellContent = function (cell) {
  if (this.withinBounds(cell)) {
    return this.cells[cell.x][cell.y];
  } else {
    return null;
  }
};

// Inserts a tile at its position
Grid.prototype.insertTile = function (tile) {
  this.cells[tile.x][tile.y] = tile;
};

Grid.prototype.removeTile = function (tile) {
  this.cells[tile.x][tile.y] = null;
};

Grid.prototype.withinBounds = function (position) {
  return position.x >= 0 && position.x < this.size &&
         position.y >= 0 && position.y < this.size;
};

Grid.prototype.largestNumber = function() {
  var max = -1;
  this.eachCell(function(x, y, tile) {
    if (tile) {
      if (max < tile.value) max = tile.value;
    }
  });
  return max;
};

Grid.prototype.getNumberOfTiles = function() {
  var totalPossibleTiles = this.size * this.size;

  return totalPossibleTiles - this.availableCells().length;
};

Grid.prototype.serialize = function () {
  var cellState = [];

  for (var x = 0; x < this.size; x++) {
    var row = cellState[x] = [];

    for (var y = 0; y < this.size; y++) {
      row.push(this.cells[x][y] ? this.cells[x][y].serialize() : null);
    }
  }

  return {
    size: this.size,
    cells: cellState
  };
};
