import CryptoJS from 'crypto-js';

const key = '12345678';

function encrypt(text: string) {
	return CryptoJS.AES.encrypt(text, key).toString();
}

function decrypt(encrypted: string) {
	if (encrypt === null) return null;

	return CryptoJS.AES.decrypt(encrypted, key).toString(CryptoJS.enc.Utf8);
}

export { encrypt, decrypt };