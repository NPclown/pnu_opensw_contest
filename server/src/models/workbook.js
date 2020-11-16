const mongoose = require('mongoose')

const workbookSchema = mongoose.Schema({
  id: String,
  name: String,
  cont: String,
  inits: {
      c : String,
      cpp : String,
      python : String,
      python3 : String
  },
  code: {
      main : {
        c : String,
        cpp : String,
        python : String,
        python3 : String
      },
      header : {
        c : String,
        cpp : String
      }
  },
  sample : {
    testcase : [{
      input : String,
      output : String
    }],
    schema : String
  },
  score: [
      {
          input : String,
          output : String
      }
  ],
  docker: {
    memory : Number
  }
})


const Workbook = mongoose.model('Workbook', workbookSchema)

module.exports = Workbook