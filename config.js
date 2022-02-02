require('dotenv').config();

if (!process.env.API_KEY) {
    console.error('Не передан ключ доступа к сервису');
    process.exit();
}

module.exports = {
  apiKey: process.env.API_KEY
};