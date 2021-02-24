let ages = {
  Herman: 32,
  Lily: 30,
  Grandpa: 5843,
  Eddie: 10,
  Marilyn: 22,
  Spot: 237
};

function objectCreator(array) {
  let newObject = {};
  array.forEach((ele, index) => newObject[ele] = index);
  return newObject;
}// Creates an object out of the given array with the elements as keys and the indices as values

function addAllAges(object) {
  let total = 0;
  Object.values(object).forEach((ele) => total += ele)
  return total;
}// Adds all the values in an object

function minimumAge(object) {
  let arr = Object.values(object)
  return Math.min(...arr);
}// Returns the minimum value in an object

function letterFrequency(string) {
  let letters = {};
  for (let char of string) {
    if (char === " ") continue;
    else if (Object.keys(letters).includes(char)) {
      letters[char]++;
    }
    else letters[char] += 1;
  }
  return letters;
}// Returns an object with the letters as keys and the frequency at which they occur as values;

console.log(letterFrequency("The Flintstones Rock"));

console.log(minimumAge(ages))

console.log(addAllAges(ages));// 6174

console.log(objectCreator(["Fred", "Barney", "Wilma", "Betty", "Pebbles", "Bambam"]));// { Fred: 0, Barney: 1, Wilma: 2, Betty: 3, Pebbles: 4, Bambam: 5 }