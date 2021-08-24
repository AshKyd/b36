Custom base36 encoder
=====================

This code implements a custom codec that lets you reduce the number of bytes used to store large numbers.

It only works on digits and was designed for the
[js13k](http://js13kgames.com) game contest.

How it works
------------

Normal base36 can be used on Javascript integers to convert numbers
into alphanumeric strings like so:

````
var encoded = (1234).toString(36);
var decoded = parseInt(encoded, 36);
````

This is useful, but we're limited by the maximum safe integer size in Javascript. This codec chunks an infinitely* long string of numbers into groups of 8 bytes with the intention of staying under the safe integer size (around 15 digits). Each of these is encoded from base10 to base36, then concatenated into the output.

The result is a drastically smaller string with a corresponding compression ratio.

Example (what do you mean?!)
----------------------------

For instance, the following numeric string is encoded from 34 characters to 25 characters:

````
original 2134567355234523454657865432435465
encoded  1jqu2wy81psrshxd2dp313x6f
decoded  2134567355234523454657865432435465
````

As a case study, 8 levels from my js13k entry compressed from 752 bytes to 549 bytes, saving 203 bytes for magic that would otherwise not have been able to fit.

Why/how to do?!
---------------

To use it:

````
var codec = require('b36');
var myString = '12345678901234567890';
var encoded = codec.enc(myString);
var decoded = codec.dec(encoded);

console.log(myString === decoded);
// true
````

Alternatively if you're space constrained, [the decoder](src/dec.js) is around 120 bytes so you may want to include it separately.

This seems complicated and…
---------------------------

Yeah, I guess it is. My use case is fairly narrow, so your mileage may vary.
