/**
 * * Math.Random is not enough random.
 */

const crypto = require('crypto').webcrypto;

const GetRandomInt = async (min, max) => {
	const randomBuffer = new Uint32Array(1);
	crypto.getRandomValues(randomBuffer);

	const randomNumber = randomBuffer[0] / (0xffffffff + 1);

	min = Math.ceil(min);
	max = Math.floor(max);

	return Math.floor(randomNumber * (max - min + 1)) + min;
};

module.exports = { GetRandomInt };
