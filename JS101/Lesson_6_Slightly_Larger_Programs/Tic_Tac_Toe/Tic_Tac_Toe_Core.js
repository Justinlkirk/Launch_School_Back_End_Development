// Dependencies beginnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
let fs = require('fs'),
  profiles = JSON.parse(fs.readFileSync('Profiles.json'));
const MESSAGES = JSON.parse(fs.readFileSync(`Message_Options.json`)),
  BOARD_DESIGN = JSON.parse(fs.readFileSync('Board_Designs.json')),
  VALID_INPUTS = JSON.parse(fs.readFileSync('Inputs.json')),
  readline = require('readline-sync');
// Dependencies endddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd

// Initializing global variables beginnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
const UNCHOSEN_TILE = ' ',
  DEFAULT_STATE = {
    "A": { "1": UNCHOSEN_TILE, "2": UNCHOSEN_TILE, "3": UNCHOSEN_TILE},
    "B": { "1": UNCHOSEN_TILE, "2": UNCHOSEN_TILE, "3": UNCHOSEN_TILE},
    "C": { "1": UNCHOSEN_TILE, "2": UNCHOSEN_TILE, "3": UNCHOSEN_TILE}
  },
  DEFAULT_LANGUAGE = 'ENGLISH',
  TOTAL_GRID_TILES = 9,
  MAX_WINS = 2;

Object.freeze(DEFAULT_STATE["A"]);
Object.freeze(DEFAULT_STATE["B"]);
Object.freeze(DEFAULT_STATE["C"]);
Object.freeze(MESSAGES['ENGLISH']);
Object.freeze(MESSAGES['SPANISH']);
Object.freeze(BOARD_DESIGN['DEFAULT BOARD']);
Object.freeze(BOARD_DESIGN['WINNERS BOARD']);
  
let keepPlaying = true,
  roundComplete = true,
  matchComplete = true,
  playerMatchWins = 0,
  boardDesign = BOARD_DESIGN['DEFAULT BOARD'],
  tokenChoice = BOARD_DESIGN['TOKENS']['X'],
  computerToken = BOARD_DESIGN['TOKENS']['O'],
  languageChoice,
  playerRoundWins,
  computerRoundWins,
  availableTiles,
  currentPlayer,
  boardState;
// Initializing global variables enddddddddddddddddddddddddddddddddddddddddddddddddddddddd

//Code body beginnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
welcome();
chooseLanguage();

do {
  if (roundComplete) {
    initializeRound();
    if (matchComplete) initializeMatch();
  }// Resets things at the start of each match and round
  
  displayBoard(boardState, boardDesign, tokenChoice, computerToken);
  takeTurn(boardState, currentPlayer, tokenChoice, computerToken);
  if (determineWinner(boardState, currentPlayer, tokenChoice, computerToken) || availableTiles === 0) roundComplete = true;
  else currentPlayer = alternatePlayer(currentPlayer);
  
  if (roundComplete) {
    displayBoard(boardState, boardDesign, tokenChoice, computerToken);
    
    if (determineWinner(boardState, currentPlayer, tokenChoice, computerToken)){
      prompt(`${currentPlayer} ${MESSAGES[languageChoice]['ROUND END 1']} ${computerRoundWins} ${MESSAGES[languageChoice]['ROUND END 2']} ${playerRoundWins}.`);
    }// Only logs the message if the current player won
    
    if (playerRoundWins >= MAX_WINS || computerRoundWins >= MAX_WINS) {
      if (playerRoundWins >= MAX_WINS) {
        playerMatchWins += 1;
        prompt(MESSAGES[languageChoice]['PLAYER VICTORY']);
      }
      else prompt(MESSAGES[languageChoice]['COMPUTER VICTORY']);
      matchComplete = true;
      askToPlayAgain();
    }
    else readline.question(prompt(`${MESSAGES[languageChoice]['PAUSE']}`))// Lets user start new rounds
  }
} while (keepPlaying);
//Code body enddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd

//Functions beginnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
function computersTurn(currentState, playerToken, compToken) {
  if (computerWinOrDefend(currentState, compToken, compToken)) return;// Offensive
  else if (computerWinOrDefend(currentState, playerToken, compToken)) return;// Defensive
  else computerRandomPlay(currentState, compToken);// Random play
}// Computer performs its move and returns the new state

function computerRandomPlay(currentBoardState, AIToken) {
  let columns = 'ABC',
    rows = '123',
    randomColumn = columns[Math.floor(Math.random() * columns.length)],
    randomRow = rows[Math.floor(Math.random() * rows.length)];
  if(currentBoardState[randomColumn][randomRow] === UNCHOSEN_TILE) {
    currentBoardState[randomColumn][randomRow] = AIToken;
  }
  else computerRandomPlay(currentBoardState, AIToken);
}// Randomly selects a tile and if that tile is full it plays in it, if not it re-randoms.

function computerWinOrDefend(currentBoardState, token, compToken) {
  let consecutivePieces,
    hasPlayed = false;
  const winCondition = [
    ['A1', 'A2', 'A3'], ['B1', 'B2', 'B3'], ['C1', 'C2', 'C3'], // Rows
    ['A1', 'B1', 'C1'], ['A2', 'B2', 'C2'], ['A3', 'B3', 'C3'], // Columns
    ['A1', 'B2', 'C3'], ['A3', 'B2', 'C1'] // Diagonals
    ];
    
  for (let winningArray of winCondition) {
    if (hasPlayed === true) break;
    consecutivePieces = 0;
    for (let tileValue of winningArray) {
      if (currentBoardState[tileValue[0]][tileValue[1]] === token) consecutivePieces += 1;
      if (consecutivePieces === 2) {
        winningArray.forEach((tileValue) => {
          if (currentBoardState[tileValue[0]][tileValue[1]] === UNCHOSEN_TILE) {
            currentBoardState[tileValue[0]][tileValue[1]] = compToken;
            hasPlayed = true;
          }
        })
        if (hasPlayed) break;
      }
    }
  }
  return hasPlayed;
}// Checks to see if there are two consecutive tokens in a row and plays to either win or block

function askToPlayAgain() {
  let UserInput = readline.question(prompt(MESSAGES[languageChoice]['NEW GAME CHOICE'])).toUpperCase();
  if (VALID_INPUTS['AFFIRMATIVE INPUTS'].includes(UserInput)) keepPlaying = true;
  else if (VALID_INPUTS['NEGATIVE INPUTS'].includes(UserInput)) keepPlaying = false;
  else {
    prompt(MESSAGES[languageChoice]['INVALID INPUT']);
    askToPlayAgain();
  }
}// Determines whether or not the player continues playing or exits the game

function determineWinner(currentState, whosTurn, playerToken, AIToken) {
  let conditionMet = false,
    token;
  const winCondition = [
    ['A1', 'A2', 'A3'], ['B1', 'B2', 'B3'], ['C1', 'C2', 'C3'], // Rows
    ['A1', 'B1', 'C1'], ['A2', 'B2', 'C2'], ['A3', 'B3', 'C3'], // Columns
    ['A1', 'B2', 'C3'], ['A3', 'B2', 'C1'] // Diagonals
    ];// Required tiles for a win
    
  if (whosTurn === 'User') token = playerToken;
  else token = AIToken;
    
  winCondition.forEach((winningArray) => {
    if (winningArray.every((tileValue) => currentState[tileValue[0]][tileValue[1]] === token)) conditionMet = true;
  });// Checks to see if any of the win conditions are met by the given token
  
  if (conditionMet) {
    if (whosTurn === 'User') playerRoundWins += 1;
    else if (whosTurn === 'Computer') computerRoundWins += 1;
    return true;
  }
  else return false;
}// Determines if the given token has met a win condition and returns the boolean

function alternatePlayer(presentPlayer) {
  if (presentPlayer === 'User') return 'Computer';
  else return 'User';
} // Changes whos turn it is

function takeTurn(currentBoardState, player, humanToken, AIToken) {
  if (player === 'User') playersTurn(currentBoardState, humanToken);
  else if (player === 'Computer') computersTurn(currentBoardState, humanToken, AIToken);
  availableTiles -= 1;
}

function playersTurn(currentState, playerToken) {
  let UserInput = readline.question(prompt(MESSAGES[languageChoice]['CHOOSE TILE'])).toUpperCase();
  if (VALID_INPUTS['VALID TILES'].includes(UserInput)) {
    if (currentState[UserInput[0]][UserInput[1]] === DEFAULT_STATE[UserInput[0]][UserInput[1]]) {
      currentState[UserInput[0]][UserInput[1]] = playerToken;
    }
    else {
      prompt(MESSAGES[languageChoice]['ALREADY TAKEN']);
      currentState = playersTurn(currentState, playerToken);
    }
  }
  else {
    prompt(MESSAGES[languageChoice]['INVALID LOCATION']);
    currentState = playersTurn(currentState, playerToken);
  }
}// Has the player choose a move and returns the new state

function displayBoard(currentState, currentDesign, playerToken, compToken) {
  console.log(`${BOARD_DESIGN['TILE IDENTIFIERS']['COLUMN IDENTIFIER']}`);
  console.log(`${BOARD_DESIGN['TILE IDENTIFIERS']['FIRST ROW']} ${currentState["A"]['1']} ${currentDesign['COLUMN']} ${currentState["B"]['1']} ${currentDesign['COLUMN']} ${currentState["C"]['1']}`);
  console.log(`${BOARD_DESIGN['TILE IDENTIFIERS']['ROW SEPERATOR']}${currentDesign['ROW']}${currentDesign['INTERSECTION']}${currentDesign['ROW']}${currentDesign['INTERSECTION']}${currentDesign['ROW']}`);
  console.log(`${BOARD_DESIGN['TILE IDENTIFIERS']['SECOND ROW']} ${currentState["A"]['2']} ${currentDesign['COLUMN']} ${currentState["B"]['2']} ${currentDesign['COLUMN']} ${currentState["C"]['2']}`);
  console.log(`${BOARD_DESIGN['TILE IDENTIFIERS']['ROW SEPERATOR']}${currentDesign['ROW']}${currentDesign['INTERSECTION']}${currentDesign['ROW']}${currentDesign['INTERSECTION']}${currentDesign['ROW']}`);
  console.log(`${BOARD_DESIGN['TILE IDENTIFIERS']['THIRD ROW']} ${currentState["A"]['3']} ${currentDesign['COLUMN']} ${currentState["B"]['3']} ${currentDesign['COLUMN']} ${currentState["C"]['3']}`);
  console.log(MESSAGES[languageChoice]['YOUR TOKEN'] + ` ${playerToken}. ` + MESSAGES[languageChoice]['COMPUTER TOKEN'] + ` ${compToken}.`);
}// Logs the board to the console taking into account the design and state

function initializeRound() {
  roundComplete = false;
  boardState = deepClone(DEFAULT_STATE);
  availableTiles = TOTAL_GRID_TILES;
  currentPlayer = 'User';
}// Resets round complete, board state, available tiles, and current player

function initializeMatch() {
  matchComplete = false;
  playerRoundWins = 0;
  computerRoundWins = 0;
}// Resets match complete and round wins

function chooseLanguage() {
  let UserInput = readline.question(MESSAGES[DEFAULT_LANGUAGE]["LANGUAGE CHOICE"]).toUpperCase();
  if (VALID_INPUTS['ENGLISH OPTIONS'].includes(UserInput)) languageChoice = "ENGLISH";
  else if (VALID_INPUTS['SPANISH OPTIONS'].includes(UserInput)) languageChoice = "SPANISH";
  else {
    prompt(MESSAGES[DEFAULT_LANGUAGE]['INVALID INPUT']);
    chooseLanguage();
  }
}// Has the User set the global languageChoice variable to a valid language

function welcome() {
  Object.keys(MESSAGES).forEach((language) => prompt(MESSAGES[language]['WELCOME']));
}// Logs welcome statement in every available language

function prompt(message = MESSAGES[languageChoice]['ERROR']) {
  console.log(`=> ${message}`)
}// Logs the desired message to the console while adding some 'flavor' to it

function deepClone(objectToClone) {
  return require('v8').deserialize(require('v8').serialize(objectToClone));
}// Serializes, then de-serializes, and then returns an object to effectively deep clone

function joinOr(array, seperator = ' ', finalSeperator = ' or ') {
  return array.slice(0, -1).join(seperator) + finalSeperator + array.slice(-1);
}// So my program doesn't need this because of how I wrote it but I wanted to make it anways
// Functions endddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
