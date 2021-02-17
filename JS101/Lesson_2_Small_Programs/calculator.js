/*  1. Ask the user for preferred language.
    2. Ask the user for the first number.
    3. Ask the user for an operation to perform.
    4. Ask the user for the second number.
    5. Perform the operation on the two numbers.
    6. Print the result to the terminal.
    7. Ask if they would like to repeat. */
const MESSAGES = require('./calculator_messages.json'),
  readline = require('readline-sync');

let languageChoice = readline.question(MESSAGES['language choice']);
while (invalidNumber(languageChoice) ||
  (Number(languageChoice) < 1 || Number(languageChoice) > 2)) {
  languageChoice = readline.question(MESSAGES[languageChoice]['invalid number']);
}// Validates language choice input is a number between 1 and 2

prompt(MESSAGES[languageChoice]['welcome']);

do {
  let num1 = readline.question(MESSAGES[languageChoice]['number input']);

  while (invalidNumber(num1)) {
    num1 = readline.question(MESSAGES[languageChoice]['invalid number']);
  }// Validates num1 input

  num1 = Number(num1);

  prompt(MESSAGES[languageChoice]['operator options']);
  let operation = readline.question(MESSAGES[languageChoice]["operator input"]);

  while (invalidNumber(operation) ||
  (Number(operation) < 1 || Number(operation) > 4)) {
    operation = readline.question(MESSAGES[languageChoice]['invalid number']);
  }// Validates operator input is a number between 1 and 4

  let num2 = readline.question(MESSAGES[languageChoice]['number input']);

  while (invalidNumber(num2)) {
    num2 = readline.question(MESSAGES[languageChoice]['invalid number']);
  }// Validates num2 input

  num2 = Number(num2);

  switch (operation) {
    case '1':
      prompt(`${num1} + ${num2} = ${num1 + num2}`);
      break;
    case '2':
      prompt(`${num1} - ${num2} = ${num1 - num2}`);
      break;
    case '3':
      prompt(`${num1} * ${num2} = ${num1 * num2}`);
      break;
    case '4':
      prompt(`${num1} / ${num2} = ${num1 / num2}`);
      break;
    default:
      prompt(MESSAGES[languageChoice]['unexpected error']);
      break;
  }// Simple calculatr that asks for two number and then either adds, subtracts, multiplies, or divides

  if (readline.question(MESSAGES[languageChoice]['continue option']) !== "y") break;
} while (true);

function invalidNumber(number) {
  return (number.trim() === '' || Number.isNaN(Number(number)));
}// Verifies the input is a number

function prompt(message) {
  console.log(`=> ${message}`);
}// Adds => to the front of a logged message