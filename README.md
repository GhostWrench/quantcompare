Head to Head Comparison of JS Physical Quantities Libraries
================================================================================

The following is a head to head comparison of the features, ergonomics and 
speed of the (apparent) top 5 JavaScript unit conversion / physical quantities / 
dimensionally consistent math packages.

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

### [js-quantities](https://www.npmjs.com/package/js-quantities)
The original, and long standing king of the hill for "pure" physical quantities 
packages. Is actively developed and has the most active users. 

### [pqm](https://www.npmjs.com/package/pqm)
Physical Quantities and Measures (PQM) is a very new, very lightweight and 
minimal package that strives to support many of the features of modern physical 
quantities libraries. Sports strictly defined units and is tested against NIST 
documented conversion values.

### [convert-units](https://www.npmjs.com/package/convert-units)
The minimalist's conversion package, supports conversions for simple 
(non-compound) units only, and does not support math operations on physical 
quantities. This package has a large number of dependents and is widely used.

### [mathjs](https://www.npmjs.com/package/mathjs)
Not a physical quantities package per say, but rather a large and full featured
mathematics library. That being said it supports physical quantities just as
well as any other package in this test, and deserves it's place as one of the
top packages for this analysis.

### [unitmath](https://www.npmjs.com/package/unitmath)
Another newcomer, but picking up steam. This is another "pure" physical 
quantities package similar to "js-quantities" and "pqm". The unitmath package
currently has an impressive 99% test coverage.

The Test Computer
--------------------------------------------------------------------------------

Dell Vostro 7590
* CPU: Intel® Core™ i7-9750H CPU @ 2.60GHz × 12
* RAM: 15.4 GiB
* Disk: 128 GB NVMe SSD
* OS: Ubuntu 20.04
* Node: 14.3.0

The Stats
--------------------------------------------------------------------------------

|                               | js-quantities | pqm      | convert-units | mathjs    | unitmath |
| ----------------------------- | ------------- | -------- | ------------- | --------- | -------- |
|                                           Overview                                              |
| Version Tested                | 1.7.5         | 0.4.4    | 2.3.4         | 7.0.0     | 0.8.5    |
| Number of Dependencies        | 0             | 0        | 2             | 8         | 1        |
| Number of Dependents          | 39            | 0        | 143           | 984       | 0        |
| Unpacked Size                 | 585 kB        | 216 kB   | 106 kB        | 10.1 MB   | 522 kB   |
| Minified Size (BundlePhobia)  | 30.1 kB       | 22.4 kB  | 23.8 kB       | 623.5 kB  | 34.1 kB  |
| Node (CommonJS)               | Yes           | Yes      | Yes           | Yes       | Yes      |
| Browser                       | Yes           | Yes      | No            | Yes       | No       |
| ES Module                     | Yes           | Yes      | Yes           | Yes       | Yes      |
| Support for Unit Prefixes     | Yes           | Yes      | Limited       | Yes       | Yes      |
| Number of Base Units Supported| 187           | 192      | 61            | 162       | 135      |
| Define Custom Units           | No            | Yes      | No            | Yes       | Yes      |
| Tracks input units            | Yes           | No       | No            | Yes       | Yes      |
| Support For Basic Math        | Yes           | Yes      | No            | Yes       | Yes      |
| Test Coverage *               | Unknown       | 78%      | Unknown       | Unknown   | 99%      |
|                                         Supported Operators                                     |
| Add / Subtract                | Yes           | Yes      | No            | Yes       | Yes      |
| Multiply / Divide             | Yes           | Yes      | No            | Yes       | Yes      |
| Raise Power                   | No            | Yes      | No            | Yes       | Yes      |
| Square Root                   | No            | Yes      | No            | Yes       | Yes      |
| Comparison Operators          | Yes           | Yes      | No            | == only   | Yes      |
| Support for array operations  | Conversion Only | Yes    | No            | Yes       | No       |
|                                          Benchmarks                                             |
| Module load time              | 4.5  ms       | 3.2 ms   | 14.7 ms       | 366 ms    | 39.5 ms  |
| Simple Conversion (mL -> gal) | 5.0 ms        | 0.38 ms  | 0.27 ms       | 0.34 ms   | 0.40 ms  |
| Compound Unit Conversion      | 5.0 ms        | 0.50 ms  | N/A           | 0.44 ms   | 0.50 ms  |
| Chained Math Operations (vs. Float equiv) | 50x | 8.5x   | N/A           | 22x       | 24x      |
| Chained Array Math Operation  | N/A           | 5x       | N/A           | 30x       | N/A      |

`* Test coverage is guessed for most packages, unless an exact value is given`

Basic Operations
--------------------------------------------------------------------------------
To demonstrate some of the functionality of each package, the following 
operation is shown in each package:

Starting with:

  A = 10 kg

  B = 5 cm

  C = 10 s

 Do the operation

  4*(A * B^2 / C^2) + 2*(A * B^2 / C^2) - 3*(A * B^2 / C^2)

This is also the operation that is used for the math benchmark

### js-quantitites
```javascript
// Import the library
const Qty = require('js-quantities');
// Define the quantities
let A = Qty(10, 'kg');
let B = Qty(5, 'cm');
let C = Qty(10, 's');
// Do the operation
let result = ((A.mul(B.mul(B)).div(C.mul(C))).mul(4)).add(
              (A.mul(B.mul(B)).div(C.mul(C))).mul(2)).sub(
              (A.mul(B.mul(B)).div(C.mul(C))).mul(3)
             );
console.log(result.toString()); // 75 kg*cm2/s2
console.log(result.toBase().toString()); //0.00075 kg*m2/s2
```

As you can see, js-quantities supports a very nice and terse chained operation 
formalism to do math operations with. The lack of a power function can make 
things a little more un-wieldy, but the fact that it tracks the used input
into it's output is a nice feature. It does however no recognize that the
resulting unit could be converted to Joules, even after calling 'toBase'.

### pqm
```javascript
// Import the library
const pqm = require('pqm');
// Define the quantities
let A = pqm.quantity(10, '[k]g');
let B = pqm.quantity(5, '[c]m');
let C = pqm.quantity(10, 's');
// Do the operation
let result = ((A.mul(B.pow(2)).div(C.pow(2))).mul(4)).add(
              (A.mul(B.pow(2)).div(C.pow(2))).mul(2)).sub(
              (A.mul(B.pow(2)).div(C.pow(2))).mul(3)
             );
console.log(result.toString()); // 0.0007500000000000002 J
console.log(result.in('[k]Wh')); // 2.083333333333334e-10
```

PQM uses nearly the same math operations as js-quantities, with only difference
being support for a power function. It doesn't track input units like 
js-quantities does though, but it does recognize the implicit Joule unit. Getting
values other than the base SI requires the user to manually specify the 
correct units. It also doesn't handle the floating point rounding errors as
well as js-quantities in the output.

### convert-units
Unfortunately, of all the packages, convert-units does not support the operation.
Instead, shown is the simple conversion from milliliters to gallons.

```javascript
// Import the Library
const convert = require('convert-units');
convert(10.0).from('ml').to('gal'); // 0.0026417205156250003
```

It's simple, and it works. But it is very limited in what it can do. But it may
be all that is needed for some projects.

### mathjs
```javascript
// Import the library
const math = require('mathjs');
// Define the quantities
let A = math.unit(10, 'kg');
let B = math.unit(5, 'cm');
let C = math.unit(10, 's');
// Do the operation
let result = math.subtract(
    math.add(
        math.multiply(4, (A.multiply(B.pow(2)).divide(C.pow(2)))),
        math.multiply(2, (A.multiply(B.pow(2)).divide(C.pow(2))))
    ),
    math.multiply(3, (A.multiply(B.pow(2)).divide(C.pow(2))))
);
console.log(result.toString()); // 0.7500000000000002 mJ
```

The operations are more a little bit more verbose for the mathjs package. It
does support chained operation but not for multiplication by a scalar. Thus it
was required to use this format to do the operation or to define additional 
unit-less quantities. It does not miss the opportunity to use Joule as the output 
unit and as an added bonus adds a prefix that works well for the magnitude.

### unitmath
```javascript
// Import the library
const unit = require('unitmath');
// Define the quantities
let A = unit(10, 'kg');
let B = unit(5, 'cm');
let C = unit(10, 's');
// Do the operation
let result = ((A.mul(B.pow(2)).div(C)).mul(4)).add(
              (A.mul(B.pow(2)).div(C)).mul(2)).sub(
              (A.mul(B.pow(2)).div(C)).mul(3)
             );
console.log(result.toString()); // 0.75 mJ
```

Using the same terse syntax as both js-quantities and pqm, this package does
everything the best can. It has arguably the nicest output with Joules as the
unit, a sensible prefix and it handles the floating point rounding error.

Conclusions
--------------------------------------------------------------------------------

### js-quantities
Overall, a very solid choice, supporting the most units of any package, an
extensive amount of functionality, zero dependencies, and a very small package 
size. It is mature and has a large user base which should give a small piece
of mind when installing. It also supports many aliases for units, allowing the
user many different options in defining units. This may lead to unit collisions 
issues as demonstrated in some of the issues in GitHub, but makes it the best 
choice for parsing units from an outside source. Unfortunately it does have the worst 
performance of any other package by far, which might be a concern for intensive
applications.

### pqm
Punching way above it's weight, this package has the smallest minified size 
by over a factor of two and no dependencies while at the same time supporting
nearly the same number of base units as js-quantities and a full featured 
set of arithmetic functions. The quirky manner of defining unit prefixes may
be off-putting to developers, but it does guarantee that unit collisions do
not happen. It also doesn't track input units in calculations, and the user can
either manually define the output units, or have the package attempt to convert 
to SI automatically, which may or may not work as expected making the package a 
bit harder to use. The fact that it is tested against NIST's guide to SI 
conversions is nice but the code itself needs more test coverage. A great 
choice for anyone brave enough to give a largely untested, but promising new 
package a try.

### convert-units
The most minimalist library. This package only supports the conversion of a few
select simple units, only supports prefixes for units which have been specifically
pre-defined, and does not support arithmetic operations like all the other 
packages. It does convert the fastest of any library (if the conversion is 
defined), but not by a huge factor. Additionally it's dependency on lodash adds
extra bytes to it's load size, which is actually a non concern for deploying 
to a browser because this package is node only. It does have the second most 
active users of any other package in this comparison, possibly due to it's 
extreem simplicity. It is hard to find anything that this package offers that 
any of the others don't. Consider installing a different package.

### mathjs
This is an overall amazing package that has the highest number of a active users
of any other package in this analysis. Of course, it offers a lot more than 
support for physical quantities. That being said, the physical quantities 
portion of this module is just as good as any of the others in this analysis, 
it is very fast and supports quite a large amount of functionality. While it does
support deployment on the browser, it's massive size may be a show stopper. If 
you are already using mathjs for one of it's other functions, then using it's
physical quantities functions as well is a no-brainer. It may be overkill if all
you need is dimensionally consistent math and nothing else.

### unitmath
Very similar to both js-quantities and pqm, this package is a medium ground 
between the slow but battle tested js-quantities and the very tiny/fast but 
extremely green pqm. NPM stats show that this library is gaining steam, and
for a good reason. This may just be the most practical choice with the
best balance of size, speed and quality. As a bonus it has great test coverage.
It does have one dependency on lodash, but what doesn't these days?
