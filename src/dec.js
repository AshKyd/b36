/**
 * Custom base36 decoder.
 * @param {string} input    base36/alphanumeric encoded string from the enc function
 * @return {string}         Original numeric string as passed to the enc function.
 */
module.exports = function dec(input){
    // Split our string into chunks of 8 bytes (with whatever left over at the end)
    return input.match(/.{8}|.+/g).map(function(chunk){
        // Convert each chunk to base 10.
        // Lop off the first character because it will be a safety 1.
        return String(parseInt(chunk, 36)).substr(1);
    }).join('');
};
