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
  MAXIMUM_RATE = 1,
  ACCEPTABLE_LANGUAGE_RESPONSES = {
    "1": ['1', 'english', 'en'],
    "2": ['2', 'espanol', 'es', 'spanish', 'sp']
  },
  ACCEPTABLE_ANOTHER_ROUND_RESPONSES = {
    "yes": ['yes', 'y'],
    "si": ['si', 's'],
    "no": ['no', 'n']
  };
let languageChoice = DEFAULT_LANGUAGE,
  anotherRound = '',
  total = 0;

languageChoice = readline.question(prompt('language options')).toLocaleLowerCase();
languageChoice = commonMistakesLanguageChoice(languageChoice);
while (invalidNumber(languageChoice, NUMBER_OF_LANGUAGES)) {
  languageChoice = readline.question(prompt('invalid input')).toLocaleLowerCase();
  languageChoice = commonMistakesLanguageChoice(languageChoice);
}// Validates the language choice.

do {
  let loanAmount = readline.question(prompt('loan amount'));
  while (invalidNumber(loanAmount, Infinity)) {
    loanAmount = readline.question(prompt('invalid input'));
  }// Validates loan amount
  loanAmount = Number(loanAmount);
  
  let annualPercentageRating = readline.question(prompt("APR"));
  if (Number(annualPercentageRating) === 0);// Skips validation for edgecase
  else {
    while (invalidNumber(annualPercentageRating, MAXIMUM_RATE)) {
      annualPercentageRating = readline.question(prompt('invalid input'));
      if (Number(annualPercentageRating) === 0) break;
    }// Validates APR for non-zero input
  }
  annualPercentageRating = Number(annualPercentageRating);
  
  let loanDuration = readline.question(prompt('loan duration'));
  while (invalidNumber(loanDuration, Infinity)) {
    loanDuration = readline.question(prompt('invalid input'));
  }// Validates loan duration
  loanDuration = Number(loanDuration);

  let monthlyInterestRate = annualPercentageRating / 12;
  if (annualPercentageRating === 0) {
    total = loanAmount / loanDuration;
    total = Math.round(total * 100) / 100;// Sets the decimal point
  } else {
    total = (loanAmount * (monthlyInterestRate /
      (1 - Math.pow((1 + monthlyInterestRate), (-loanDuration)))));
    total = Math.round(total * 100) / 100;// Sets the decimal point
  }

  prompt('output');

  anotherRound = readline.question(prompt('continue option')).toLocaleLowerCase();
  anotherRound = commonMistakesAnotherRound(anotherRound);
  while (typeof anotherRound !== "boolean") {
    anotherRound = readline.question(prompt('invalid input')).toLocaleLowerCase();
    anotherRound = commonMistakesAnotherRound(anotherRound);
  }// Validates the input for another round
} while (anotherRound);

function invalidNumber(num, highestInput) {
  return (num.trim() === '' || Number.isNaN(Number(num)) ||
    (Number(num) <= 0 || Number(num) > highestInput));
}// Verifies the input is a number and is in the applicable range

function prompt(message) {
  if (message === 'output') console.log(`=> ${MESSAGES[languageChoice][message]}${total}`);
  else if (languageChoice === "1" || languageChoice === "2") console.log(`=> ${MESSAGES[languageChoice][message]}`);
  else console.log(`=> ${MESSAGES[DEFAULT_LANGUAGE][message]}`);
}// Prints the desired message to the screen

function commonMistakesLanguageChoice(languageInput) {
  if (ACCEPTABLE_LANGUAGE_RESPONSES['1'].includes(languageInput)) return "1";
  else if (ACCEPTABLE_LANGUAGE_RESPONSES['2'].includes(languageInput)) return "2";
  else return languageInput;
}// Looks for common mistakes and coerces them to the correct value

function commonMistakesAnotherRound(anotherRoundInput) {
  if (languageChoice === '1') {
    if (ACCEPTABLE_ANOTHER_ROUND_RESPONSES['yes'].includes(anotherRoundInput)) return true;
    else if (ACCEPTABLE_ANOTHER_ROUND_RESPONSES['no'].includes(anotherRoundInput)) return false;
    else return anotherRoundInput;
  } else if (languageChoice === '2') {
    if (ACCEPTABLE_ANOTHER_ROUND_RESPONSES['si'].includes(anotherRoundInput)) return true;
    if (ACCEPTABLE_ANOTHER_ROUND_RESPONSES['no'].includes(anotherRoundInput)) return false;
    else return anotherRoundInput;
  } else {
    console.log("An error has occured. Check that language is valid.");
    return anotherRoundInput;
  }
}// Looks for common mistakes and coerces them to the correct value