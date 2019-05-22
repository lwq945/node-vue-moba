const mongoose = require('mongoose')
const schema = mongoose.Schema

const ArticleSchema = new schema({
  title: { type: String },
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  body: { type: String }
})

module.exports = mongoose.model('Article', ArticleSchema)
