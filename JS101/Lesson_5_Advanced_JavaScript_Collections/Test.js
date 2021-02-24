console.log([2, 11, 9, 4, 107, 21, 1].sort((a, b) => a - b));

let words = ['go', 'ahead', 'and', 'jump'];

console.log(words.sort((a,b) => a.length - b.length));// [ 'go', 'and', 'jump', 'ahead' ]

let arr = [{ b: 'foo' }, ['bar']];
let serializedArr = JSON.stringify(arr);
let deepCopiedArr = JSON.parse(serializedArr);
deepCopiedArr[1].push('baz');
console.log(deepCopiedArr);// => [ { b: 'foo' }, [ 'bar', 'baz' ] ]
console.log(arr);// => [ { b: 'foo' }, [ 'bar' ] ]

let myArr = [[18, 7], [3, 12]].forEach(arr => {
  return arr.map(num => {
    if (num > 5) {
      console.log(num);
    }
  });
});

console.log([[1, 2], [3, 4]].map(arr => arr.map(num => num * 2)));