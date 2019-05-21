const mongoose = require('mongoose')
const schema = mongoose.Schema

const ItemSchema = new schema({
    name: { type: String },
    icon: { type: String }
})

module.exports = mongoose.model('Item', ItemSchema)