#!/usr/bin/env node
const commander = require('commander')
const program = new commander.Command()

const date = new Date()

if (process.argv.length < 3) {
  console.log(date.toISOString())
  process.exit(0)
} else if (process.argv.length === 3) {
  program
    .option('-y, --year', 'Get current year')
    .option('-m, --month', 'Get current month')
    .option('-d, --date', 'Get current day in month')
    .action(() => {
      const options = program.opts()

      if (options.year) {
        console.log(date.getFullYear())
      }

      if (options.month) {
        console.log(date.getMonth() + 1)
      }

      if (options.date) {
        console.log(date.getDate())
      }
      process.exit(0)
    })
    .parse(process.argv)
} else if (process.argv.length > 3 && !['add', 'sub'].includes(process.argv[2])) {
  console.error('Only one option possible')
  process.exit(0)
}

const myParseInt = (value) => {
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue)) {
    throw new commander.InvalidArgumentError('Expected number')
  }
  return parsedValue
}

const getCustomDate = (period, num, action) => {
  switch (period) {
    case 'd':
    case 'date':
      date.setFullYear(date.getFullYear() + (action === 'add' ? +num : -+num))
      break
    case 'm':
    case 'month':
      date.setMonth(date.getMonth() + (action === 'add' ? +num : -+num))
      break
    case 'y':
    case 'year':
      date.setFullYear(date.getFullYear() + (action === 'add' ? +num : -+num))
      break
  }
  console.log(date.toISOString())
  process.exit(0)
}

program
  .command('add')
  .addArgument(new commander.Argument('<period>').choices(['d', 'date', 'm', 'month', 'y', 'year']))
  .argument('<num>', 'integer argument', myParseInt)
  .action((period, num) => {
    getCustomDate(period, num, 'add')
  })

program
  .command('sub')
  .addArgument(new commander.Argument('<period>').choices(['d', 'date', 'm', 'month', 'y', 'year']))
  .argument('<num>', 'integer argument', myParseInt)
  .action((period, num) => {
    getCustomDate(period, num, 'sub')
  })

program.parse(process.argv)