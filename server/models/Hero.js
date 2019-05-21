const mongoose = require('mongoose')
const schema = mongoose.Schema

const HeroSchema = new schema({
  name: { type: String },
  avatar: { type: String }
})

module.exports = mongoose.model('Hero', HeroSchema)