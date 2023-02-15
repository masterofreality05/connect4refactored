/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
let starter = document.getElementById('start')
starter.addEventListener('click',function(e){
  e.preventDefault()
  let height = document.getElementById('heightinput').value;
  let width = document.getElementById('widthinput').value; 
  let player1name = document.getElementById('player1name').value;
  let player1col = document.getElementById('player1colour').value;
  let player2name = document.getElementById('player2name').value;
  let player2col = document.getElementById('player2colour').value;
  
  let player1 = new Player(player1name,player1col)
  let player2 = new Player(player2name,player2col)
  let game1 = new Game(height,width,player1,player2);
  console.log(game1.board)
  console.log(player1)
  console.log(player2)
  
})

class Player {
  constructor(name,colour){
    this.name = name;
    this.colour = colour;
  }
}
  


class Game {
  constructor(height, width,play1,play2){
    this.player1 = play1;
    this.player2 = play2
    this.HEIGHT = height;
    this.WIDTH = width;
    this.currCounter = 1;
    this.board = [];
    this.currPlayer = this.player1
    this.makeBoard();
    this.boundHTML = this.makeHtmlBoard.bind(this);
    this.boundHTML()
    this.boundFind = this.findSpotForCol.bind(this)
    this.boundPlace = this.placeInTable.bind(this)
   


  }
  /** makeBoard: create in-JS board structure:
 *   board = array of rows, each row is array of cells  (board[y][x])
 */
  makeBoard() {
    for (let y = 0; y < this.HEIGHT; y++) {
      this.board.push(Array.from({ length: this.WIDTH }));
    }
  }
/** makeHtmlBoard: make HTML table and row of column tops. */
  makeHtmlBoard() {
    const board = document.getElementById('board');
  
    // make column tops (clickable area for adding a piece to that column)
    const top = document.createElement('tr');
    top.setAttribute('id', 'column-top');
    console.log(top)
    top.addEventListener('click', this.handleClick.bind(this));
  
    for (let x = 0; x < this.WIDTH; x++) {
      const headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      top.append(headCell);
    }
  
    board.append(top);
  
    // make main part of board
    for (let y = 0; y < this.HEIGHT; y++) {
      const row = document.createElement('tr');
  
      for (let x = 0; x < this.WIDTH; x++) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `${y}-${x}`);
        row.append(cell);
      }
  
      board.append(row);
    }
  }


/** findSpotForCol: given column x, return top empty y (null if filled) */
  findSpotForCol(x) {
if(this.board[0][x]){

  alert("the column is full")

} else {

  for (let y = this.HEIGHT - 1; y >= 0; y--) {
    if (!this.board[y][x]) {
      return y;
    }
  }
  return null;
}

}

   

  /** placeInTable: update DOM to place piece into HTML table of board */

 placeInTable(y, x) {

  const piece = document.createElement('div');
  piece.classList.add('piece');
  piece.style.backgroundColor = this.currPlayer.colour;
  piece.style.top = -50 * (y + 2);

  const spot = document.getElementById(`${y}-${x}`);
  spot.append(piece);
}

/** endGame: announce game end */

endGame(msg) {
  alert(msg);
}


/** checkForWin: check board cell-by-cell for "does a win start here?" */
checkForWin() {
  

  for (let y = 0; y < this.HEIGHT; y++) {
    for (let x = 0; x < this.WIDTH; x++) {
      // get "check list" of 4 cells (starting here) for each of the different
      // ways to win
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      // find winner (only checking each win-possibility as needed)
      if (this._win(horiz) ||this. _win(vert) || this._win(diagDR) || this._win(diagDL)) {
        return true;
      }
    }
  }
}

 _win(cells) {
  // Check four cells to see if they're all color of current player
  //  - cells: list of four (y, x) cells
  //  - returns true if all are legal coordinates & all match currPlayer

  return cells.every(
    ([y, x]) =>
      y >= 0 &&
      y < this.HEIGHT &&
      x >= 0 &&
      x < this.WIDTH &&
      this.board[y][x] === this.currPlayer.colour
  );
}

handleClick(evt) {
  this.currCounter++
  console.log(this.currCounter)
  
  console.log(this.player1)
  console.log("check")
  // get x from ID of clicked cell
  const x = +evt.target.id;
  console.log(x)

  // get next spot in column (if none, ignore click)
  const y = this.boundFind(x);
  if (y === null) {
    return;
  }
  console.log(this.board)
  // place piece in board and add to HTML table
  this.board[y][x] = this.currPlayer.colour;
  this.boundPlace(y, x);
  
  let win = false;
  let tie = false;
  // check for win
  if (this.checkForWin.bind(this)(this._win.bind(this))) {
    
    return this.endGame(`${this.currPlayer.name} won!`);
    win = true;
  }
  
  // check for tie
  if (this.board.every(row => row.every(cell => cell))) {
    return this.endGame('Tie!');
    tie = true;
  }


    
  // switch players
  this.currCounter % 2 == 1? this.currPlayer = this.player1: this.currPlayer = this.player2;
  console.log(this.currPlayer)
}

}




