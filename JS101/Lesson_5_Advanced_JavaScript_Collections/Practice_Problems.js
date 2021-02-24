function promblemOne(array) {
  return array.sort((a, b) => b - a);// You don't have to use Number() on them because when you say b - a it coerces the values to numbers
}// Orders an array by descending numeric value

function problemTwo(array) {
  return array.sort((a, b) => a['published'] - b['published']);
}// Sorts an array of objects by the 'published' key

let arr1 = ['a', 'b', ['c', ['d', 'e', 'f', 'g']]];
let arr2 = [{ first: ['a', 'b', 'c'], second: ['d', 'e', 'f'] }, { third: ['g', 'h', 'i'] }];
let arr3 = [['abc'], ['def'], { third: ['ghi'] }];
let obj1 = { a: ['d', 'e'], b: ['f', 'g'], c: ['h', 'i'] };
let obj2 = { first: { d: 3 }, second: { e: 2, f: 1 }, third: { g: 0 }}

console.log(promblemOne(['10', '11', '9', '7', '8']));// [ '11', '10', '9', '8', '7' ]

console.log(problemTwo([
  { title: 'One Hundred Years of Solitude', author: 'Gabriel Garcia Marquez', published: '1967' },
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', published: '1925' },
  { title: 'War and Peace', author: 'Leo Tolstoy', published: '1869' },
  { title: 'Ulysses', author: 'James Joyce', published: '1922' },
  { title: 'The Book of Kells', author: 'Multiple Authors', published: '800' },
]));// Puts them in order

console.log(arr1[2][1][3]);// Problem 3
console.log(arr2[1]['third'][0]);// Problem 3
console.log(arr3[2]['third'][0][0]);// Problem 3
console.log(obj1['b'][1]);// Problem 3
console.log(Object.keys(obj2['third'])[0]);// Problem 3

arr1 = [1, [2, 3], 4];
arr1[1][1]++;

arr2 = [{ a: 1 }, { b: 2, c: [7, 6, 5], d: 4 }, 3];
arr2[2]++;

obj1 = { first: [1, 2, [3]] };
obj1['first'][2][0]++;

obj2 = { a: { a: ['1', 'two', 3], b: 4 }, b: 5 };
obj2['a']['a'][2]++;

console.log(arr1);// Problem 4
console.log(arr2);// Problem 4
console.log(obj1);// Problem 4
console.log(obj2);// Problem 4

let munsters = {
  Herman: { age: 32, gender: 'male' },
  Lily: { age: 30, gender: 'female' },
  Grandpa: { age: 402, gender: 'male' },
  Eddie: { age: 10, gender: 'male' },
  Marilyn: { age: 23, gender: 'female'}
};

function totalMaleAge(object) {
  let totalAge = 0;
  
  Object.entries(object).forEach((array) => {
    if (array[1]['gender'] === 'male') totalAge += array[1]['age'];
  })
  
  return totalAge;
}// Adds up the ages for all the males in an object

function problemSix(object) {
  Object.entries(object).forEach((array) => {
    console.log(`${array[0]} is a ${array[1]['age']}-year-old ${array[1]['gender']}`);
  })
}

function problemEight(object) {
  Object.values(object).forEach((array) => {
    array.forEach((string) => {
      string.split('').forEach((char) => {
        if ('aeiou'.includes(char.toLowerCase())) console.log(char);
        else;// Intentionally left blank to skip non-vowel characters
      })
    })
  })
  return 'finished';
}// Logs all the vowels in the given object's values to the console

function problemNine(array) {
  let serializedArr = JSON.stringify(array);
  let deepCopiedArr = JSON.parse(serializedArr);
  
  deepCopiedArr.forEach((subArray) => {
    if (typeof subArray[0] === 'number') subArray.sort((a, b) => a - b)
    else subArray.sort();
  })
  console.log(array);
  return deepCopiedArr;
}// Logs to console the given array and returns a sorted array in ascending order

function problemTen(array) {
  let serializedArr = JSON.stringify(array);
  let deepCopiedArr = JSON.parse(serializedArr);
  
  deepCopiedArr.forEach((subArray) => {
    if (typeof subArray[0] === 'number') subArray.sort((a, b) => b - a)
    else subArray.sort((a, b) => b.charCodeAt() - a.charCodeAt());
  })
  console.log(array);
  return deepCopiedArr;
}// Logs to console the given array and returns a sorted array in descending order

function problemEleven(array) {
  let serializedArr = JSON.stringify(array);
  let newArray = JSON.parse(serializedArr);
  
  newArray = newArray.map((object) => {
    for (let key in object) object[key]++;
    return object;
  })
  
  console.log(array);
  return newArray;
}// Returns a deep copy of an array where all values are incremented by 1

function problemTwelve(array) {
  return array.map((subArray) => {
    return subArray.filter(number => !(number %3));
  });
}// Returns a two dimensional array that only includes numbers divisible by 3

function problemThirteen(array) {
  return array.sort((a, b) => {
    let totalA = 0;
    let totalB = 0;
    
    a.forEach((number) => {
      if (number % 2) totalA += number;
    })
    b.forEach((number) => {
      if (number % 2) totalB += number;
    })
    
    return totalA - totalB;
  })
}// Sorts a two dimensional array by the sum of the odd numbers in the sub array

function problemFourteen(object) {
  let newArray = [];
  
  Object.entries(object).forEach((array) => {
    if (array[1]['type'] === 'fruit') newArray.push(array[1]['colors'].map((color) => color[0].toUpperCase() + color.slice(1)));
    else if (array[1]['type'] === 'vegetable') newArray.push(array[1]['size'].toUpperCase());
  })
  
  return newArray;
}// Returns an array that does some stuff

function problemFifteen(array) {
  return array.map((object) => {
    Object.entries(object).forEach((subArrays) => {
      if(!subArrays[1].every(num => !(num % 2))) delete object[subArrays[0]];
      else;// Intentionally left blank
    })
    return object;
  });
}// Returns every object that has even values

function problemSixteen(array) {
  let object = {}
  
  array.forEach((subArray) => object[subArray[0]] = subArray[1])
  
  return object;
}// Converts a two dimensional array into an object

function problemSeventeen() {
  let UUID = '';
  
  for (let i = 0; i < 36; i++) {
    if (i === 8 || i === 13 || i === 18 || i === 23) UUID += "-";
    else if (Math.random() <= .278) UUID += (Math.floor(Math.random() * 10));//Adds a number
    else UUID += String.fromCharCode((Math.floor(Math.random() * 100) % 26) + 97);
  }
  
  return UUID;
}// Creates a UUID

console.log(totalMaleAge(munsters));// 444

problemSix(munsters);// (Name) is a (age)-year-old (male or female).

console.log(problemEight({first: ['the', 'quick'], second: ['brown', 'fox'], third: ['jumped'], fourth: ['over', 'the', 'lazy', 'dog'], }))// All the vowels in the object

console.log(problemNine([['b', 'c', 'a'], [2, 1, 3], ['blue', 'black', 'green']]));// Both the original array and the sorted array ascending

console.log(problemTen([['b', 'c', 'a'], [2, 1, 3], ['blue', 'black', 'green']]));// Both the original array and the sorted array descending

console.log(problemEleven([{ a: 1 }, { b: 2, c: 3 }, { d: 4, e: 5, f: 6 }]));// [ { a: 2 }, { b: 3, c: 4 }, { d: 5, e: 6, f: 7 } ]

console.log(problemTwelve([[2], [3, 5, 7], [9], [11, 15, 18]]));// [ [], [ 3 ], [ 9 ], [ 15, 18 ] ]

console.log(problemThirteen([[1, 6, 7], [1, 5, 3], [1, 8, 3]]));// [ [ 1, 8, 3 ], [ 1, 6, 7 ], [ 1, 5, 3 ] ]

console.log(problemFourteen({
  grape: { type: 'fruit', colors: ['red', 'green'], size: 'small' },
  carrot: { type: 'vegetable', colors: ['orange'], size: 'medium' },
  apple: { type: 'fruit', colors: ['red', 'green'], size: 'medium' },
  apricot: { type: 'fruit', colors: ['orange'], size: 'medium' },
  marrow: { type: 'vegetable', colors: ['green'], size: 'large' },
}))// [["Red", "Green"], "MEDIUM", ["Red", "Green"], ["Orange"], "LARGE"]

console.log(problemFifteen([
  { a: [1, 2, 3] },
  { b: [2, 4, 6], c: [3, 6], d: [4] },
  { e: [8], f: [6, 10] },
]));// [ {}, { b: [ 2, 4, 6 ], d: [ 4 ] }, { e: [ 8 ], f: [ 6, 10 ] } ]

console.log(problemSixteen([['a', 1], ['b', 'two'], ['sea', {'c': 3}], ['D', ['a', 'b', 'c']]]));// { a: 1, b: 'two', sea: { c: 3 }, D: [ 'a', 'b', 'c' ] }

console.log(problemSeventeen());