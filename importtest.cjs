'use strict';
const {
  performance,
  PerformanceObserver
} = require('perf_hooks');
const mod = require('module');

// Monkey patch the require function
mod.Module.prototype.require =
  performance.timerify(mod.Module.prototype.require);
require = performance.timerify(require);

// Activate the observer
const obs = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  entries.forEach((entry) => {
    console.log(`require('${entry[0]}')`, entry.duration);
  });
  obs.disconnect();
});
obs.observe({ entryTypes: ['function'], buffered: true });

// Uncomment one of the following to test import time
//require('js-quantities');
//require('pqm');
//require('convert-units');
//require('mathjs')
require('unitmath');

// Results
// js-quantities -> 4.5 ms
// pqm           -> 3.2 ms
// convert-units -> 14.7 ms
// mathjs        -> 336 ms
// unitmath      -> 39.5 ms
