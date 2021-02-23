let produce = {
  apple: 'Fruit',
  carrot: 'Vegetable',
  pear: 'Fruit',
  broccoli: 'Vegetable'
};

function selectFruit(object) {
  for (let ele in object) {
    if (object[ele] === 'Fruit')
    console.log(`${ele}: ${object[ele]}`)
  };
}// Logs the produce that are fruit to the console

selectFruit(produce); // => { apple: 'Fruit', pear: 'Fruit' }

let myNumbers = [1, 4, 3, 7, 2, 6];
doubleNumbers(myNumbers); // => [2, 8, 6, 14, 4, 12]
console.log(myNumbers);

function doubleNumbers(numbers) {
  let counter = 0;

  while (counter < numbers.length) {
    numbers[counter] *= 2;

    counter += 1;
  }// I did this on my own... the fact that its exactly like the solution is a coincidence!
}// Mutates a given integer array with all entries doubled

function doubleOddIndeces(numberArray) {
  for (let index = 1; index < numberArray.length; index += 2) {
    numberArray[index] *= 2;
  }
  return numberArray;
}// Doubles the value of the numbers at odd indeces

console.log(doubleOddIndeces(myNumbers)); // [ 2, 16, 6, 28, 4, 24 ]

let oddNumbers = [1, 2, 3].filter(num => num - 1);

console.log(oddNumbers); // => [1, 3]

function doubleCharInString(string) {
  return string.split('').map(char => char + char).join('');
}

console.log(doubleCharInString('Oh noo'))// OOhh  nnoooo