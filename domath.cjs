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
//     4*(A * B^2 / C^2) + 2*(A * B^2 / C^2) - 3*(A * B^2 / C^2)
//

// raw
//var A = 10;
//var B = 5;
//var C = 10;
var rawDoMath = performance.timerify(() => {
    return   4*(A * Math.pow(B, 2) / Math.pow(C, 2)) 
           + 2*(A * Math.pow(B, 2) / Math.pow(C, 2))
           - 3*(A * Math.pow(B, 2) / Math.pow(C, 2));
});

// js-quantities
//var A = Qty(10, 'kg');
//var B = Qty(5, 'cm');
//var C = Qty(10, 's');
var jsqDoMath = performance.timerify(() => {
    return ((A.mul(B.mul(B)).div(C.mul(C))).mul(4)).add(
            (A.mul(B.mul(B)).div(C.mul(C))).mul(2)).sub(
            (A.mul(B.mul(B)).div(C.mul(C))).mul(3)
           );
});

// pqm
//var A = pqm.quantity(10, '[k]g');
//var B = pqm.quantity(5, '[c]m');
//var C = pqm.quantity(10, 's');
var pqmDoMath = performance.timerify(() => {
    return ((A.mul(B.pow(2)).div(C.pow(2))).mul(4)).add(
            (A.mul(B.pow(2)).div(C.pow(2))).mul(2)).sub(
            (A.mul(B.pow(2)).div(C.pow(2))).mul(3)
           );
});

// mathjs
//var A = math.unit(10, 'kg');
//var B = math.unit(5, 'cm');
//var C = math.unit(10, 's');
var mathjsDoMath = performance.timerify(() => {
    return math.subtract(
        math.add(
            math.multiply(4, (A.multiply(B.pow(2)).divide(C.pow(2)))),
            math.multiply(2, (A.multiply(B.pow(2)).divide(C.pow(2))))
        ),
        math.multiply(3, (A.multiply(B.pow(2)).divide(C.pow(2))))
    );
});

// unitmath
var A = unit(10, 'kg');
var B = unit(5, 'cm');
var C = unit(10, 's');
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
var result = unitmathDoMath();
// Check the output
console.log(result.toString());

// Results (Dell Vostro-7590)
// Raw           -> 0.025 ms
// js-quantities -> 1.25 ms (50x)
// pqm           -> 0.21 ms (8.5x)
// mathjs        -> 0.55 ms (22x)
// unitmath      -> 0.60 ms (24x)