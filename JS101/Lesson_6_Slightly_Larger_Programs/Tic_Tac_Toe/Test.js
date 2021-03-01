// Dependencies begin
let fs = require('fs'),
  profiles = JSON.parse(fs.readFileSync('Profiles.json'));
const MESSAGES = JSON.parse(fs.readFileSync(`Message_Options.json`)),
  BOARD_DESIGN = JSON.parse(fs.readFileSync('Board_Designs.json')),
  VALID_INPUTS = JSON.parse(fs.readFileSync('Inputs.json')),
  readline = require('readline-sync');
// Dependencies end

// Initializing global variables begin
const UNCHOSEN_TILE = ' ',
  DEFAULT_STATE = {
    "A": { "1": UNCHOSEN_TILE, "2": UNCHOSEN_TILE, "3": UNCHOSEN_TILE},
    "B": { "1": UNCHOSEN_TILE, "2": UNCHOSEN_TILE, "3": UNCHOSEN_TILE},
    "C": { "1": UNCHOSEN_TILE, "2": UNCHOSEN_TILE, "3": UNCHOSEN_TILE}
  },
  DEFAULT_LANGUAGE = 'ENGLISH',
  TOTAL_GRID_TILES = 9;

Object.freeze(DEFAULT_STATE["A"]);
Object.freeze(DEFAULT_STATE["B"]);
Object.freeze(DEFAULT_STATE["C"]);
Object.freeze(MESSAGES['ENGLISH']);
Object.freeze(MESSAGES['SPANISH']);
Object.freeze(BOARD_DESIGN['DEFAULT BOARD']);
Object.freeze(BOARD_DESIGN['WINNERS BOARD']);
  
let hasWon,
  languageChoice,
  currentGame,
  playerWon,
  computerWon,
  currentPlayer,
  nextPlayer,
  availableTiles = TOTAL_GRID_TILES,// Default value
  boardChoice = BOARD_DESIGN['DEFAULT BOARD'],// Default value
  tokenChoice = BOARD_DESIGN['TOKENS']['X'],// Let the player choose laterrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
  computerToken = BOARD_DESIGN['TOKENS']['O'],
  boardState = deepClone(DEFAULT_STATE),// Default value
  keepPlaying = true;// Default value
// Initializing global variables end

function deepClone(objectToClone) {
  return require('v8').deserialize(require('v8').serialize(objectToClone));
}// Serializes, then de-serializes, and then returns an object to effectively deep clone

profiles['Martha'] = {};
profiles['Martha']['LANGUAGE'] = 'ENGLISH';
console.log(profiles);
// Checks to see if there are two consecutive tokens in a row and plays to either win or block

/* Code body begin
welcome();
displayProfiles();
chooseProfile();

if (hasWon) chooseABoard();
if (currentGame === 'Incomplete') continuePreviousGame();// Lets them load their last unfinished game from their profile

do {
  if (currentGame === 'Complete') initializeGame();
  
  console.clear();

  displayBoard(boardState, boardChoice, tokenChoice, computerToken);
  boardState = playersTurn(boardState, tokenChoice);
  playerWon = determineWinner(boardState, tokenChoice);
  availableTiles -= 1;
  if(playerWon || availableTiles === 0) currentGame = "Complete";
  
  if (currentGame === 'Incomplete') {
    boardState = computersTurn(boardState, computerToken, tokenChoice);
    currentGame = determineWinner(boardState, computerToken);
  }
  if (computerWon || availableTiles === 0) currentGame = "Complete";
  
  if (currentGame === 'Complete') {
    displayBoard(boardState, boardChoice, tokenChoice, computerToken);
    gameCompletion(playerWon, computerWon);
  }
} while(keepPlaying)
Code body end*/