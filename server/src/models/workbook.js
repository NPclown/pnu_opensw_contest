var mongoose = require('mongoose')

var workbookSchema = mongoose.Schema({
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
  score: [
      {
          input : String,
          output : String
      }
  ]
})

const Workbook = mongoose.model('Workbook', workbookSchema)

module.exports = Workbook