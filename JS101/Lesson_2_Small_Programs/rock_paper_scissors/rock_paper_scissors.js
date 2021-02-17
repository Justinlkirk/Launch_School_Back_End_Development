/*  1. User decides how many rounds are required to win
    2. User picks rock, paper, scissors, or history (to display previous rounds)
    3. Computer picks rock, paper, or scissors
    4. The winner is recorded
    5. The round is saved to history
    6. Once a victor is determined they may play again */

const readline = require('readline-sync');
const MESSAGES = require('./rock_paper_scissors_messages.json');
const ALLOWED_CHOICES = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
const MINIMUM_WINS = 1;
let playerChoice = 'history';
let computerChoice = '';
let playerWins = 0;
let computerWins = 0;
let ties = 0;
let history = [];
let roundWinner = '';

MESSAGES['choices'] += ' ' + ALLOWED_CHOICES.join(', ') + ":";

printMessage('welcome');

do {
  playerWins = 0;
  computerWins = 0;
  ties = 0;
  history = [];

  let maxWins = readline.question(printMessage('total rounds'));
  while (invalidNumber(maxWins)) {
    maxWins = readline.question(printMessage('invalid input'));
  }// Validates how many wins will be needed to obtain victory
  maxWins = Number(maxWins);

  printMessage('begin');
  do {
    if (history.length) {
      printMessage('current state');
    }// Prints the current game state

    playerChoice = playersTurn(playerChoice);
    computerChoice = ALLOWED_CHOICES[randomIndex()];

    roundWinner = determineWinner();
    updateHistory(roundWinner);
    printMessage('results');

  } while (computerWins < maxWins && playerWins < maxWins);
  if (computerWins === maxWins) printMessage('computer wins');
  else printMessage('player wins');

  let playAgain = readline.question(printMessage('play again'));
  if (playAgain.toLowerCase() === 'y' || playAgain.toLowerCase() === 'yes');
  else break;
} while (true);

function playersTurn(input) {
  do {
    if (input === 'history' || ALLOWED_CHOICES.includes(input)) {
      input = readline.question(printMessage('choices'));
      input = playerChoiceCoercion(input);
    } else {
      input = readline.question(printMessage('invalid input'));
      input = playerChoiceCoercion(input);
    }

    if (input === 'history') printHistory();
  } while (!(ALLOWED_CHOICES.includes(input)));

  return input;
}// Asks for the user to update their choice for this round

function printHistory() {
  for (let index = 0; index < history.length; index++) {
    console.log(`Round ${index + 1}: ${history[index]}`);
  }
}// Prints the history

function randomIndex() {
  return Math.floor(Math.random() * Math.floor(ALLOWED_CHOICES.length));
}// Returns a random index within ALLOWED_CHOICES array

function playerChoiceCoercion(playerMove) {
  if (playerMove === 'r') return 'rock';
  else if (playerMove === 'p') return 'paper';
  else if (playerMove === 'sc') return 'scissors';
  else if (playerMove === 'l') return 'lizard';
  else if (playerMove === 'sp') return 'spock';
  else return playerMove;
}// Coerces the abbreviations into the full word

function updateHistory(result) {
  history.push(`Player uses ${playerChoice} against ${computerChoice}. ${result}`);

  if (result === 'Player wins!') playerWins++;
  else if (result === 'Computer wins!') computerWins++;
  else ties++;

  MESSAGES['current state'] = `Player ${playerWins} wins, computer ${computerWins} wins, and ${ties} ties.`;
  MESSAGES['results'] = history[history.length - 1];
}// Updates the history array, the MESSAGES object, and the three wincount variables

function determineWinner() {
  if (playerChoice === computerChoice) {
    return 'Its a tie...';
  } else if ((playerChoice === 'rock' && (computerChoice === 'scissors' || computerChoice === 'lizard')) ||
            (playerChoice === 'paper' && (computerChoice === 'rock' || computerChoice === 'spock')) ||
            (playerChoice === 'scissors' && (computerChoice === 'paper' || computerChoice === 'lizard')) ||
            (playerChoice === 'lizard' && (computerChoice === 'spock' || computerChoice === 'paper'))) {
    return 'Player wins!';
  } else {
    return 'Computer wins!';
  }
}// Updates win count and returns the outcome

function invalidNumber(number) {
  return (number.trim() === '' || Number.isNaN(Number(number)) ||
    (Number(number) < MINIMUM_WINS));
}// Ensures that the input is greater than the minimum

function printMessage(message) {
  console.log(`=> ${MESSAGES[message]}`);
}// Prints the desired message to the console