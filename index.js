const http = require('http');
const readline = require('readline');
const { apiKey } = require('./config');

const input = readline.createInterface(process.stdin);
let request = null;

console.log('Введите город');

input.on('line', (str) => {
  if (!str) {
    console.log('Для получения информации о погоде необходимо ввести город');
    return;
  }

  if (str === 'q') {
    input.emit('close');
  }

  const weatherUrl = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${str}`;

  request = http.get(weatherUrl, (response) => {
    const statusCode = response.statusCode;

    if (statusCode !== 200) {
      console.error(`Status Code: ${statusCode}`);
      return;
    }

    response.setEncoding('utf8');

    let rawData = '';
    response.on('data', (chunk) => rawData += chunk);
    response.on('end', () => {
      let parsedData = JSON.parse(rawData);
      if (parsedData.error) {
        console.log('Не удалось определить локацию, попробуйте снова!');
      } else {
        console.log('Сейчас температура: ' + parsedData.current.temperature);
        console.log('Чтобы узнать информацию о погоде в другом городе, введите назавние в консоль. Для выхода введите "q"');
      }
    })
  })

  request.on('error', (e) => {
    console.error(`Got error: ${e.message}`);
  })

  request.end();
});

input.on('close', () => {
    process.exit(0)
})