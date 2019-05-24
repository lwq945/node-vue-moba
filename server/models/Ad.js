const mongoose = require('mongoose')
const schema = mongoose.Schema

const AdSchema = new schema({
  name: { type: String },
  items: [{
    image: { type: String },
    url: { type: String }
  }]
})

module.exports = mongoose.model('Ad', AdSchema)