function question2(str) {
  if (str[str.length - 1] === "!") return true;
  else return false;
}// Tests a string for ! at the end

function question3(obj, key) {
  return Object.keys(obj).includes(key);
}// Searches the keys of an object for a specific key

function question4(str) {
  let firstLetter = str[0].toUpperCase();
  let restOfString = str.toLowerCase().slice(1);
  return firstLetter + restOfString;
}// Capitolizes the first letter of a string and makes the rest lower case

function question6(obj) {
  obj['Marilyn'] = 22;
  obj['Spot'] = 237;
  return obj;
}// Adds two entries to an object

function question7(str) {
  return str.includes('Dino');
}// Searches a string for the word Dino

function question8(arr) {
  arr.push("Dino");
  return arr;
}// Adds Dino to the array

function question9(arr) {
  arr.push("Dino", "Hoppy");
  return arr;
}// Adds multiple items to the array at once

function question10(str) {
  return str.slice(0, str.indexOf('house'));
}// Returns a string up to but not including the word house

console.log(question2("Come over here!"));// True
console.log(question2("What's up, Doc?"));// False

console.log(question3({ Herman: 32, Lily: 30, Grandpa: 402, Spot: 10 }, 'Spot'));// True
console.log(question3({ Herman: 32, Lily: 30, Grandpa: 402, Eddie: 10 }, 'Spot'));// False

console.log(question4("this is a PAIN!"));// This is a pain!

console.log(question6({ Herman: 32, Lily: 30, Grandpa: 5843, Eddie: 10 }));// { Herman: 32, Lily: 30, Grandpa: 5843, Eddie: 10, Marilyn: 22, Spot: 237 }

console.log(question7("Fred and Wilma have a pet dinosaur named Dino."));// True
console.log(question7("Few things in life are as important as house training your pet dinosaur."));// False

console.log(question8(["Fred", "Barney", "Wilma", "Betty", "Bambam", "Pebbles"]));// ["Fred", "Barney", "Wilma", "Betty", "Bambam", "Pebbles", "Dino"]

console.log(question9(["Fred", "Barney", "Wilma", "Betty", "Bambam", "Pebbles"]));// ["Fred", "Barney", "Wilma", "Betty", "Bambam", "Pebbles", "Dino", "Hoppy"]

console.log(question10("Few things in life are as important as house training your pet dinosaur."));// Few things in life are as important as