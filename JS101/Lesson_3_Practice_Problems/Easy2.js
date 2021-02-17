function question1(str, unwantedWord, replacementWord) {
  let newStr = str, beforeWord = '', afterWord = '';
  while(newStr.includes(unwantedWord)) {
    beforeWord = newStr.slice(0, newStr.indexOf(unwantedWord));
    afterWord = newStr.slice(newStr.indexOf(unwantedWord) + unwantedWord.length);
    newStr = beforeWord + replacementWord + afterWord;
  }
  return newStr;
}// Replaces a given word with another in a given string

function question2(arr) {
  let newArr1 = [], newArr2 = arr.slice(), smallValue, bigValue;
  arr.forEach((ele) => {newArr1.unshift(ele)});
  console.log(newArr1);// Tests the reverse method
  
  for (let count = 0; count < arr.length - 1; count++){
    for (let index = 0; index < arr.length - 1; index++) {
      if (newArr2[index] < newArr2[index + 1]) [newArr2[index], newArr2[index + 1]] = [newArr2[index + 1], newArr2[index]];
      else continue;
    }
  }// I can do this with a .forEach() as well but this seems more descriptive to me
  console.log(arr);// Verifies the original array hasn't been mutated
  return newArr2;// Tests the descending sort method
}// Two ways to sort an array without the methods

function question3(arr, num) {
  return arr.includes(num);
}// Checks to see if a number is present in an array

function question4(str, newStr) {
  console.log(newStr.concat(" " + str));
  return (newStr + " " + str)
}

function question5(arr, index) {
  let firstHalf = arr.slice(0, index);
  let secondHalf = arr.slice(index + 1);
  return firstHalf.concat(secondHalf);
}

function question6(arr) {
  return arr.reduce((acc, val) => acc.concat(val), []);
}// Uses the reduce method to flatten an array

function question7(obj, key) {
  return Object.entries(obj)[Object.keys(obj).indexOf(key)];
}// Takes an object and returns an array of a given entry

function question8(variable) {
  return Array.isArray(variable);
}// Checks if the given variable is an array

function question9(str, totalChar) {
  let totalSpaces = Math.round((totalChar - str.length) / 2);
  for (let numberOfSpaces = 0; numberOfSpaces < totalSpaces; numberOfSpaces++) {
    str = " " + str + " ";
  }
  return str;
}// Centers an entry using spaces

function question10(str, char) {
  console.log(str.split('').reduce((acc, ele) => acc + (ele === char), 0));
  return str.split('').filter(letter => letter === char).length;
}

console.log(question1("Few things in life are as important as house training your pet dinosaur.", 'important', 'urgent'));// "Few things in life are as urgent as house training your pet dinosaur."

console.log(question2([1, 2, 3, 4, 5]));// [ 5, 4, 3, 2, 1 ] [1, 2, 3, 4, 5] [ 5, 4, 3, 2, 1 ]

console.log(question3([1, 2, 3, 4, 5, 15, 16, 17, 95, 96, 99], 8));// False
console.log(question3([1, 2, 3, 4, 5, 15, 16, 17, 95, 96, 99], 95));// True

console.log(question4("seven years ago...", "Four score and"));// Four score and seven years ago... Four score and seven years ago...

console.log(question5([1, 2, 3, 4, 5], 2));// [1, 2, 4, 5]

console.log(question6(["Fred", "Wilma", ["Barney", "Betty"], ["Bambam", "Pebbles"]]))// [ 'Fred', 'Wilma', 'Barney', 'Betty', 'Bambam', 'Pebbles' ]

console.log(question7({ Fred: 0, Wilma: 1, Barney: 2, Betty: 3, Bambam: 4, Pebbles: 5 }, 'Barney'))// [Barney, 2]

console.log(question8([1, 2, 3, 4]));// True
console.log(question8({ field1: 1, field2: 2, field3: 3, field4: 4 }));// False

console.log(question9("Flintstone Family Members", 40));// Read the question

console.log(question10("The Flintstones Rock!", 't'))// 2 2
console.log(question10("Easy come, easy go.", 't'))// 0 0