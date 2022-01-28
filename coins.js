const fs = require('fs')
const path = require('path')
const readline = require('readline')

const input = readline.createInterface(process.stdin)
const randomNumber = 1 + Math.floor(Math.random() * 2)

console.log('Введите число от 1 до 2')

input.on('line', (num) => {
  const value = Number(num)

  if (isNaN(value) || ![1, 2].includes(value)) {
    console.log('Введите число от 1 до 2')
    return
  }

  if (value === randomNumber) {
    console.log('Верно! Выпало: ' + randomNumber)
    writeLog({coin: randomNumber, result: true})
  } else if (value !== randomNumber) {
    console.log('Не верно! Выпало: ' + randomNumber)
    writeLog({coin: randomNumber, result: false})
  }
})

function writeLog(result) {
  const file = path.join(__dirname, '', 'results.json')
  fs.readFile( file, 'utf8', (err, data) => {
    if (err) throw new Error(err)
    const parseData = data ? JSON.parse(data) : []
    parseData.push(result)
    fs.writeFile(file, JSON.stringify(parseData), 'utf8', (err) => {
      if (err) throw new Error(err)
      input.emit('close')
    })
  })
}

input.on('close', () => {
  process.exit(0)
})