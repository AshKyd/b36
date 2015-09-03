module.exports = {
	enc: require('./src/enc'),
	dec: require('./src/dec'),
};

console.log('enc', module.exports.enc('123'));
