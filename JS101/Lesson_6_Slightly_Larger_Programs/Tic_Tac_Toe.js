/*
  Establish default state
  Determine user preferences
  Display game board
  Player's turn
    Prompt player move
    Display board containing players move
    Determine win or draw
  Computer's turn
    Decide where to play
    Display board
    Determine win or draw
  Repeat turns until someone wins or there is a draw
  Prompt user for a rematch
  Exit program
*/
// Dependencies
const MESSAGES = require('./Message_Options.json'),
  BOARD_DESIGN = require('./Board_Designs.json'),
  readline = require('readline-sync');
// Dependencies

// Initializing to defaults
const DEFAULT_STATE = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']],
  DEFAULT_LANGUAGE = 'ENGLISH';

Object.freeze(DEFAULT_STATE[0]);
Object.freeze(DEFAULT_STATE[1]);
Object.freeze(DEFAULT_STATE[2]);
Object.freeze(MESSAGES['ENGLISH']);
Object.freeze(MESSAGES['SPANISH']);
Object.freeze(BOARD_DESIGN['DEFAULT_BOARD']);
Object.freeze(BOARD_DESIGN['WINNERS_BOARD']);
  
let boardChoice = BOARD_DESIGN['DEFAULT_BOARD'],
  boardState = DEFAULT_STATE.slice(),
  hasWon = false,
  languageChoice = DEFAULT_LANGUAGE;
// Initializing to defaults

prompt('WELCOME', languageChoice);
displayBoard(boardState, boardChoice);


function playersTurn() {
  
}

function computersTurn() {
  
}

function determineWinOrDraw() {
  
}

function clearBoard() {
  boardState = DEFAULT_STATE.slice();
}// Resets the board state to the default

function updateBoard() {
  
}

function displayBoard(currentState, currentDesign) {
  console.log(` ${currentState[0][0]} ${currentDesign['COLUMN']} ${currentState[0][1]} ${currentDesign['COLUMN']} ${currentState[0][2]}`);
  console.log(`${currentDesign['ROW']}${currentDesign['INTERSECTION']}${currentDesign['ROW']}${currentDesign['INTERSECTION']}${currentDesign['ROW']}`);
  console.log(` ${currentState[1][0]} ${currentDesign['COLUMN']} ${currentState[1][1]} ${currentDesign['COLUMN']} ${currentState[1][2]}`);
  console.log(`${currentDesign['ROW']}${currentDesign['INTERSECTION']}${currentDesign['ROW']}${currentDesign['INTERSECTION']}${currentDesign['ROW']}`);
  console.log(` ${currentState[2][0]} ${currentDesign['COLUMN']} ${currentState[2][1]} ${currentDesign['COLUMN']} ${currentState[2][2]}`);
}// Logs the board to the console taking into account the design and state

function prompt(message = 'ERROR', languageChoice = DEFAULT_LANGUAGE) {
  console.log(`=> ${MESSAGES[languageChoice][message]}`)
}// Logs the desired message to the console while adding some 'flavor' to it