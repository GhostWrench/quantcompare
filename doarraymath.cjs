var Qty = require('js-quantities');
var pqm = require('pqm');
//var convert = require('convert-units');
var math = require('mathjs');
var unit = require('unitmath');

// Setup the benchmarking tools
const {
  performance,
  PerformanceObserver
} = require('perf_hooks');

// Define array operations
/**
 * Do the provided function operation as a vector operation on provided arrays
 * arr1 and arr2
 * 
 * @param {number[]} arr1 First vector to combine using op
 * @param {number[]} arr2 Second vector to combine using op
 * @param {boolean} collapse If this is true and the return value is a length
 *                           one array. Return the 0 element, not the array
 * @param {function} op Function to combine the two arrays. Must have the 
 *                      signature op(number, number) -> number
 */
function arrayOp(arr1, arr2, collapse, op) {
  let maxLength = Math.max(arr1.length, arr2.length);
  let output = new Array(maxLength);
  // Equal length vectors
  if (arr1.length == arr2.length) {
    for (let ii = 0; ii < maxLength; ii++) {
      output[ii] = op(arr1[ii], arr2[ii]);
    }
    // arr1 is scalar and arr2 is an array
  } else if (arr1.length == 1) {
    for (let ii = 0; ii < maxLength; ii++) {
      output[ii] = op(arr1[0], arr2[ii]);
    }
    // arr2 is scalar and arr1 is an array
  } else if (arr2.length == 1) {
    for (let ii = 0; ii < maxLength; ii++) {
      output[ii] = op(arr1[ii], arr2[0]);
    }
  } else {
    throw ("Vector operations arguments must have the same length or at " +
      "least one must be scalar (length 1)");
  }
  if (collapse && (output.length == 1)) {
    return output[0];
  }
  return output;
}
// Add as an array
function arrayAdd(a, b, collapse) {
  return arrayOp(a, b, collapse, function (c, d) {
    return c + d;
  });
}
// Subtract as an array
function arraySub(a, b, collapse) {
  return arrayOp(a, b, collapse, function (c, d) {
    return c - d;
  });
}
// Multiply as an array
function arrayMul(a, b, collapse) {
  return arrayOp(a, b, collapse, function (c, d) {
    return c * d;
  });
}
// Divide as an array
function arrayDiv(a, b, collapse) {
  return arrayOp(a, b, collapse, function (c, d) {
    return c / d;
  });
}
// Power as an array
// Divide as an array
function arrayPow(a, b, collapse) {
  return arrayOp(a, b, collapse, function (c, d) {
    return Math.pow(c, d);
  });
}

// Operation:
// Starting with: 
//     A = [randarray] kg
//     B = [randarray] cm
//     C = [randarray] s
// Do the operation
//     4*(A * B^2 / C^2) + 2*(A * B^2 / C^2) - 3*(A * B^2 / C^2)
//

// Function to make random arrays
randomArray = (length, max) => [...new Array(length)]
    .map(() => Math.round(Math.random() * max));

// raw
var A = randomArray(1000, 10);
var B = randomArray(1000, 10);
var C = randomArray(1000, 10);
var rawDoMath = performance.timerify(() => {
  return arraySub(
    arrayAdd(
      arrayMul([4], arrayDiv(arrayMul(A, arrayPow(B, [2])), arrayPow(C, [2]))),
      arrayMul([2], arrayDiv(arrayMul(A, arrayPow(B, [2])), arrayPow(C, [2]))),
    ),
    arrayMul([3], arrayDiv(arrayMul(A, arrayPow(B, [2])), arrayPow(C, [2])))
  );
});

// pqm
//A = pqm.quantity(A, '[k]g');
//console.log(A.magnitude[0]);
//B = pqm.quantity(B, '[c]m');
//console.log(B.magnitude[0]);
//C = pqm.quantity(C, 's');
//console.log(C.magnitude[0]);
var pqmDoMath = performance.timerify(() => {
  return ((A.mul(B.pow(2)).div(C.pow(2))).mul(4)).add(
    (A.mul(B.pow(2)).div(C.pow(2))).mul(2)).sub(
      (A.mul(B.pow(2)).div(C.pow(2))).mul(3)
    );
});

// mathjs
//A = math.evaluate("[" + A.toString() + "] kg");
//B = math.evaluate("[" + B.toString() + "] cm");
//C = math.evaluate("[" + C.toString() + "] s");
var mathjsDoMath = performance.timerify(() => {
  return math.subtract(
    math.add(
      math.dotMultiply(4, math.dotDivide(math.dotMultiply(A, math.dotPow(B, 2)), math.dotPow(C, 2))),
      math.dotMultiply(2, math.dotDivide(math.dotMultiply(A, math.dotPow(B, 2)), math.dotPow(C, 2))),
    ),
    math.dotMultiply(3, math.dotDivide(math.dotMultiply(A, math.dotPow(B, 2)), math.dotPow(C, 2)))
  );
});

// unitmath
A = unit(A, 'kg');
B = unit(A, 'cm');
C = unit(A, 's');
var unitmathDoMath = performance.timerify(() => {
  return ((A.mul(B.pow(2)).div(C.pow(2))).mul(4)).add(
    (A.mul(B.pow(2)).div(C.pow(2))).mul(2)).sub(
      (A.mul(B.pow(2)).div(C.pow(2))).mul(3)
    );
});

const obs = new PerformanceObserver((list) => {
  console.log(list.getEntries()[0].duration);
  obs.disconnect();
});
obs.observe({ entryTypes: ['function'] });

// Call function here to get performance
var result = mathjsDoMath();
// Check the output
//console.log(result.toString());

// Results (Dell Vostro-7590)
// Raw           -> 1.3 ms
// pqm           -> 6.5 ms (5x)
// mathjs        -> 38.5 ms (30x)
// unitmath      -> 0.60 ms (24x)