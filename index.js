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
    let queue = Promise.resolve()
    for (let i = 0; i < answers.repeat; i++) {
      queue = queue.then(res => {
        return program()
      })
    }
    queue.then(function () {
      console.log('see you')
    })
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

        if (rows <= columns) {
          if (rows % 2 === 0) console.log("L")
          else console.log("R")
        } else if (rows > columns) {
          if (columns % 2 === 0) console.log("U")
          else console.log("D")
        }
        resolve('done')
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