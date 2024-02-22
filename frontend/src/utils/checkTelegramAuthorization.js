import CryptoJS from 'crypto-js';

const checkTelegramAuthorization = (authData) => {
    const checkHash = authData.hash;
    delete authData.hash;

    const dataCheckArr = [];
    for (const [key, value] of Object.entries(authData)) {
        dataCheckArr.push(`${key}=${value}`);
    }
    dataCheckArr.sort();
    const dataCheckString = dataCheckArr.join('\n');

    const secretKey = CryptoJS.SHA256(BOT_TOKEN).toString(CryptoJS.enc.Latin1);
    const hash = CryptoJS.HmacSHA256(dataCheckString, secretKey).toString();

    if (hash !== checkHash) {
        throw new Error('Data is NOT from Telegram');
    }

    if (Date.now() - authData.auth_date * 1000 > 86400 * 1000) {
        throw new Error('Data is outdated');
    }

    return authData;
};
