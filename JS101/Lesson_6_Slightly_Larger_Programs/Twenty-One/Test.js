function union(arr1, arr2) {
  return arr1.concat(arr2).filter((value, index, currArr) => currArr.indexOf(value) === index);
};// Returns an array that is a combination of the two passed arrays with no duplicate values

/* This is an attempt at accomplishing the exercise with a single
   chain of methods. Below is what I believe is happening under
   the hood in these methods.
   
   First off we combine the two arrays with the 
   Array.prototype.concat() method, then we filter this combined 
   array with the Array.prototype.filter() method and return an
   array with the first occurance of each value, which is then
   finally returned by the function. 
   
   Inside the Array.prototype.filter() method I am calling
   Array.prototype.indexOf() on the recently concatinated array
   that was passed to the filter function, and I am passing that
   method my current value, and FINALY comparing that value to the
   current index. By doing this my filter function is basically
   looking at the array passed to it, comparing each value to the 
   current value, and stopping at the first index containing this
   value. If this index is the current index then the value is
   added to the final array that is going to be returned to the
   function. If the index of the values first occurance is NOT
   the current index Array.prototype.filter will not add the value
   and move on to the next one.
   
   Please correct me if I'm wrong on any of this. I want to get a 
   better understanding of the JavaScript methods and what is
   happening under the hood on most of them.
*/


console.log(union([1, 3, 5], [3, 6, 9]));    // [1, 3, 5, 6, 9]