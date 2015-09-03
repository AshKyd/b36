/**
 * Encode a string using a custom base36 encoding.
 * * Strings are chunked into 8 byte base36 encoded pieces for integer safety.
 * * The final piece may not make up 8 bytes, this is piecked up by the decoder..
 * @param {string} num  string full of numeric digits to encode.
 * @return {string}     base36/alphanumeric encoded string.
 */
module.exports = function enc(num){
    // Stringify our number in case it was input as an integer.
    num = String(num);

    // Keep track of our encoded chunks.
    var encodedChunks = [];

    // Continue until we've processed the entire string.
    while(num.length){
        // Start somewhere.
        var splitPosition = 7;

        // Try incrementally larger pieces until we get one that's exectly
        // 8 characters long.
        var encodedNum = '';
        do {
            // toString(36) converts decimal to base36.
            // Add a leading 1 for safety, as any leading zeroes would otherwise
            // be lost.
            encodedNum = Number('1' + num.substr(0, ++splitPosition)).toString(36);
        } while(encodedNum.length < 8 && splitPosition < num.length && splitPosition < 15);

        // Push our chunk onto the list of encoded chunks and remove these
        // digits from our string.
        encodedChunks.push(encodedNum);
        num = num.substr(splitPosition);
    }

    // Return a big ol' string.
    return encodedChunks.join('');
};
