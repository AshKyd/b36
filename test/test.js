var assert = require("assert");
var enc = require('../src/enc');
var dec = require('../src/dec');

describe('Encoder/decoder', function() {
	it('encodes and decodes values safely.', function () {
	  [
		  '123',
		  '1234567890',
		  '0123456789',
		  '123123123123123123123123123123123123123123123123',
		  '000000000000000000000000000000000000000000000000',
		  '111111111111111111111111111111111111111111111111',
		  (function(){
			  // Construct a really long string.
			  var str = '';
			  for(var i=0; i<5000; i++){
				  str += '10';
			  }
			  return str;
		  })(),
	  ].forEach(function(key){
	  		assert.equal(key, dec(enc(key)));
	  });
	});
});
