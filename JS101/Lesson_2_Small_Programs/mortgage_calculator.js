/*  1. Ask user their language pref.
    2. Ask user their loan amount.
    3. Ask user their APR.
    4. Ask user their loan duration.
    5. Print the result to the terminal.
    6. Ask if they want to begin again.
*/

const readline = require('readline-sync'),
  MESSAGES = require('./mortgage_calculator_messages.json'),
  DEFAULT_LANGUAGE = "1",
  NUMBER_OF_LANGUAGES = 2,
  MAXIMUM_RATE = 1;
let languageChoice = DEFAULT_LANGUAGE,
  anotherRound = '',
  total = 0;

languageChoice = readline.question(prompt('language options'));

languageChoice = commonMistakesLanguageChoice(languageChoice);

while (invalidNumber(languageChoice, NUMBER_OF_LANGUAGES)) {
  languageChoice = readline.question(prompt('invalid input'));
  languageChoice = commonMistakesLanguageChoice(languageChoice);
}// Validates the language choice.

do {
  let loanAmount = readline.question(prompt('loan amount'));

  while (invalidNumber(loanAmount, Infinity)) {
    loanAmount = readline.question(prompt('invalid input'));
  }// Validates loan amount

  let annualPercentageRating = readline.question(prompt("APR"));

  while (invalidNumber(annualPercentageRating, MAXIMUM_RATE)) {
    annualPercentageRating = readline.question(prompt('invalid input'));
  }// Validates APR

  let loanDuration = readline.question(prompt('loan duration'));

  while (invalidNumber(loanDuration, Infinity)) {
    loanDuration = readline.question(prompt('invalid input'));
  }// Validates loan duration

  let monthlyInterestRate = annualPercentageRating / 12;

  total = (loanAmount * (monthlyInterestRate /
    (1 - Math.pow((1 + monthlyInterestRate), (-loanDuration)))));
  total = Math.round(total * 100) / 100;// Sets the decimal point

  prompt('output');

  anotherRound = readline.question(prompt('continue option'));
  anotherRound = commonMistakesAnotherRound(anotherRound);
  while (invalidNumber(anotherRound, 2)) {
    anotherRound = readline.question(prompt('invalid input'));
    anotherRound = commonMistakesAnotherRound(anotherRound);
  }// Validates the input for another round
} while (anotherRound === '1');

function invalidNumber(num, highestInput) {
  return (num.trim() === '' || Number.isNaN(Number(num)) ||
    (Number(num) <= 0 || Number(num) > highestInput));
}// Verifies the input is a number and is in the applicable range

function prompt(message) {
  if (message === 'output') console.log(`=> ${MESSAGES[languageChoice][message]}${total}`);
  else if (languageChoice === "1" || languageChoice === "2") console.log(`=> ${MESSAGES[languageChoice][message]}`);
  else console.log(`=> ${MESSAGES[DEFAULT_LANGUAGE][message]}`);
}// Prints the desired message to the screen

function commonMistakesLanguageChoice(variable) {
  if (variable.toLocaleLowerCase() === "english" ||
    variable.toLowerCase() === "en") return "1";
  else if (variable.toLocaleLowerCase() === "espanol" ||
    variable.toLowerCase() === "es") return "2";
  else return variable;
}// Looks for common mistakes and coerces them to the correct value

function commonMistakesAnotherRound(variable) {
  if (languageChoice === '1') {
    if (variable.toLocaleLowerCase() === 'yes') return '1';
    else if (variable.toLocaleLowerCase() === 'y') return '1';
    else if (variable.toLocaleLowerCase() === 'no') return '2';
    else if (variable.toLocaleLowerCase() === 'n') return '2';
    else return variable;
  } else if (languageChoice === '2') {
    if (variable.toLocaleLowerCase() === 'si') return '1';
    else if (variable.toLocaleLowerCase() === 's') return '1';
    else if (variable.toLocaleLowerCase() === 'no') return '2';
    else if (variable.toLocaleLowerCase() === 'n') return '2';
    else return variable;
  } else {
    console.log("An error has occured. Check that language is valid.");
    return variable;
  }
}// Looks for common mistakes and coerces them to the correct value