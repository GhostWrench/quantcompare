var Qty = require('js-quantities');
var pqm = require('pqm');
var convert = require('convert-units');
var math = require('mathjs');
var unit = require('unitmath');

// Setup the benchmarking tools
const {
    performance,
    PerformanceObserver
  } = require('perf_hooks');

// Operation:
// Starting with: 
//     A = 10 kg
//     B = 5 cm
//     C = 10 s
// Do the operation
//     4*(A * B^2 / C) + 2*(A * B^2 / C) - 3*(A * B^2 / C)
//

// js-quantities
//var A = Qty(10, 'kg');
//var B = Qty(5, 'cm');
//var C = Qty(10, 's');
var jsqDoMath = performance.timerify(() => {
    return ((A.mul(B.mul(B)).div(C)).mul(4)).add((A.mul(B.mul(B)).div(C)).mul(2)).sub((A.mul(B.mul(B)).div(C)).mul(3));
});

// pqm
//var A = pqm.quantity(10, '[k]g');
//var B = pqm.quantity(5, '[c]m');
//var C = pqm.quantity(10, 's');
var pqmDoMath = performance.timerify(() => {
    return ((A.mul(B.pow(2)).div(C)).mul(4)).add((A.mul(B.pow(2)).div(C)).mul(2)).sub((A.mul(B.pow(2)).div(C)).mul(3));
});

// mathjs
//var A = math.unit(10, 'kg');
//var B = math.unit(5, 'cm');
//var C = math.unit(10, 's');
var mathjsDoMath = performance.timerify(() => {
    return math.subtract(
        math.add(
            math.multiply(4, (A.multiply(B.pow(2)).divide(C))),
            math.multiply(2, (A.multiply(B.pow(2)).divide(C)))
        ),
        math.multiply(3, (A.multiply(B.pow(2)).divide(C)))
    );
});

// unitmath
var A = unit(10, 'kg');
var B = unit(5, 'cm');
var C = unit(10, 's');
var unitmathDoMath = performance.timerify(() => {
    return ((A.mul(B.pow(2)).div(C)).mul(4)).add((A.mul(B.pow(2)).div(C)).mul(2)).sub((A.mul(B.pow(2)).div(C)).mul(3))
});

const obs = new PerformanceObserver((list) => {
console.log(list.getEntries()[0].duration);
obs.disconnect();
});
obs.observe({ entryTypes: ['function'] });

// Call function here to get performance
var result = unitmathDoMath();
// Check the output
console.log(result.toString());
