Head to Head Comparison and Benchmark of JS Physical Quantities Libraries
================================================================================

Full Disclosure
--------------------------------------------------------------------------------
I am the developer for the package "pqm", so I hope you enjoy this analysis 
with that in mind. I tried to be as impartial as possible, but I am human. I 
really just wanted to compare to other libraries of the same type to test my 
programming chops. It is a very, very new package and as of right now I don't
believe it has any users but, hopefully, this might convince people to start
using it!

The Packages
--------------------------------------------------------------------------------

### js-quantities
The original, and long standing king of the hill for "pure" physical quantities 
packages. Is actively developed and has the most active users. 

### pqm
Physical Quantities and Measures (PQM) is a very new, very lightweight and 
minimal package that strives to support many of the features of modern physical 
quantities libraries. Sports strictly "typed" units and is tested against NIST 
documented conversion values.

### convert-units
The minimalist's conversion package, supports conversions for simple 
(non-compound) units only, and does not support math operations on physical 
quantities. This package has a large number of dependents and is widely used.

### mathjs
Not a physical quantities package per say, but rather a large and full featured
mathematics library. That being said it supports physical quantities just as
well as any other package in this test, and deserves it's place as one of the
top packages for this analysis.

### unitmath
Another newcommer, but picking up steam. This is another "pure" physical 
quantities package similar to "js-quantities" and "pqm". As far as I can tell, 
this package has the best test coverage of the code of the three.


Basic Stats (TLDR Summary)
--------------------------------------------------------------------------------

|                               | js-quantities | pqm      | convert-units | mathjs    | unitmath |
| ----------------------------- | ------------- | -------- | ------------- | --------- | -------- |
|                                           Overview                                              |
| Version Tested                | 1.7.5         | 0.2.0    | 2.3.4         | 7.0.0     | 0.8.5    |
| Number of Dependencies        | 0             | 0        | 2             | 8         | 1        |
| Number of Dependents          | 39            | 0        | 143           | 984       | 0        |
| Unpacked Size                 | 585 kB        | 216 kB   | 106 kB        | 10.1 MB   | 522 kB   |
| Minified Size (BundlePhobia)  | 30.1 kB       | 13.6 kB  | 23.8 kB       | 623.5 kB  | 34.1 kB  |
| Node (CommonJS)               | Yes           | Yes      | Yes           | Yes       | Yes      |
| Browser                       | Yes           | Yes      | No            | Yes       | No       |
| ES Module                     | Yes           | Yes      | Yes           | Yes       | Yes      |
| Support for Unit Prefixes     | Yes           | Yes      | Partial       | Yes       | Yes      |
| Number of Base Units Supported| 187           | 186      | 61            | 162       | 135      |
| Define Custom Units           | No            | Yes      | No            | Yes       | Yes      |
| Tracks input units            | Yes           | No       | No            | Yes       | Yes      |
| Support For Basic Math        | Yes           | Yes      | No            | Yes       | Yes      |
| Test Coverage *               | Good          | Some     | Good          | Very Good | 99%      |
| Conversion Accuracy Test      | None          | vs. NIST | None          | None      | None     |
|                                         Supported Operators                                     |
| Add / Subtract                | Yes           | Yes      | No            | Yes       | Yes      |
| Multiply / Divide             | Yes           | Yes      | No            | Yes       | Yes      |
| Raise Power                   | No            | Yes      | No            | Yes       | Yes      |
| Square Root                   | No            | No       | No            | Yes       | Yes      |
| Comparison Operators          | Yes           | Yes      | No            | == only   | Yes      |
| Works with arrays             | Yes           | No       | No            | Yes       | No       |       
|                                          Benchmarks                                             |
| Module load time              | 12.2 ms       | 8.6 ms   | 101.9 ms      | 2306.6 ms | 141.9 ms |
| Simple Conversion (mL -> gal) | 3.5 ms        | 0.8 ms   | 0.4 ms        | 0.55 ms   | 0.65 ms  |
| Compound Unit Conversion      | 7.5 ms        | 1.6 ms   | N/A           | 1.3 ms    | 0.8 ms   |
| Chained Math Operations       | 1.6 ms        | 0.3 ms   | N/A           | 0.8 ms    | 1.0 ms   |

`* Test coverage is guessed for most packages, unless an exact value is given`

Features
--------------------------------------------------------------------------------


Performance
--------------------------------------------------------------------------------


Overview
--------------------------------------------------------------------------------
