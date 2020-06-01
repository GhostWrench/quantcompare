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

// Simple benchmark Convert 10 mL => us gallon
// js-quantities
var jsQuantitiesSimpleConvert = performance.timerify(() => {
    return Qty(10.0, 'mL').to('gal').scalar;
});
// pqm
var pqmSimpleConvert = performance.timerify(() => {
    return pqm.quantity(10.0, '[m]L').in('gal');
});
// convert-units
var convertUnitsSimpleConvert = performance.timerify(() => {
    return convert(10.0).from('ml').to('gal');
});
// mathjs
var mathjsSimpleConvert = performance.timerify(() => {
    return math.unit(10.0, 'mL').toNumber('gal');
});
// unitmath
var unitmathSimpleConvert = performance.timerify(() => {
    return unit(10.0, 'mL').to('gal').value;
});
// Complex Conversion Benchmark (kg m^2 / ms K) -> (BTU ks / K)
// js-quantities
var jsQuantitiesComplexConvert = performance.timerify(() => {
    return Qty(1, 'kg m^2 / ms degK').to('BTU ks / degK').scalar;
});
// pqm
var pqmComplexConvert = performance.timerify(() => {
    return pqm.quantity(1, '[k]g m^2 / [m]s K').in('BTU [k]s / K');
});
// convert-units
var convertUnitsComplexConvert = performance.timerify(() => {
    return convert(1).from('kg m^2 / ms K').to('BTU ks / K');
});
// mathjs
var mathjsComplexConvert = performance.timerify(() => {
    return math.unit(1, 'kg m^2 / (ms K)').toNumber("BTU ks / K");
});
// unitmath
var unitmathComplexConvert = performance.timerify(() => {
    return unit('kg m^2 / ms K').to('BTU ks / K').value;
})

const obs = new PerformanceObserver((list) => {
console.log(list.getEntries()[0].duration);
obs.disconnect();
});
obs.observe({ entryTypes: ['function'] });

// Call one of the functions defined above here to benchmark performance
jsQuantitiesSimpleConvert(); // 5.0 ms
//pqmSimpleConvert(); // 0.38 ms
//convertUnitsSimpleConvert(); // 0.27 ms
//mathjsSimpleConvert(); // 0.34 ms
//unitmathSimpleConvert(); // 0.40 ms

// Complex unit conversion
//jsQuantitiesComplexConvert(); // 5.0 ms
//pqmComplexConvert(); // 0.50 ms
//convertUnitsSimpleConvert(); // error
//mathjsComplexConvert(); // 0.44 ms
//unitmathComplexConvert(); // 0.50 ms
