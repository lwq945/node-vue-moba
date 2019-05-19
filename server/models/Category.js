const mongoose = require('mongoose')
const schema = mongoose.Schema

const CategorySchema = new schema({
    name: {type: String }
})

module.exports = mongoose.model("Category", CategorySchema)