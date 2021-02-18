function isDotSeparatedIpAddress(inputString) {
  if (isAnIpNumber(inputString)) return false;
  
  if (inputString.split('').reduce((acc, ele) => acc + (ele === '.'), 0) !== 3) return false;
  
  return true
};

function isAnIpNumber(str) {
  if (/^\d+$/.test(str)) {
    let number = Number(str);
    return number >= 0 && number <= 255;
  }

  return false;
}

console.log(isDotSeparatedIpAddress('10.4.5.11'));// True
console.log(isDotSeparatedIpAddress('4.5.5'));// False
console.log(isDotSeparatedIpAddress('1.2.3.4.5'));// False