function question1(arr) {
  arr = arr.slice(0, 0);
  console.log(arr);
  arr = [1, 2, 3, 4];
  while (arr.length) arr.shift();
  console.log(arr);
  arr = [1, 2, 3, 4];
  arr.splice(0, arr.length);
  console.log(arr);
}// Three ways to empty an array

function isColorValid(color) {
  return color === 'blue' || color === 'green';
}

console.log(question1([1, 2, 3, 4]));