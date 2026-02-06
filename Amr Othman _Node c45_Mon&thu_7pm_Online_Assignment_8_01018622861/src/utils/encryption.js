import CryptoJS from 'crypto-js';

const SECRET_KEY = "my_super_secret_phone_key"; 

export const encryptPhone = (phone) => {
    return CryptoJS.AES.encrypt(phone, SECRET_KEY).toString();
};

export const decryptPhone = (encryptedPhone) => {
    const bytes = CryptoJS.AES.decrypt(encryptedPhone, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
};