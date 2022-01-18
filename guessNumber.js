#!/usr/bin/env node
const readline = require('readline')

const input = readline.createInterface(process.stdin)
const randomNumber = Math.round(Math.random() * 100)

console.log('Загадано число в диапазоне от 0 до 100')

input.on('line', (num) => {
  value = Number(num)

  if (isNaN(value)) {
    console.log('Введите число в диапазоне от 0 до 100')
    return
  }

  if (value < randomNumber) {
    console.log('Больше')
  } else if (value > randomNumber) {
    console.log('Меньше')
  } else {
    console.log('Отгадано число ' + value);
    input.emit('close')
  }
})

input.on('close', () => {
    process.exit(0)
})