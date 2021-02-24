function problemFifteen(array) {
  return array.map((object) => {
    Object.entries(object).forEach((subArrays) => {
      if(!subArrays[1].every(num => !(num % 2))) delete object[subArrays[0]];
      else;// Intentionally left blank
    })
    return object;
  });
}// Returns every object that has even values

console.log(problemFifteen([
  { a: [1, 2, 3] },
  { b: [2, 4, 6], c: [3, 6], d: [4] },
  { e: [8], f: [6, 10] },
]));// [ {}, { b: [ 2, 4, 6 ], d: [ 4 ] }, { e: [ 8 ], f: [ 6, 10 ] } ]