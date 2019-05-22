const mongoose = require('mongoose')
const schema = mongoose.Schema

const CategorySchema = new schema({
  name: { type: String },
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' } //ref 的值是关联的model
})

module.exports = mongoose.model('Category', CategorySchema)
