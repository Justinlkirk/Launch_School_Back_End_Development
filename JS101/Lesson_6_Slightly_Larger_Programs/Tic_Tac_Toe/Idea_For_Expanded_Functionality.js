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
  TOTAL_GRID_TILES = 9,
  TOTAL_WINS = 5;

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
  playerWins,
  computerWins,
  currentPlayer,
  currentPlayerToken,
  currentPlayerWon,
  nextPlayer,
  availableTiles = TOTAL_GRID_TILES,// Default value
  boardChoice = BOARD_DESIGN['DEFAULT BOARD'],// Default value
  tokenChoice = BOARD_DESIGN['TOKENS']['X'],// Let the player choose laterrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
  computerToken = BOARD_DESIGN['TOKENS']['O'],
  boardState = deepClone(DEFAULT_STATE),// Default value
  keepPlaying = true;// Default value
// Initializing global variables end

// Code body begin
welcome();
displayProfiles();
let profileInput = chooseProfile();
if (Object.keys(profiles).includes(profileInput)) setDefaultsFromProfile(profileInput);
else {
  establishDefaultsForProfile(profileInput);
  //updateJSON('Profiles.json', profiles); FIXX THIS LATEEEEEEEEEEEEEEEERRRRRRRRRRRRRRRRRR
}

if (hasWon) chooseABoard();
if (currentGame === 'Incomplete') continuePreviousGame();// Lets them load their last unfinished game from their profile

do {
  if (currentGame === 'Complete') initializeGame();
  
  console.clear();

  displayBoard(boardState, boardChoice, tokenChoice, computerToken);
  takeTurn((boardState, currentPlayer, currentPlayerToken));
  determineWinner(boardState, currentPlayerToken, currentPlayer);
  if(currentPlayerWon || availableTiles === 0) currentGame = "Complete";
  
  if (currentGame === 'Complete') {
    displayBoard(boardState, boardChoice, tokenChoice, computerToken);
    gameCompletion(currentPlayer, playerWins, computerWins);
  }// Runs through the process after a game is completed
} while(keepPlaying)
// Code body end

//Functions begin
function takeTurn(currentBoardState, player, AIToken, humanToken) {
  if (player === 'user') playersTurn(currentBoardState, humanToken);
  else if (player === 'computer') computersTurn(currentBoardState, AIToken, humanToken);
  availableTiles -= 1;
}

function alternatePlayer(presentPlayer) {
  if (presentPlayer === 'user') {
    currentPlayer = 'computer';
    currentPlayerToken = computerToken;
  }
  else {
    currentPlayer = 'user';
    currentPlayerToken = tokenChoice;
  }
} // Changes whos turn it is

function gameCompletion(whosTurn, userWins, compWins) {
  console.log(`${whosTurn} ${MESSAGES[languageChoice]['ROUND END 1']} ${compWins} ${MESSAGES[languageChoice]['ROUND END 2']} ${userWins}.`) 
  
  if (playerWins >= TOTAL_WINS) {
    console.log(MESSAGES[languageChoice]['PLAYER VICTORY']);
    hasWon = true;
   }
  else if (computerWins >= TOTAL_WINS) {
    console.log(MESSAGES[languageChoice]['COMPUTER VICTORY']);
  }
  
  keepPlaying = askToPlayAgain(keepPlaying);
}// Displays the final board, logs the victory or draw statement, and asks if the player wants to play again

function chooseABoard() {
  let userInput = readline.question(prompt(MESSAGES[languageChoice]['BOARD CHOICE'])).toUpperCase();
  if (VALID_INPUTS['SHOW BOARDS CHOICE'].includes(userInput)) {
    console.log('DEFAULT BOARD');
    displayBoard(DEFAULT_STATE, BOARD_DESIGN['DEFAULT BOARD'], "not chosen", "not chosen");
    console.log('WINNERS BOARD');
    displayBoard(DEFAULT_STATE, BOARD_DESIGN['WINNERS BOARD'], "not chosen", "not chosen");
    chooseABoard();
  }
  else if (VALID_INPUTS['DEFAULT BOARD CHOICE'].includes(userInput)) boardChoice = BOARD_DESIGN['DEFAULT BOARD'];
  else if (VALID_INPUTS['WINNERS BOARD CHOICE'].includes(userInput)) boardChoice = BOARD_DESIGN['WINNERS BOARD'];
  else {
    prompt(MESSAGES[languageChoice]['INVALID INPUT']);
    chooseABoard();
  }
}// Lets the user choose a board to play on or log available boards to the console

function continuePreviousGame() {
  let userInput = readline.question(prompt(MESSAGES[languageChoice]['CONTINUE CHOICE'])).toUpperCase();
  if (VALID_INPUTS['AFFIRMATIVE INPUTS'].includes(userInput)) keepPlaying = true;
  else if (VALID_INPUTS['NEGATIVE INPUTS'].includes(userInput)) keepPlaying = false;
  else {
    prompt(MESSAGES[languageChoice]['INVALID INPUT']);
    continuePreviousGame();
  }
}

function welcome() {
  Object.keys(MESSAGES).forEach((language) => prompt(MESSAGES[language]['WELCOME']));
}// Logs welcome statement in every available language

function chooseProfile() {
  Object.keys(MESSAGES).forEach((language) => prompt(MESSAGES[language]['CHOOSE A PROFILE']));
  let userInput = readline.question();
  
  Object.keys(MESSAGES).forEach((language) => prompt(`${MESSAGES[language]['PROFILE CHOICE VALIDATION 1']}${userInput}${MESSAGES[language]['PROFILE CHOICE VALIDATION 2']}`))
  profileChoiceValidation(readline.question().toUpperCase(), VALID_INPUTS['AFFIRMATIVE INPUTS'], VALID_INPUTS['NEGATIVE INPUTS']);
  
  return userInput;
}// Has the user choose their profile, or create a new one.

function askToPlayAgain() {
  let userInput = readline.question(prompt(MESSAGES[languageChoice]['NEW GAME CHOICE'])).toUpperCase();
  if (VALID_INPUTS['AFFIRMATIVE INPUTS'].includes(userInput)) keepPlaying = true;
  else if (VALID_INPUTS['NEGATIVE INPUTS'].includes(userInput)) keepPlaying = false;
  else {
    prompt(MESSAGES[languageChoice]['INVALID INPUT']);
    askToPlayAgain();
  }
}// Determines whether or not the player continues playing or exits the game

function setDefaultsFromProfile(userProfile) {
  languageChoice = profiles[userProfile]['language'];
  hasWon = profiles[userProfile]['victory status'];
  currentGame = userProfile['current game'];
  playerWins = Number(userProfile['player wins this match']);
  computerWins = Number(userProfile['computer wins this match']);
}// Sets the defaults for a returning user

function establishDefaultsForProfile(userInput) {
  languageChoice = chooseLanguage();
  hasWon = false;
  currentGame = "Complete";
  playerWins = 0;
  computerWins = 0;
  profiles[userInput] = {};
  profiles[userInput]['language'] = languageChoice;
  profiles[userInput]['victory status'] = hasWon;
  profiles[userInput]['current game'] = currentGame;
  profiles[userInput]['player wins this match'] = playerWins;
  profiles[userInput]['computer wins this match'] = computerWins;
}// Establishes defaults for a new user

function profileChoiceValidation(userInput, positiveInputs, negativeInputs) {
  if (negativeInputs.includes(userInput)) chooseProfile();
  else if (positiveInputs.includes(userInput));
  else {
    Object.keys(MESSAGES).forEach((language) => prompt(MESSAGES[language]['INVALID INPUT']));
    profileChoiceValidation(readline.question());
  }
}// Validates the input provided for profile choice

function chooseLanguage() {
  let userInput = readline.question(MESSAGES[DEFAULT_LANGUAGE]["LANGUAGE CHOICE"]).toUpperCase();
  if (VALID_INPUTS['ENGLISH OPTIONS'].includes(userInput)) return "ENGLISH";
  else if (VALID_INPUTS['SPANISH OPTIONS'].includes(userInput)) return "SPANISH";
  else {
    prompt(MESSAGES[DEFAULT_LANGUAGE]['INVALID INPUT']);
    chooseLanguage();
  }
}// Forces the user to choose their language

function displayProfiles() {
  let profileNames = '| ';
  Object.keys(profiles).forEach((name) => profileNames += name + ' | ');
  console.log(profileNames);
}// Displays the available profiles

function playersTurn(currentState, playerToken) {
  let userInput = readline.question(prompt(MESSAGES[languageChoice]['CHOOSE TILE'])).toUpperCase();
  if (VALID_INPUTS['VALID TILES'].includes(userInput)) {
    if (currentState[userInput[0]][userInput[1]] === DEFAULT_STATE[userInput[0]][userInput[1]]) {
      currentState[userInput[0]][userInput[1]] = playerToken;
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
  return currentState;
}// Has the player choose a move and returns the new state

function computersTurn(currentState, compToken, playerToken) {
  if (computerWinOrDefend(currentState, compToken, compToken)) return currentState;
  else if (computerWinOrDefend(currentState, playerToken, playerToken)) return currentState;
  else computerRandomPlay(currentState, compToken);
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
          if (tileValue === UNCHOSEN_TILE) currentBoardState[tileValue[0]][tileValue[1]] = compToken;
        })
        hasPlayed = true;
        break;
      }
    }
  }
}// Checks to see if there are two consecutive tokens in a row and plays to either win or block

function determineWinner(currentState, whosTurn, playerToken, AIToken) {
  let conditionMet = false,
    token;
  const winCondition = [
    ['A1', 'A2', 'A3'], ['B1', 'B2', 'B3'], ['C1', 'C2', 'C3'], // Rows
    ['A1', 'B1', 'C1'], ['A2', 'B2', 'C2'], ['A3', 'B3', 'C3'], // Columns
    ['A1', 'B2', 'C3'], ['A3', 'B2', 'C1'] // Diagonals
    ];// Required tiles for a win
    
  if (whosTurn === 'user') token = playerToken;
  else token = AIToken;
    
  winCondition.forEach((winningArray) => {
    if (winningArray.every((tileValue) => currentState[tileValue[0]][tileValue[1]] === token)) conditionMet = true;
  });// Checks to see if any of the win conditions are met by the given token
  
  if (conditionMet) {
    if (whosTurn === 'user') playerWins += 1;
    else if (whosTurn === 'computer') computerWins += 1;
    return true;
  }
  else return false;
}// Determines if the given token has met a win condition and returns the boolean

function initializeGame() {
  boardState = deepClone(DEFAULT_STATE);
  currentGame = 'Incomplete';
  availableTiles = TOTAL_GRID_TILES;
  currentPlayer = 'user';
  if (playerWins >= TOTAL_WINS || computerWins >= TOTAL_WINS) {
    playerWins = 0;
    computerWins = 0;
  }
}// Resets the board state to the default

function displayBoard(currentState, currentDesign, playerToken, compToken) {
  console.log(`${BOARD_DESIGN['TILE IDENTIFIERS']['COLUMN IDENTIFIER']}`);
  console.log(`${BOARD_DESIGN['TILE IDENTIFIERS']['FIRST ROW']} ${currentState["A"]['1']} ${currentDesign['COLUMN']} ${currentState["B"]['1']} ${currentDesign['COLUMN']} ${currentState["C"]['1']}`);
  console.log(`${BOARD_DESIGN['TILE IDENTIFIERS']['ROW SEPERATOR']}${currentDesign['ROW']}${currentDesign['INTERSECTION']}${currentDesign['ROW']}${currentDesign['INTERSECTION']}${currentDesign['ROW']}`);
  console.log(`${BOARD_DESIGN['TILE IDENTIFIERS']['SECOND ROW']} ${currentState["A"]['2']} ${currentDesign['COLUMN']} ${currentState["B"]['2']} ${currentDesign['COLUMN']} ${currentState["C"]['2']}`);
  console.log(`${BOARD_DESIGN['TILE IDENTIFIERS']['ROW SEPERATOR']}${currentDesign['ROW']}${currentDesign['INTERSECTION']}${currentDesign['ROW']}${currentDesign['INTERSECTION']}${currentDesign['ROW']}`);
  console.log(`${BOARD_DESIGN['TILE IDENTIFIERS']['THIRD ROW']} ${currentState["A"]['3']} ${currentDesign['COLUMN']} ${currentState["B"]['3']} ${currentDesign['COLUMN']} ${currentState["C"]['3']}`);
  console.log(MESSAGES[languageChoice]['YOUR TOKEN'] + ` ${playerToken}. ` + MESSAGES[languageChoice]['COMPUTER TOKEN'] + ` ${compToken}.`);
}// Logs the board to the console taking into account the design and state

function prompt(message = MESSAGES[languageChoice]['ERROR']) {
  console.log(`=> ${message}`)
}// Logs the desired message to the console while adding some 'flavor' to it

function updateConfirmation() {
  prompt(MESSAGES[languageChoice]['UPDATE CONFIRMED']);
}// Required when using the updateJSON function for some reason

function updateJSON(file, data) {
  fs.writeFile(file, JSON.stringify(data, null, 2), updateConfirmation);
}// Erases the given JSON file and re-writes the given data

function deepClone(objectToClone) {
  return require('v8').deserialize(require('v8').serialize(objectToClone));
}// Serializes, then de-serializes, and then returns an object to effectively deep clone

function joinOr(array, seperator = ' ', finalSeperator = ' or ') {
  return array.slice(0, -1).join(seperator) + finalSeperator + array.slice(-1);
}// So my program doesn't need this because of how I wrote it but I wanted to make it anways
// Functions end