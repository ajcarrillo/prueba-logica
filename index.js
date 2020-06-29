let inquirer = require('inquirer')

inquirer.prompt([
  {
    type: 'number',
    name: 'repeat',
    message: 'T: ',
    default: 1
  }
])
  .then(answers => {
    if (answers.repeat >= 1 && answers.repeat <= 10000) {
      let queue = Promise.resolve()
      for (let i = 0; i < answers.repeat; i++) {
        queue = queue.then(res => {
          return program()
        })
      }
      queue.then(function () {
        console.log('see you')
      })
    } else {
      console.log('Really dude?')
    }
  })


function program() {
  return new Promise(((resolve, reject) => {
    inquirer.prompt([
      {
        type: 'number',
        name: 'rows',
        message: 'Rows: ',
        default: 1
      },
      {
        type: 'number',
        name: 'columns',
        message: 'Cols: ',
        default: 1
      },
    ])
      .then(answers => {
        let {rows, columns} = answers

        if (rows >= 1 && rows <= 1000000000 && columns >= 1 && columns <= 1000000000) {
          if (rows <= columns) {
            if (rows % 2 === 0) console.log("L")
            else console.log("R")
          } else if (rows > columns) {
            if (columns % 2 === 0) console.log("U")
            else console.log("D")
          }
          resolve('done')
        } else {
          console.log('Really dude?')
          resolve('done')
        }
      })
      .catch(error => {
        if (error.isTtyError) {
          console.log('Prompt couldn\'t be rendered in the current environment')
        } else {
          console.log(error)
        }
        reject(error)
      })
  }))
}