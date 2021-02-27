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
    "A": [UNCHOSEN_TILE, UNCHOSEN_TILE, UNCHOSEN_TILE],
    "B": [UNCHOSEN_TILE, UNCHOSEN_TILE, UNCHOSEN_TILE],
    "C": [UNCHOSEN_TILE, UNCHOSEN_TILE, UNCHOSEN_TILE]
  },
  DEFAULT_LANGUAGE = 'ENGLISH';

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
  boardChoice,
  boardState = deepClone(DEFAULT_STATE),// Default value
  keepPlaying = true;// Default value
// Initializing global variables end

// Code body begin
welcome();
displayProfiles();
chooseProfile();

if (hasWon) chooseABoard();
if (currentGame === 'Incomplete') continuePreviousGame();// Lets them load their last unfinished game from their profile

do {
  if (currentGame === 'Complete') boardState = deepClone(DEFAULT_STATE);
  
  displayBoard(boardState, boardChoice);
  playersTurn(boardState);
  determineWinOrDraw(boardState);
  if (currentGame === 'Incomplete') {
    computersTurn(boardState);
    determineWinOrDraw(boardState)
  }
  break;// DELETE ME PLZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ
} while(keepPlaying)


// Code body end

//Functions begin
function chooseABoard() {
  let userInput = readline.question(prompt(MESSAGES[languageChoice]['BOARD CHOICE'])).toLowerCase();
  if (VALID_INPUTS['SHOW BOARDS CHOICE'].includes(userInput)) {
    console.log('DEFAULT BOARD');
    displayBoard(DEFAULT_STATE, BOARD_DESIGN['DEFAULT BOARD']);
    console.log('WINNERS BOARD');
    displayBoard(DEFAULT_STATE, BOARD_DESIGN['WINNERS BOARD']);
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
  let userInput = readline.question(prompt(MESSAGES[languageChoice]['CONTINUE CHOICE'])).toLowerCase();
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
  let profileChoice = readline.question();
  
  Object.keys(MESSAGES).forEach((language) => prompt(`${MESSAGES[language]['PROFILE CHOICE VALIDATION 1']}${profileChoice}${MESSAGES[language]['PROFILE CHOICE VALIDATION 2']}`))
  profileChoiceValidation(readline.question(), VALID_INPUTS['AFFIRMATIVE INPUTS'], VALID_INPUTS['NEGATIVE INPUTS']);
  
  if (Object.keys(profiles).includes(profileChoice)) setDefaultsFromProfile(profileChoice);
  else establishDefaultsForProfile();
}// Has the user choose their profile, or create a new one.

function setDefaultsFromProfile(userProfile) {
  languageChoice = profiles[userProfile]['language'];
  hasWon = profiles[userProfile]['victory status'];
}// Sets the defaults for a returning user

function establishDefaultsForProfile() {
  languageChoice = chooseLanguage();
  hasWon = false;
  currentGame = "Complete";
}// Establishes defaults for a new user

function profileChoiceValidation(choice, positiveInputs, negativeInputs) {
  if (negativeInputs.includes(choice)) chooseProfile();
  else if (positiveInputs.includes(choice));
  else {
    Object.keys(MESSAGES).forEach((language) => prompt(MESSAGES[language]['INVALID INPUT']));
    profileChoiceValidation(readline.question());
  }
}// Validates the input provided for profile choice

function chooseLanguage() {
  let userInput = readline.question(MESSAGES[DEFAULT_LANGUAGE]["LANGUAGE CHOICE"]).toLowerCase();
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

function playersTurn(currentState) {
  let userInput
}

function computersTurn(currentState) {
  
}

function determineWinOrDraw(currentState) {
  
}// Determines whether the game should end because someone has won of there is a draw

function initializeGame() {
  boardState = DEFAULT_STATE.slice();
  currentGame = 'Incomplete';
}// Resets the board state to the default

function updateBoard() {
  
}

function displayBoard(currentState, currentDesign) {
  console.log(`${BOARD_DESIGN['TILE IDENTIFIERS']['COLUMN IDENTIFIER']}`);
  console.log(`${BOARD_DESIGN['TILE IDENTIFIERS']['FIRST ROW']} ${currentState["A"][0]} ${currentDesign['COLUMN']} ${currentState["A"][1]} ${currentDesign['COLUMN']} ${currentState["A"][2]}`);
  console.log(`${BOARD_DESIGN['TILE IDENTIFIERS']['ROW SEPERATOR']}${currentDesign['ROW']}${currentDesign['INTERSECTION']}${currentDesign['ROW']}${currentDesign['INTERSECTION']}${currentDesign['ROW']}`);
  console.log(`${BOARD_DESIGN['TILE IDENTIFIERS']['SECOND ROW']} ${currentState["B"][0]} ${currentDesign['COLUMN']} ${currentState["B"][1]} ${currentDesign['COLUMN']} ${currentState["B"][2]}`);
  console.log(`${BOARD_DESIGN['TILE IDENTIFIERS']['ROW SEPERATOR']}${currentDesign['ROW']}${currentDesign['INTERSECTION']}${currentDesign['ROW']}${currentDesign['INTERSECTION']}${currentDesign['ROW']}`);
  console.log(`${BOARD_DESIGN['TILE IDENTIFIERS']['THIRD ROW']} ${currentState["C"][0]} ${currentDesign['COLUMN']} ${currentState["C"][1]} ${currentDesign['COLUMN']} ${currentState["C"][2]}`);
}// Logs the board to the console taking into account the design and state

function prompt(message = MESSAGES[languageChoice]['ERROR']) {
  console.log(`=> ${message}`)
}// Logs the desired message to the console while adding some 'flavor' to it

function updateConfirmation() {
  prompt(MESSAGES[languageChoice]['UPDATE CONFIRMED']);
}// Required when using the updateJSON function

function updateJSON(file, data) {
  fs.writeFile(file, JSON.stringify(data, null, 2), updateConfirmation);
}// Erases the given JSON file and re-writes the given data

function deepClone(objectToClone) {
  return require('v8').deserialize(require('v8').serialize(objectToClone));
}// Serializes, then de-serializes, and then returns an object to effectively deep clone
// Functions end