function question1(str) {
  for (let i = 0; i < 10; i++) {
    console.log(str.padStart(i + str.length, " "));
  }
}// Prints a string 10 times with an extra space at the beginning each time

function question2(str) {
  let arr = str.split('');
  arr.forEach((ele, index) => {
    if (ele === ele.toLowerCase()) arr[index] = ele.toUpperCase();
    else arr[index] = ele.toLowerCase();
  });
  str = arr.join('');
  return str;
}// Swaps the case of all the letters

function factors(number) {
  if (number <= 0) return "Sorry negative numbers and 0 are invalid inputs. Please try again.";
  let divisor = number;
  let factors = [];
  do {
    if (number % divisor === 0) {
      factors.push(number / divisor);
    }
    divisor -= 1;
  } while (divisor !== 0);
  return factors;
}// Gives the factors for a number greater than 0

console.log(question1('Flinstones Rock!'))

console.log(question2("The Munsters are creepy and spooky."));